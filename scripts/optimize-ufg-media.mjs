/**
 * Optimizes UFG source media into public/ufg-media/.
 * Originals are never modified.
 *
 * Usage:
 *   npm run optimize-media
 *   UFG_MEDIA_SOURCE="/path/to/UFG PICS" npm run optimize-media
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import ffmpegPath from '@ffmpeg-installer/ffmpeg'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'public', 'ufg-media')

/** Change folder → branch mapping here if needed (mirror in src/data/ufgMedia.js) */
const BRANCH_SOURCE_FOLDERS = {
  mtayleb: 'ufg1 pics',
  awkar: 'ufg2 pics',
}

const DEFAULT_SOURCE = path.resolve(ROOT, '..', 'UFG PICS')

const IMAGE_WIDTHS = {
  thumb: 320,
  mobile: 640,
  tablet: 1024,
  desktop: 1600,
}

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'])
const VIDEO_EXT = new Set(['.mp4', '.mov', '.m4v', '.webm'])

function slugFromFilename(name) {
  return path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(ffmpegPath.path, args, { stdio: ['ignore', 'pipe', 'pipe'] })
    let stderr = ''
    proc.stderr.on('data', (d) => {
      stderr += d.toString()
    })
    proc.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(stderr || `ffmpeg exited ${code}`))
    })
    proc.on('error', reject)
  })
}

async function optimizeImage(sourcePath, branchId, slug) {
  const baseDir = path.join(OUT_DIR, branchId, 'images', slug)
  await fs.mkdir(baseDir, { recursive: true })

  const meta = await sharp(sourcePath).rotate().metadata()
  const aspect = meta.width && meta.height ? meta.width / meta.height : 4 / 5

  const outputs = {}

  for (const [sizeName, width] of Object.entries(IMAGE_WIDTHS)) {
    const height = Math.round(width / aspect)
    const pipeline = sharp(sourcePath)
      .rotate()
      .resize(width, height, { fit: 'cover', position: 'centre' })

    const webpPath = path.join(baseDir, `${sizeName}.webp`)
    const avifPath = path.join(baseDir, `${sizeName}.avif`)

    await pipeline.clone().webp({ quality: sizeName === 'thumb' ? 72 : 80, effort: 4 }).toFile(webpPath)
    await pipeline.clone().avif({ quality: sizeName === 'thumb' ? 55 : 62, effort: 4 }).toFile(avifPath)

    outputs[sizeName] = {
      webp: `/ufg-media/${branchId}/images/${slug}/${sizeName}.webp`,
      avif: `/ufg-media/${branchId}/images/${slug}/${sizeName}.avif`,
      width,
      height,
    }
  }

  const blurPath = path.join(baseDir, 'blur.webp')
  await sharp(sourcePath)
    .rotate()
    .resize(24, Math.round(24 / aspect), { fit: 'cover' })
    .webp({ quality: 40 })
    .toFile(blurPath)

  outputs.blur = `/ufg-media/${branchId}/images/${slug}/blur.webp`
  outputs.aspect = aspect
  outputs.original = path.basename(sourcePath)

  return outputs
}

async function optimizeVideo(sourcePath, branchId, slug) {
  const baseDir = path.join(OUT_DIR, branchId, 'videos', slug)
  await fs.mkdir(baseDir, { recursive: true })

  const posterWebp = path.join(baseDir, 'poster.webp')
  const posterJpg = path.join(baseDir, 'poster.jpg')
  const mobileMp4 = path.join(baseDir, 'mobile.mp4')
  const desktopMp4 = path.join(baseDir, 'desktop.mp4')
  const mobileWebm = path.join(baseDir, 'mobile.webm')

  await runFfmpeg([
    '-y',
    '-i',
    sourcePath,
    '-ss',
    '00:00:00.5',
    '-vframes',
    '1',
    '-vf',
    'scale=1280:-2',
    '-q:v',
    '3',
    posterJpg,
  ])

  await sharp(posterJpg).webp({ quality: 78 }).toFile(posterWebp)

  const mp4Args = (out, scale) => [
    '-y',
    '-i',
    sourcePath,
    '-an',
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '28',
    '-movflags',
    '+faststart',
    '-vf',
    scale,
    '-pix_fmt',
    'yuv420p',
    out,
  ]

  await runFfmpeg(mp4Args(mobileMp4, "scale='min(854,iw)':-2"))
  await runFfmpeg(mp4Args(desktopMp4, "scale='min(1280,iw)':-2"))

  try {
    await runFfmpeg([
      '-y',
      '-i',
      sourcePath,
      '-an',
      '-c:v',
      'libvpx-vp9',
      '-crf',
      '32',
      '-b:v',
      '0',
      '-vf',
      "scale='min(854,iw)':-2",
      '-row-mt',
      '1',
      mobileWebm,
    ])
  } catch {
    console.warn(`  WebM skipped for ${slug} (encoder unavailable)`)
  }

  const posterMeta = await sharp(posterJpg).metadata()

  return {
    poster: `/ufg-media/${branchId}/videos/${slug}/poster.webp`,
    posterJpg: `/ufg-media/${branchId}/videos/${slug}/poster.jpg`,
    mobile: {
      mp4: `/ufg-media/${branchId}/videos/${slug}/mobile.mp4`,
      webm: (await fs.stat(mobileWebm).then(() => true).catch(() => false))
        ? `/ufg-media/${branchId}/videos/${slug}/mobile.webm`
        : null,
    },
    desktop: {
      mp4: `/ufg-media/${branchId}/videos/${slug}/desktop.mp4`,
    },
    width: posterMeta.width ?? 854,
    height: posterMeta.height ?? 480,
    original: path.basename(sourcePath),
  }
}

async function processBranch(branchId, folderName, sourceRoot) {
  const folderPath = path.join(sourceRoot, folderName)
  let entries
  try {
    entries = await fs.readdir(folderPath)
  } catch {
    console.warn(`Skipping ${branchId}: folder not found at ${folderPath}`)
    return { branchId, images: {}, videos: {} }
  }

  const images = {}
  const videos = {}

  for (const file of entries.sort()) {
    const ext = path.extname(file).toLowerCase()
    const full = path.join(folderPath, file)
    const stat = await fs.stat(full).catch(() => null)
    if (!stat?.isFile()) continue

    const slug = slugFromFilename(file)
    if (IMAGE_EXT.has(ext)) {
      console.log(`  [img] ${branchId}/${slug}`)
      images[slug] = await optimizeImage(full, branchId, slug)
    } else if (VIDEO_EXT.has(ext)) {
      console.log(`  [vid] ${branchId}/${slug}`)
      videos[slug] = await optimizeVideo(full, branchId, slug)
    }
  }

  return { branchId, images, videos }
}

async function main() {
  const sourceRoot = process.env.UFG_MEDIA_SOURCE
    ? path.resolve(process.env.UFG_MEDIA_SOURCE)
    : DEFAULT_SOURCE

  console.log(`Source: ${sourceRoot}`)
  console.log(`Output: ${OUT_DIR}`)

  await fs.mkdir(OUT_DIR, { recursive: true })

  const manifest = {
    generatedAt: new Date().toISOString(),
    sourceRoot,
    branchSourceFolders: BRANCH_SOURCE_FOLDERS,
    branches: {},
  }

  for (const [branchId, folderName] of Object.entries(BRANCH_SOURCE_FOLDERS)) {
    console.log(`\nBranch: ${branchId} ← ${folderName}`)
    const result = await processBranch(branchId, folderName, sourceRoot)
    manifest.branches[branchId] = {
      sourceFolder: folderName,
      images: result.images,
      videos: result.videos,
    }
  }

  const manifestPath = path.join(OUT_DIR, 'manifest.json')
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`\nManifest written: ${manifestPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

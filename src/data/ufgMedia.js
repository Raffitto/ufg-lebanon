/**
 * UFG media registry — semantic roles, branch galleries, video strategy.
 *
 * Branch ↔ source folder (change in one place):
 *   ufg1 pics → mtayleb
 *   ufg2 pics → awkar
 */

export const BRANCH_SOURCE_FOLDERS = {
  mtayleb: 'ufg1 pics',
  awkar: 'ufg2 pics',
}

export const BRANCHES = {
  mtayleb: {
    id: 'mtayleb',
    name: 'Mtayleb',
    tagline: 'Cotton Mall · Main club',
    shortAddress: 'Cotton Mall, Mtayleb',
    mapsQuery: 'Ultimate+Fitness+Gym+Mtayleb+Lebanon',
  },
  awkar: {
    id: 'awkar',
    name: 'Awkar',
    tagline: 'North Beirut · Training floor',
    shortAddress: 'Awkar, Lebanon',
    mapsQuery: 'Ultimate+Fitness+Gym+Awkar+Lebanon',
  },
}

/**
 * Video audit — 4 clips total (2 Mtayleb, 2 Awkar).
 * Ranked from ffprobe: duration, bitrate, file size, vertical 720×1280.
 */
export const VIDEO_AUDIT = {
  'mtayleb/img-7718': {
    branch: 'mtayleb',
    slug: 'img-7718',
    source: 'IMG_7718.MP4',
    durationSec: 8.3,
    resolution: '720×1280',
    tier: 'hero',
    use: 'Site hero — longest clip, strongest atmosphere and energy',
  },
  'mtayleb/img-7717': {
    branch: 'mtayleb',
    slug: 'img-7717',
    source: 'IMG_7717.MP4',
    durationSec: 6.87,
    resolution: '720×1280',
    tier: 'section',
    use: 'Branch loop, offer backdrop, strength/lifting services, gallery',
  },
  'awkar/img-7651': {
    branch: 'awkar',
    slug: 'img-7651',
    source: 'IMG_7651.MP4',
    durationSec: 4.3,
    resolution: '720×1280',
    tier: 'section',
    use: 'Awkar branch loop, coaching/movement services, final CTA',
  },
  'awkar/img-7652': {
    branch: 'awkar',
    slug: 'img-7652',
    source: 'IMG_7652.MP4',
    durationSec: 4.67,
    resolution: '720×1280',
    tier: 'gallery',
    use: 'Cardio services clip, gallery tap-to-play',
  },
}

const B = (branch, slug, size = 'desktop') =>
  `/ufg-media/${branch}/images/${slug}/${size}.webp`

const BLUR = (branch, slug) => `/ufg-media/${branch}/images/${slug}/blur.webp`

export function imageSrcSet(branch, slug, format = 'webp') {
  const sizes = ['thumb', 'mobile', 'tablet', 'desktop']
  return sizes
    .map((s) => {
      const w = { thumb: 320, mobile: 640, tablet: 1024, desktop: 1600 }[s]
      return `/ufg-media/${branch}/images/${slug}/${s}.${format} ${w}w`
    })
    .join(', ')
}

export function imagePaths(branch, slug) {
  return {
    blur: BLUR(branch, slug),
    thumb: B(branch, slug, 'thumb'),
    mobile: B(branch, slug, 'mobile'),
    tablet: B(branch, slug, 'tablet'),
    desktop: B(branch, slug, 'desktop'),
    srcSet: imageSrcSet(branch, slug, 'webp'),
    srcSetAvif: imageSrcSet(branch, slug, 'avif'),
  }
}

export function videoPaths(branch, slug) {
  const base = `/ufg-media/${branch}/videos/${slug}`
  return {
    poster: `${base}/poster.webp`,
    mobileMp4: `${base}/mobile.mp4`,
    desktopMp4: `${base}/desktop.mp4`,
    mobileWebm: `${base}/mobile.webm`,
  }
}

function img(branch, slug, alt, opts = {}) {
  return {
    type: 'image',
    branch,
    slug,
    alt,
    priority: opts.priority ?? false,
    ...imagePaths(branch, slug),
    width: opts.width ?? 1600,
    height: opts.height ?? 2000,
    caption: opts.caption,
  }
}

function vid(branch, slug, alt, opts = {}) {
  return {
    type: 'video',
    branch,
    slug,
    alt,
    priority: opts.priority ?? false,
    muted: true,
    loop: opts.loop ?? true,
    ...videoPaths(branch, slug),
    width: opts.width ?? 720,
    height: opts.height ?? 1280,
    caption: opts.caption,
    videoTier: opts.videoTier,
  }
}

/** Cinematic placement map */
export const videoStrategy = {
  hero: vid('mtayleb', 'img-7718', 'Training energy at Ultimate Fitness Gym Mtayleb', {
    priority: true,
    videoTier: 'hero',
    caption: 'Built Different',
  }),
  heroPoster: imagePaths('mtayleb', 'img-7762'),

  branchLoop: {
    mtayleb: vid('mtayleb', 'img-7717', 'Mtayleb branch training atmosphere', {
      videoTier: 'section',
      caption: 'Mtayleb',
    }),
    awkar: vid('awkar', 'img-7651', 'Awkar branch training atmosphere', {
      videoTier: 'section',
      caption: 'Awkar',
    }),
  },

  offer: vid('mtayleb', 'img-7717', 'Members training during welcome offer at UFG', {
    videoTier: 'section',
  }),

  finalCta: vid('awkar', 'img-7651', 'Group energy at Ultimate Fitness Gym Awkar', {
    videoTier: 'section',
  }),

  services: {
    'personal-training': vid('awkar', 'img-7651', 'Personal coaching session at UFG', {
      caption: 'Coaching',
      videoTier: 'section',
    }),
    strength: vid('mtayleb', 'img-7717', 'Heavy lifting at UFG Mtayleb', {
      caption: 'Lifting',
      videoTier: 'section',
    }),
    functional: vid('mtayleb', 'img-7718', 'Athletic movement and functional training', {
      caption: 'Movement',
      videoTier: 'section',
    }),
    cardio: vid('awkar', 'img-7652', 'Cardio and conditioning at UFG Awkar', {
      caption: 'Cardio',
      videoTier: 'gallery',
    }),
    bodybuilding: vid('mtayleb', 'img-7718', 'Hypertrophy training on machines at UFG', {
      caption: 'Machines',
      videoTier: 'section',
    }),
  },
}

export const ufgMedia = {
  hero: videoStrategy.hero,
  heroFallback: img('mtayleb', 'img-7762', 'Athletes training at Ultimate Fitness Gym Mtayleb', {
    priority: true,
  }),

  offerBackdrop: videoStrategy.offer,

  finalCtaBackdrop: videoStrategy.finalCta,

  branchCards: {
    mtayleb: videoStrategy.branchLoop.mtayleb,
    awkar: videoStrategy.branchLoop.awkar,
  },

  branchCardFallback: {
    mtayleb: img('mtayleb', 'img-7794', 'Ultimate Fitness Gym Mtayleb', { width: 1290, height: 1292 }),
    awkar: img('awkar', 'img-7650', 'Ultimate Fitness Gym Awkar', { width: 1536, height: 2048 }),
  },

  servicesAmbience: [
    img('mtayleb', 'img-7758', 'Free weights at UFG Mtayleb', { caption: 'Strength' }),
    img('awkar', 'img-7649', 'Conditioning floor at UFG Awkar', { caption: 'Conditioning' }),
    img('awkar', 'img-7658', 'Functional zone at UFG Awkar', { caption: 'Functional' }),
    img('mtayleb', 'img-7760', 'Premium equipment at UFG Mtayleb', { caption: 'Equipment' }),
  ],

  transformations: [
    {
      ...vid('mtayleb', 'img-7717', 'Transformation training at UFG Mtayleb', { caption: '12-Week Cut' }),
      featured: true,
    },
    img('mtayleb', 'img-7761', 'Muscle building session at UFG Mtayleb', { caption: 'Muscle Build' }),
    img('awkar', 'img-7670', 'Athletic reset conditioning at UFG Awkar', { caption: 'Athletic Reset' }),
  ],

  locationMtayleb: img('mtayleb', 'img-7759', 'Mtayleb training floor wide view', {
    width: 1290,
    height: 2796,
  }),

  locationAwkar: img('awkar', 'img-7756', 'Awkar gym interior', { width: 1290, height: 2796 }),
}

/** Gallery — videos first for cinematic impact */
export const galleryByBranch = {
  mtayleb: [
    vid('mtayleb', 'img-7718', 'Cinematic training reel at UFG Mtayleb', { caption: 'Club Energy' }),
    vid('mtayleb', 'img-7717', 'Strength and lifting at UFG Mtayleb', { caption: 'Training Floor' }),
    img('mtayleb', 'img-7762', 'Atmospheric training at UFG Mtayleb', { caption: 'Atmosphere' }),
    img('mtayleb', 'img-7758', 'Strength floor at UFG Mtayleb', { caption: 'Strength Floor' }),
    img('mtayleb', 'img-7759', 'Wide view of Mtayleb floor', { caption: 'The Floor' }),
    img('mtayleb', 'img-7760', 'Premium equipment', { caption: 'Equipment' }),
    img('mtayleb', 'img-7761', 'Member in session', { caption: 'In Session' }),
    img('mtayleb', 'img-7763', 'High-energy workout', { caption: 'High Energy' }),
  ],
  awkar: [
    vid('awkar', 'img-7651', 'Awkar training atmosphere', { caption: 'Club Energy' }),
    vid('awkar', 'img-7652', 'Cardio and conditioning reel', { caption: 'Conditioning' }),
    img('awkar', 'img-7650', 'Main training floor', { caption: 'Main Floor' }),
    img('awkar', 'img-7648', 'Strength area', { caption: 'Strength Area' }),
    img('awkar', 'img-7649', 'Cardio zone', { caption: 'Cardio Zone' }),
    img('awkar', 'img-7655', 'Free weights', { caption: 'Free Weights' }),
    img('awkar', 'img-7656', 'Functional zone', { caption: 'Functional' }),
    img('awkar', 'img-7658', 'Conditioning space', { caption: 'Conditioning' }),
    img('awkar', 'img-7660', 'Club atmosphere', { caption: 'Atmosphere' }),
    img('awkar', 'img-7661', 'Community training', { caption: 'Community' }),
  ],
}

export const defaultGalleryBranch = 'mtayleb'

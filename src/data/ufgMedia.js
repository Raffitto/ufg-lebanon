/**
 * UFG media registry — semantic roles + branch galleries.
 *
 * Branch ↔ source folder mapping (change in one place):
 *   ufg1 pics → mtayleb (primary location in site copy)
 *   ufg2 pics → awkar
 * Re-run `npm run optimize-media` after changing folders or adding files.
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

const B = (branch, slug, size = 'desktop') =>
  `/ufg-media/${branch}/images/${slug}/${size}.webp`

const V = (branch, slug, variant = 'mobile') =>
  `/ufg-media/${branch}/videos/${slug}/${variant}.mp4`

const POSTER = (branch, slug) => `/ufg-media/${branch}/videos/${slug}/poster.webp`

const BLUR = (branch, slug) => `/ufg-media/${branch}/images/${slug}/blur.webp`

/** Build responsive srcset from branch + image slug */
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
  return {
    poster: POSTER(branch, slug),
    mobileMp4: V(branch, slug, 'mobile'),
    desktopMp4: V(branch, slug, 'desktop'),
    mobileWebm: `/ufg-media/${branch}/videos/${slug}/mobile.webm`,
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
    width: opts.width ?? 1280,
    height: opts.height ?? 720,
    caption: opts.caption,
  }
}

/** High-impact placements */
export const ufgMedia = {
  hero: {
    type: 'image',
    branch: 'mtayleb',
    slug: 'img-7762',
    alt: 'Athletes training under dramatic lighting at Ultimate Fitness Gym Mtayleb',
    priority: true,
    ...imagePaths('mtayleb', 'img-7762'),
    width: 1600,
    height: 2000,
  },

  heroVideo: {
    type: 'video',
    branch: 'mtayleb',
    slug: 'img-7717',
    alt: 'Training atmosphere video at Ultimate Fitness Gym Mtayleb',
    priority: false,
    loop: true,
    ...videoPaths('mtayleb', 'img-7717'),
    width: 1280,
    height: 720,
  },

  offerBackdrop: img('mtayleb', 'img-7763', 'Members training at Ultimate Fitness Gym', {
    caption: 'Club energy',
    width: 1600,
    height: 2000,
  }),

  finalCtaBackdrop: img('awkar', 'img-7661', 'Group training session at Ultimate Fitness Gym Awkar', {
    width: 1600,
    height: 1200,
  }),

  branchCards: {
    mtayleb: img('mtayleb', 'img-7794', 'Ultimate Fitness Gym Mtayleb entrance and training floor', {
      caption: 'Mtayleb',
      width: 1290,
      height: 1292,
    }),
    awkar: img('awkar', 'img-7650', 'Ultimate Fitness Gym Awkar strength and conditioning area', {
      caption: 'Awkar',
      width: 1536,
      height: 2048,
    }),
  },

  servicesAmbience: [
    img('mtayleb', 'img-7758', 'Free weights and strength zone at UFG Mtayleb', { caption: 'Strength' }),
    img('awkar', 'img-7649', 'Cardio and conditioning floor at UFG Awkar', { caption: 'Conditioning' }),
    img('awkar', 'img-7658', 'Functional training space at UFG Awkar', { caption: 'Functional' }),
    img('mtayleb', 'img-7760', 'Premium gym equipment at UFG Mtayleb', { caption: 'Equipment' }),
  ],

  transformations: [
    img('awkar', 'img-7660', 'Member mid-workout at Ultimate Fitness Gym Awkar', {
      caption: '12-Week Cut',
      width: 1536,
      height: 2048,
    }),
    img('mtayleb', 'img-7761', 'Intense training session at UFG Mtayleb', {
      caption: 'Muscle Build',
      width: 1290,
      height: 2796,
    }),
    img('awkar', 'img-7670', 'Athletic conditioning at UFG Awkar', {
      caption: 'Athletic Reset',
      width: 1290,
      height: 2796,
    }),
  ],

  locationMtayleb: img('mtayleb', 'img-7759', 'Ultimate Fitness Gym Mtayleb training floor wide view', {
    width: 1290,
    height: 2796,
  }),

  locationAwkar: img('awkar', 'img-7756', 'Ultimate Fitness Gym Awkar interior', {
    width: 1290,
    height: 2796,
  }),

  trainersAmbience: img('awkar', 'img-7655', 'Coaching and training at Ultimate Fitness Gym', {
    width: 1536,
    height: 2048,
  }),
}

export const galleryByBranch = {
  mtayleb: [
    img('mtayleb', 'img-7758', 'Strength floor at Ultimate Fitness Gym Mtayleb', { caption: 'Strength Floor' }),
    img('mtayleb', 'img-7759', 'Wide view of the Mtayleb training floor', { caption: 'Training Floor' }),
    img('mtayleb', 'img-7760', 'Premium equipment at UFG Mtayleb', { caption: 'Premium Equipment' }),
    img('mtayleb', 'img-7761', 'Member training at UFG Mtayleb', { caption: 'In Session' }),
    img('mtayleb', 'img-7762', 'Atmospheric training at UFG Mtayleb', { caption: 'Club Atmosphere' }),
    img('mtayleb', 'img-7763', 'High-energy workout at UFG Mtayleb', { caption: 'High Energy' }),
    vid('mtayleb', 'img-7717', 'Training reel from UFG Mtayleb', { caption: 'Training Reel' }),
    vid('mtayleb', 'img-7718', 'Gym atmosphere video at UFG Mtayleb', { caption: 'Club Vibe' }),
  ],
  awkar: [
    img('awkar', 'img-7648', 'Strength area at Ultimate Fitness Gym Awkar', { caption: 'Strength Area' }),
    img('awkar', 'img-7649', 'Cardio zone at UFG Awkar', { caption: 'Cardio Zone' }),
    img('awkar', 'img-7650', 'Main training floor at UFG Awkar', { caption: 'Main Floor' }),
    img('awkar', 'img-7655', 'Free weights at UFG Awkar', { caption: 'Free Weights' }),
    img('awkar', 'img-7656', 'Functional training at UFG Awkar', { caption: 'Functional Zone' }),
    img('awkar', 'img-7658', 'Conditioning space at UFG Awkar', { caption: 'Conditioning' }),
    img('awkar', 'img-7659', 'Members training at UFG Awkar', { caption: 'Training Session' }),
    img('awkar', 'img-7660', 'Club atmosphere at UFG Awkar', { caption: 'Club Atmosphere' }),
    img('awkar', 'img-7661', 'Community training at UFG Awkar', { caption: 'Community' }),
    img('awkar', 'img-7665', 'Facilities at UFG Awkar', { caption: 'Facilities' }),
    vid('awkar', 'img-7651', 'Training video from UFG Awkar', { caption: 'Training Reel' }),
    vid('awkar', 'img-7652', 'Gym atmosphere at UFG Awkar', { caption: 'Club Vibe' }),
  ],
}

export const defaultGalleryBranch = 'mtayleb'

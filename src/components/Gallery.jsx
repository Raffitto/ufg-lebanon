import { useState } from 'react'
import { motion } from 'framer-motion'
import { activeConfig } from '../data/activeConfig'
import { BRANCHES, defaultGalleryBranch, galleryByBranch } from '../data/ufgMedia'
import { useReducedMotion } from '../hooks/useReducedMotion'
import GalleryVideo from './ui/GalleryVideo'
import ResponsiveImage from './ui/ResponsiveImage'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

const branchTabs = [BRANCHES.mtayleb, BRANCHES.awkar]

function GalleryItem({ item, reduced, index }) {
  const Figure = reduced ? 'figure' : motion.figure
  const isVideo = item.type === 'video'

  return (
    <Figure
      className="group relative aspect-[4/5] min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-surface)] sm:aspect-[5/4] lg:aspect-[4/3]"
      {...(reduced
        ? {}
        : {
            initial: { opacity: 0, y: 12 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.12 },
            transition: { delay: Math.min(index * 0.04, 0.2), duration: 0.4 },
            whileHover: { scale: 1.012 },
          })}
    >
      {isVideo ? (
        <GalleryVideo media={item} className="absolute inset-0 z-[1]" />
      ) : (
        <ResponsiveImage
          media={item}
          sizesPreset="gallery"
          className="absolute inset-0"
          showBlur
        />
      )}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-black/40 transition group-hover:bg-black/25" />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] p-3 sm:p-4">
        <p className="font-display text-lg text-white uppercase sm:text-xl">
          {item.caption ?? item.alt}
        </p>
        <p className="text-[10px] tracking-[0.14em] text-white/60 uppercase sm:text-xs">
          {isVideo ? 'Video' : activeConfig.sections.gallery.itemLabel} ·{' '}
          {BRANCHES[item.branch]?.name}
        </p>
      </figcaption>
    </Figure>
  )
}

export default function Gallery() {
  const reduced = useReducedMotion()
  const [activeBranch, setActiveBranch] = useState(defaultGalleryBranch)
  const items = galleryByBranch[activeBranch] ?? []

  return (
    <SectionReveal id="gallery" className="section-padding bg-[var(--color-surface)]/40">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <SectionHeader
          eyebrow={activeConfig.sections.gallery.eyebrow}
          title={activeConfig.sections.gallery.title}
          subtitle="Photos and reels from the training floor — tap videos to play."
        />

        <div
          className="mb-6 flex gap-2 sm:mb-8"
          role="tablist"
          aria-label="Select branch gallery"
        >
          {branchTabs.map((branch) => {
            const selected = activeBranch === branch.id
            return (
              <button
                key={branch.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`gallery-panel-${branch.id}`}
                id={`gallery-tab-${branch.id}`}
                onClick={() => setActiveBranch(branch.id)}
                className={`min-h-[2.75rem] rounded-full px-4 py-2 text-xs font-semibold tracking-wide uppercase transition sm:px-5 sm:text-sm ${
                  selected
                    ? 'bg-[var(--color-yellow)] text-black'
                    : 'border border-white/15 bg-white/5 text-white/80 hover:border-[var(--color-yellow)]/40'
                }`}
              >
                {branch.name}
              </button>
            )
          })}
        </div>

        <div
          id={`gallery-panel-${activeBranch}`}
          role="tabpanel"
          aria-labelledby={`gallery-tab-${activeBranch}`}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <GalleryItem key={`${item.branch}-${item.slug}`} item={item} reduced={reduced} index={index} />
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}

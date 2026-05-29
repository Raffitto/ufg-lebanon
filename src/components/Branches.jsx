import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { BRANCHES, ufgMedia } from '../data/ufgMedia'
import { activeConfig } from '../data/activeConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { scrollToId } from '../utils/links'
import ResponsiveImage from './ui/ResponsiveImage'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

export default function Branches() {
  const reduced = useReducedMotion()
  const cards = [
    { branch: BRANCHES.mtayleb, media: ufgMedia.branchCards.mtayleb },
    { branch: BRANCHES.awkar, media: ufgMedia.branchCards.awkar },
  ]

  return (
    <SectionReveal id="branches" className="section-padding">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <SectionHeader
          eyebrow="Our Locations"
          title="Two Branches. One Standard."
          subtitle="Train at Mtayleb or Awkar — same elite coaching culture, premium equipment, and transformation focus."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {cards.map(({ branch, media }, index) => {
            const Card = reduced ? 'article' : motion.article
            return (
              <Card
                key={branch.id}
                className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-surface)]"
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: 16 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.2 },
                      transition: { delay: index * 0.06, duration: 0.45 },
                    })}
              >
                <div className="relative aspect-[16/10] sm:aspect-[5/3]">
                  <ResponsiveImage
                    media={media}
                    sizesPreset="card"
                    className="absolute inset-0"
                    overlayClassName="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="font-display text-2xl text-white uppercase sm:text-3xl">
                      {branch.name}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-yellow)] sm:text-sm">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {branch.tagline}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
                  <p className="text-sm text-[var(--color-gray)]">{branch.shortAddress}</p>
                  <button
                    type="button"
                    onClick={() => scrollToId('gallery')}
                    className="text-xs font-semibold tracking-wide text-[var(--color-yellow)] uppercase transition hover:text-white"
                  >
                    View gallery →
                  </button>
                </div>
              </Card>
            )
          })}
        </div>

        <p className="mt-6 text-center text-xs text-white/45 sm:text-sm">
          {activeConfig.brandName} · {activeConfig.copy.builtFor}
        </p>
      </div>
    </SectionReveal>
  )
}

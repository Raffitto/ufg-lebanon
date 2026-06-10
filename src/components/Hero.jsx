import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { activeConfig } from '../data/activeConfig'
import { launchMedia } from '../data/launchMedia'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeUp, motionTransition } from '../utils/motion'
import { scrollToId } from '../utils/links'
import SectionVideo from './ui/SectionVideo'

function BranchSelectorCard({ branch, reduced, index }) {
  const Card = reduced ? 'button' : motion.button

  return (
    <Card
      type="button"
      onClick={() => scrollToId(branch.targetId)}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-black/45 p-6 text-left backdrop-blur-md transition hover:border-[var(--color-yellow)]/50 hover:bg-black/55 sm:rounded-[var(--radius-xl)] sm:p-8"
      {...(reduced
        ? {}
        : {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.15 + index * 0.08, duration: 0.5 },
            whileHover: { y: -4, scale: 1.01 },
            whileTap: { scale: 0.99 },
          })}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,229,0,0.12),transparent_55%)] opacity-0 transition group-hover:opacity-100"
        aria-hidden="true"
      />
      <div className="relative z-10 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display text-3xl leading-none text-white uppercase sm:text-4xl md:text-5xl">
            {branch.name}
          </p>
          <p className="mt-3 text-sm tracking-wide text-[var(--color-yellow)] sm:text-base">
            {branch.tagline}
          </p>
        </div>
        <ChevronRight
          className="h-6 w-6 shrink-0 text-[var(--color-yellow)] transition group-hover:translate-x-0.5 sm:h-7 sm:w-7"
          aria-hidden="true"
        />
      </div>
    </Card>
  )
}

export default function Hero() {
  const { hero } = activeConfig
  const reduced = useReducedMotion()

  const content = (
    <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center space-y-6 text-center sm:space-y-8">
      {hero.badge ? (
        <p className="inline-flex max-w-full rounded-full border border-[var(--color-yellow)]/30 bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-[var(--color-yellow)] uppercase backdrop-blur-sm sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.2em]">
          {hero.badge}
        </p>
      ) : null}

      <div className="space-y-3 sm:space-y-4">
        <h1 className="font-display hero-title text-white uppercase">{hero.headline}</h1>
        <p className="mx-auto max-w-lg text-[0.9375rem] leading-snug text-white/75 sm:text-base md:text-lg">
          {hero.subheadline}
        </p>
      </div>

      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
        {hero.branchCards.map((branch, index) => (
          <BranchSelectorCard key={branch.targetId} branch={branch} reduced={reduced} index={index} />
        ))}
      </div>
    </div>
  )

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--header-h)] pb-10 sm:pb-16"
    >
      <SectionVideo src={launchMedia.intro} loadMode="immediate" priority className="absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-black)] to-transparent sm:h-48" aria-hidden="true" />

      <div className="relative z-10 w-full px-[var(--page-gutter)] py-8 sm:py-12">
        {reduced ? (
          content
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            transition={motionTransition(0.6)}
            variants={fadeUp}
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  )
}

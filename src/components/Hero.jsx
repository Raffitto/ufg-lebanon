import { motion } from 'framer-motion'
import { ArrowRight, MapPin, MessageCircle } from 'lucide-react'
import { activeConfig } from '../data/activeConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { fadeIn, fadeUp, motionTransition } from '../utils/motion'
import { scrollToId, whatsappHref } from '../utils/links'
import Button from './ui/Button'
import Logo from './ui/Logo'

export default function Hero() {
  const { hero, copy } = activeConfig
  const reduced = useReducedMotion()

  const primaryBlock = (
    <div className="min-w-0 space-y-5 sm:space-y-7">
      {hero.badge ? (
        <p className="inline-flex max-w-full rounded-full border border-[var(--color-yellow)]/30 bg-[var(--color-yellow)]/10 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-[var(--color-yellow)] uppercase sm:px-4 sm:py-1.5 sm:text-xs sm:tracking-[0.2em]">
          {hero.badge}
        </p>
      ) : null}

      <div className="space-y-3 sm:space-y-4">
        <h1 className="font-display hero-title text-white uppercase">{hero.headline}</h1>
        <p className="max-w-md text-[0.9375rem] leading-snug text-[var(--color-gray)] sm:text-base md:max-w-xl md:text-lg">
          {hero.subheadline}
        </p>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-2.5 sm:gap-3 sm:flex-row sm:flex-wrap">
        <Button
          href={whatsappHref(activeConfig.whatsapp, activeConfig.whatsappMessage)}
          icon={MessageCircle}
          fullWidth
          className="sm:flex-1 sm:min-w-[10rem]"
          ariaLabel={hero.primaryCta}
        >
          {hero.primaryCta}
        </Button>
        <Button
          variant="secondary"
          onClick={() => scrollToId('branches')}
          icon={MapPin}
          fullWidth
          className="sm:flex-1 sm:min-w-[10rem]"
          ariaLabel={hero.secondaryCta}
        >
          {hero.secondaryCta}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
        <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-2.5 py-3 sm:px-4 sm:py-4">
          <p className="font-display text-xl text-[var(--color-yellow)] sm:text-2xl">
            {activeConfig.opensDisplay}
          </p>
          <p className="text-[10px] tracking-wide text-white/55 uppercase sm:text-xs">
            {copy.opensDailyLabel}
          </p>
        </div>
        <div className="min-w-0 rounded-xl border border-white/10 bg-white/5 px-2.5 py-3 sm:px-4 sm:py-4">
          <p className="font-display text-xl text-white sm:text-2xl">2</p>
          <p className="text-[10px] tracking-wide text-white/55 uppercase sm:text-xs">
            {copy.branchesLabel}
          </p>
        </div>
        <div className="col-span-2 min-w-0 rounded-xl border border-[var(--color-yellow)]/20 bg-[var(--color-yellow)]/5 px-2.5 py-3 sm:col-span-1 sm:px-4 sm:py-4">
          <p className="font-display text-lg leading-tight text-white uppercase sm:text-xl">
            Mtayleb · Awkar
          </p>
          <p className="text-[10px] tracking-wide text-white/55 uppercase sm:text-xs">
            {copy.trainLocalLabel}
          </p>
        </div>
      </div>
    </div>
  )

  const sideCard = (
    <div className="glass-card relative mt-6 hidden min-w-0 overflow-hidden rounded-[var(--radius-xl)] sm:mt-8 sm:block sm:p-0 lg:mt-0">
      <div className="relative min-h-[280px] bg-[linear-gradient(145deg,#1a1600_0%,#121212_45%,#050505_100%)] md:min-h-[360px]">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,229,0,0.18),transparent_50%)]"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cpath d=%22M0 40h40V0%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.04)%22/%3E%3C/svg%3E')] opacity-60" aria-hidden="true" />
        <div className="absolute top-5 right-5 z-10 sm:top-6 sm:right-6">
          <Logo imageClassName="h-12 w-12 sm:h-14 sm:w-14" />
        </div>
        <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-6 sm:p-8 md:min-h-[360px]">
          <p className="font-display text-xs tracking-[0.22em] text-[var(--color-yellow)] uppercase sm:text-sm sm:tracking-[0.24em]">
            {activeConfig.tagline}
          </p>
          <p className="mt-3 font-display text-2xl leading-none text-white uppercase md:text-3xl">
            {activeConfig.copy.builtFor}
          </p>
          <p className="mt-2 text-sm text-white/70">{activeConfig.copy.trainWithPurpose}</p>
          <button
            type="button"
            onClick={() => scrollToId('offer')}
            className="mt-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[var(--color-yellow)] uppercase transition hover:text-white"
          >
            {copy.viewOfferLabel}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-[calc(var(--header-h)+0.75rem)] pb-8 sm:min-h-[100svh] sm:pb-16 sm:pt-24 md:pb-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#050505_55%,#050505_100%),radial-gradient(circle_at_18%_12%,rgba(255,229,0,0.14),transparent_42%),radial-gradient(circle_at_85%_75%,rgba(255,229,0,0.06),transparent_35%)]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cpath d=%22M0 40h40V0%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.03)%22/%3E%3C/svg%3E')] opacity-40" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-black)] to-transparent sm:h-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full min-w-0 max-w-7xl px-[var(--page-gutter)] lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        {reduced ? (
          primaryBlock
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            transition={motionTransition(0.6)}
            variants={fadeUp}
            className="min-w-0"
          >
            {primaryBlock}
          </motion.div>
        )}

        {reduced ? (
          sideCard
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            transition={motionTransition(0.65, 0.08)}
            variants={fadeIn}
            className="min-w-0"
          >
            {sideCard}
          </motion.div>
        )}
      </div>
    </section>
  )
}

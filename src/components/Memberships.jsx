import { MessageCircle, Star, Trophy, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { activeConfig } from '../data/activeConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { whatsappHref } from '../utils/links'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

const badgeConfig = {
  popular: {
    label: 'Most Popular',
    icon: Star,
    className: 'bg-[var(--color-yellow)] text-black',
  },
  bestValue: {
    label: 'Best Value',
    icon: Trophy,
    className: 'border border-[var(--color-yellow)]/40 bg-[var(--color-yellow)]/15 text-[var(--color-yellow)]',
  },
  premiumTraining: {
    label: 'Premium Training',
    icon: Zap,
    className: 'border border-[var(--color-yellow)]/40 bg-[var(--color-yellow)]/15 text-[var(--color-yellow)]',
  },
}

function MembershipCard({ plan, reduced, index }) {
  const badge = plan.badge ? badgeConfig[plan.badge] : null
  const BadgeIcon = badge?.icon
  const isHighlighted = Boolean(plan.badge)
  const Card = reduced ? 'article' : motion.article

  return (
    <Card
      className={`relative flex min-w-0 flex-col rounded-2xl border p-5 sm:rounded-[var(--radius-xl)] sm:p-6 ${
        isHighlighted
          ? 'border-[var(--color-yellow)]/45 bg-gradient-to-b from-[#1f1a00] via-[#141414] to-[#0a0a0a] yellow-glow'
          : 'glass-card border-white/10'
      }`}
      {...(reduced
        ? {}
        : {
            initial: { opacity: 0, y: 14 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, amount: 0.15 },
            transition: { delay: index * 0.04, duration: 0.4 },
            whileHover: { y: -4 },
          })}
    >
      {badge ? (
        <span
          className={`absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide uppercase sm:left-5 sm:px-3 sm:text-xs ${badge.className}`}
        >
          {BadgeIcon ? <BadgeIcon className="h-3 w-3 shrink-0" aria-hidden="true" /> : null}
          {badge.label}
        </span>
      ) : null}

      <div className="mt-1 flex flex-1 flex-col">
        <p className="font-display text-lg leading-tight text-white uppercase sm:text-xl">
          {plan.name}
        </p>
        {plan.note ? (
          <p className="mt-1 text-xs tracking-wide text-white/45 uppercase">{plan.note}</p>
        ) : null}
        <p className="mt-4 font-display text-4xl leading-none text-[var(--color-yellow)] sm:mt-5 sm:text-5xl">
          {plan.price}
        </p>
        {plan.description ? (
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-gray)]">{plan.description}</p>
        ) : null}
      </div>

      {isHighlighted ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-yellow)]/50 to-transparent"
          aria-hidden="true"
        />
      ) : null}
    </Card>
  )
}

export default function Memberships({ embedded = false }) {
  const reduced = useReducedMotion()
  const { memberships, sections } = activeConfig

  const inner = (
    <div className="mx-auto w-full min-w-0 max-w-7xl">
      <SectionHeader
        eyebrow={sections.memberships.eyebrow}
        title={sections.memberships.title}
        subtitle={sections.memberships.subtitle}
        align={embedded ? 'left' : 'center'}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {memberships.plans.map((plan, index) => (
          <MembershipCard key={plan.id} plan={plan} reduced={reduced} index={index} />
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:mt-10">
        <Button
          href={whatsappHref(activeConfig.whatsapp, memberships.ctaMessage)}
          icon={MessageCircle}
          fullWidth
          className="max-w-md"
          ariaLabel={memberships.cta}
        >
          {memberships.cta}
        </Button>
      </div>
    </div>
  )

  if (embedded) {
    return (
      <div id="memberships" className="section-padding bg-[var(--color-black)]/95">
        {inner}
      </div>
    )
  }

  return (
    <SectionReveal id="memberships" className="section-padding bg-[var(--color-surface)]/40">
      {inner}
    </SectionReveal>
  )
}

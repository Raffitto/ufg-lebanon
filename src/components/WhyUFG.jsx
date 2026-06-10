import { Dumbbell, Shield, Target, Users } from 'lucide-react'
import { motion } from 'framer-motion'
import { activeConfig } from '../data/activeConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

const iconMap = {
  dumbbell: Dumbbell,
  target: Target,
  shield: Shield,
  users: Users,
}

export default function WhyUFG() {
  const reduced = useReducedMotion()
  const { whyUfg } = activeConfig

  return (
    <SectionReveal id="why-ufg" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,229,0,0.08),transparent_45%),radial-gradient(circle_at_10%_80%,rgba(255,229,0,0.05),transparent_40%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full min-w-0 max-w-7xl">
        <SectionHeader
          eyebrow={whyUfg.eyebrow}
          title={whyUfg.title}
          subtitle={whyUfg.subtitle}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
          {whyUfg.pillars.map((pillar, index) => {
            const Icon = iconMap[pillar.icon] ?? Dumbbell
            const Card = reduced ? 'article' : motion.article

            return (
              <Card
                key={pillar.id}
                className="glass-card min-w-0 rounded-2xl p-5 sm:p-6"
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, y: 14 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.2 },
                      transition: { delay: index * 0.06, duration: 0.45 },
                      whileHover: { y: -4 },
                    })}
              >
                <div className="mb-4 inline-flex rounded-xl border border-[var(--color-yellow)]/25 bg-[var(--color-yellow)]/10 p-2.5 text-[var(--color-yellow)]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-xl text-white uppercase sm:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-gray)] sm:mt-3">
                  {pillar.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </SectionReveal>
  )
}

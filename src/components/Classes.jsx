import { Calendar, Clock, Dumbbell, Flame, HeartPulse, MessageCircle, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { activeConfig } from '../data/activeConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { whatsappHref } from '../utils/links'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

const iconMap = {
  'heart-pulse': HeartPulse,
  dumbbell: Dumbbell,
  zap: Zap,
  flame: Flame,
}

export default function Classes() {
  const reduced = useReducedMotion()
  const { classes, sections } = activeConfig

  return (
    <SectionReveal id="classes" className="section-padding">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <SectionHeader
          eyebrow={sections.classes.eyebrow}
          title={sections.classes.title}
          subtitle={sections.classes.subtitle}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5">
          {classes.items.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Dumbbell
            const Card = reduced ? 'article' : motion.article

            return (
              <Card
                key={item.id}
                className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-surface)]"
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
                <div
                  className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[var(--color-yellow)] via-[var(--color-yellow)]/60 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex min-w-0 items-start gap-4">
                    <div className="inline-flex shrink-0 rounded-xl border border-[var(--color-yellow)]/25 bg-[var(--color-yellow)]/10 p-2.5 text-[var(--color-yellow)] transition group-hover:border-[var(--color-yellow)]/50 group-hover:bg-[var(--color-yellow)]/15">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-2xl leading-none text-white uppercase sm:text-3xl">
                        {item.name}
                      </p>
                      <p className="mt-2 text-sm text-[var(--color-gray)]">{item.focus}</p>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:items-end sm:text-right">
                    <p className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90 uppercase">
                      <Calendar className="h-4 w-4 text-[var(--color-yellow)]" aria-hidden="true" />
                      {item.day}
                    </p>
                    <p className="inline-flex items-center gap-2 font-display text-xl text-[var(--color-yellow)] sm:text-2xl">
                      <Clock className="h-4 w-4 shrink-0 opacity-80" aria-hidden="true" />
                      {item.time}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Button
            href={whatsappHref(activeConfig.whatsapp, classes.ctaMessage)}
            icon={MessageCircle}
            fullWidth
            className="max-w-md"
            ariaLabel={classes.cta}
          >
            {classes.cta}
          </Button>
        </div>
      </div>
    </SectionReveal>
  )
}

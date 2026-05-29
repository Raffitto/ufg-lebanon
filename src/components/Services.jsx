import {
  Apple,
  CupSoda,
  Dumbbell,
  Flame,
  HeartPulse,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { activeConfig } from '../data/activeConfig'
import { videoStrategy } from '../data/ufgMedia'
import { useReducedMotion } from '../hooks/useReducedMotion'
import BackgroundVideo from './ui/BackgroundVideo'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

const iconMap = {
  dumbbell: Dumbbell,
  flame: Flame,
  zap: Zap,
  'heart-pulse': HeartPulse,
  apple: Apple,
  trophy: Trophy,
  target: Target,
  'cup-soda': CupSoda,
}

const VIDEO_SERVICE_IDS = [
  'personal-training',
  'strength',
  'functional',
  'cardio',
  'bodybuilding',
]

export default function Services() {
  const reduced = useReducedMotion()

  return (
    <SectionReveal id="services" className="section-padding bg-[var(--color-surface)]/40">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <SectionHeader
          eyebrow={activeConfig.sections.services.eyebrow}
          title={activeConfig.sections.services.title}
          subtitle={activeConfig.sections.services.subtitle}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {activeConfig.services.map((service) => {
            const Icon = iconMap[service.icon] ?? Dumbbell
            const Card = reduced ? 'article' : motion.article
            const clip = videoStrategy.services[service.id]
            const showVideo = VIDEO_SERVICE_IDS.includes(service.id) && clip

            return (
              <Card
                key={service.id}
                className="glass-card min-w-0 overflow-hidden rounded-2xl"
                {...(reduced
                  ? {}
                  : {
                      whileHover: { y: -4 },
                      transition: { type: 'tween', duration: 0.25 },
                      initial: { opacity: 0, y: 12 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, amount: 0.15 },
                    })}
              >
                {showVideo ? (
                  <div className="relative -mx-px -mt-px aspect-[16/9] overflow-hidden">
                    <BackgroundVideo
                      media={clip}
                      loadMode="viewport"
                      overlayClassName="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/30 to-transparent"
                    />
                    {clip.caption ? (
                      <span className="absolute top-2 left-2 z-10 rounded-full bg-black/55 px-2 py-0.5 text-[10px] tracking-wider text-[var(--color-yellow)] uppercase">
                        {clip.caption}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <div className="p-5 sm:p-6">
                  <div className="mb-4 inline-flex rounded-xl border border-[var(--color-yellow)]/20 bg-[var(--color-yellow)]/10 p-2.5 text-[var(--color-yellow)] sm:mb-5 sm:p-3">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl text-white uppercase sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-gray)] sm:mt-3">
                    {service.description}
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </SectionReveal>
  )
}

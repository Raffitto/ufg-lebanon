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
import { ufgMedia } from '../data/ufgMedia'
import { useReducedMotion } from '../hooks/useReducedMotion'
import ResponsiveImage from './ui/ResponsiveImage'
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

const ambienceByServiceId = {
  'personal-training': 0,
  strength: 0,
  functional: 2,
  cardio: 1,
}

export default function Services() {
  const reduced = useReducedMotion()
  const ambience = ufgMedia.servicesAmbience

  return (
    <SectionReveal id="services" className="section-padding bg-[var(--color-surface)]/40">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <SectionHeader
          eyebrow={activeConfig.sections.services.eyebrow}
          title={activeConfig.sections.services.title}
          subtitle={activeConfig.sections.services.subtitle}
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {activeConfig.services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Dumbbell
            const Card = reduced ? 'article' : motion.article
            const ambienceIndex = ambienceByServiceId[service.id]
            const media =
              ambienceIndex !== undefined ? ambience[ambienceIndex] : ambience[index % ambience.length]
            const showImage = index < 4 && media

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
                {showImage ? (
                  <div className="relative -mx-px -mt-px aspect-[16/9] overflow-hidden">
                    <ResponsiveImage
                      media={media}
                      sizesPreset="card"
                      className="absolute inset-0"
                      overlayClassName="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"
                    />
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

import { MapPin, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { BRANCHES } from '../data/ufgMedia'
import { activeConfig } from '../data/activeConfig'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { whatsappHref } from '../utils/links'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

const branchList = [BRANCHES.mtayleb, BRANCHES.awkar]

export default function Branches() {
  const reduced = useReducedMotion()

  return (
    <SectionReveal id="branches" className="section-padding bg-[var(--color-surface)]/40">
      <div className="mx-auto w-full min-w-0 max-w-7xl">
        <SectionHeader
          eyebrow="Our Locations"
          title="Mtayleb & Awkar"
          subtitle="Two branches. One standard — elite coaching, premium equipment, and a culture built for strength and transformation."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {branchList.map((branch, index) => {
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
                <div className="relative overflow-hidden px-5 pt-5 sm:px-6 sm:pt-6">
                  <div
                    className="relative flex aspect-[16/9] items-end overflow-hidden rounded-xl bg-[linear-gradient(135deg,#1a1600_0%,#121212_50%,#050505_100%)] p-4 sm:p-5"
                  >
                    <div
                      className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,229,0,0.16),transparent_55%)]"
                      aria-hidden="true"
                    />
                    <div className="relative z-10 w-full">
                      <p className="font-display text-3xl text-white uppercase sm:text-4xl">
                        {branch.name}
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-yellow)] sm:text-sm">
                        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {branch.tagline}
                      </p>
                    </div>
                    <span className="absolute top-3 right-3 z-10 rounded-full border border-[var(--color-yellow)]/30 bg-black/50 px-2 py-0.5 text-[10px] tracking-wider text-[var(--color-yellow)] uppercase">
                      Open
                    </span>
                  </div>
                </div>

                <div className="space-y-4 p-5 sm:p-6">
                  <p className="text-sm leading-relaxed text-[var(--color-gray)]">
                    {branch.shortAddress}
                  </p>
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <Button
                      href={`https://www.google.com/maps/search/?api=1&query=${branch.mapsQuery}`}
                      variant="secondary"
                      fullWidth
                      className="sm:flex-1"
                      ariaLabel={`Visit ${branch.name} branch`}
                    >
                      Visit Branch
                    </Button>
                    <Button
                      href={whatsappHref(
                        activeConfig.whatsapp,
                        `Hi, I want to train at the ${branch.name} branch.`,
                      )}
                      icon={MessageCircle}
                      fullWidth
                      className="sm:flex-1"
                      ariaLabel={`Contact ${branch.name} on WhatsApp`}
                    >
                      WhatsApp
                    </Button>
                  </div>
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

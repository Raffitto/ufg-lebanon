import { MapPin } from 'lucide-react'
import { activeConfig } from '../data/activeConfig'
import { launchMedia } from '../data/launchMedia'
import { scrollToId } from '../utils/links'
import Memberships from './Memberships'
import SectionVideo from './ui/SectionVideo'
import Button from './ui/Button'

export default function MtaylebBranch() {
  const { mtaylebBranch } = activeConfig

  return (
    <section id="mtayleb" className="relative">
      <div className="relative min-h-[42svh] sm:min-h-[48svh]">
        <SectionVideo src={launchMedia.mtayleb} loadMode="viewport" className="absolute inset-0" />
        <div className="relative z-10 flex min-h-[42svh] items-end section-padding !pb-10 sm:min-h-[48svh] sm:!pb-14">
          <div className="mx-auto w-full min-w-0 max-w-7xl">
            <p className="font-display text-xs tracking-[0.22em] text-[var(--color-yellow)] uppercase sm:text-sm">
              {mtaylebBranch.eyebrow}
            </p>
            <h2 className="font-display mt-2 text-4xl leading-[0.95] text-white uppercase sm:text-5xl md:text-6xl">
              {mtaylebBranch.title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {mtaylebBranch.intro}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Button
                variant="secondary"
                onClick={() => scrollToId('memberships')}
                ariaLabel="Explore memberships"
              >
                {activeConfig.copy.exploreMembershipsCta}
              </Button>
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${mtaylebBranch.mapsQuery}`}
                variant="ghost"
                icon={MapPin}
                ariaLabel={activeConfig.copy.getDirectionsCta}
              >
                {activeConfig.copy.getDirectionsCta}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Memberships embedded />
    </section>
  )
}

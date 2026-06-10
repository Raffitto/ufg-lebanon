import { MapPin, Navigation } from 'lucide-react'
import { activeConfig } from '../data/activeConfig'
import { launchMedia } from '../data/launchMedia'
import { scrollToId } from '../utils/links'
import SectionVideo from './ui/SectionVideo'
import Button from './ui/Button'
import SectionReveal from './ui/SectionReveal'

export default function AwkarBranch() {
  const { awkarBranch, copy } = activeConfig
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${awkarBranch.mapsQuery}`

  return (
    <SectionReveal id="awkar" className="relative section-padding !pt-0">
      <div className="relative mx-auto min-h-[42svh] w-full min-w-0 max-w-7xl overflow-hidden rounded-2xl border border-white/10 sm:min-h-[48svh] sm:rounded-[var(--radius-xl)]">
        <SectionVideo src={launchMedia.awkar} loadMode="viewport" className="absolute inset-0" />
        <div className="relative z-10 flex min-h-[42svh] flex-col justify-end p-6 sm:min-h-[48svh] sm:p-10">
          <p className="font-display text-xs tracking-[0.22em] text-[var(--color-yellow)] uppercase sm:text-sm">
            {awkarBranch.eyebrow}
          </p>
          <h2 className="font-display mt-2 text-4xl leading-[0.95] text-white uppercase sm:text-5xl md:text-6xl">
            {awkarBranch.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {awkarBranch.intro}
          </p>
          <div className="mt-6 flex w-full min-w-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <Button
              href={mapsUrl}
              icon={Navigation}
              fullWidth
              className="sm:w-auto sm:min-w-[12rem]"
              ariaLabel={copy.getDirectionsCta}
            >
              {copy.getDirectionsCta}
            </Button>
            <Button
              variant="secondary"
              onClick={() => scrollToId('contact')}
              icon={MapPin}
              fullWidth
              className="sm:w-auto sm:min-w-[12rem]"
              ariaLabel={copy.viewLocationCta}
            >
              {copy.viewLocationCta}
            </Button>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}

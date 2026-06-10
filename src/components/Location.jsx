import { Clock, MapPin, Navigation, Phone } from 'lucide-react'
import { BRANCHES } from '../data/ufgMedia'
import { activeConfig } from '../data/activeConfig'
import { phoneHref, scrollToId } from '../utils/links'
import Button from './ui/Button'
import SocialLinks from './ui/SocialLinks'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

const branchList = [BRANCHES.mtayleb, BRANCHES.awkar]

export default function Location() {
  const { location, openingHours, sections, copy } = activeConfig
  const locationSection = sections.location

  return (
    <SectionReveal id="contact" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={locationSection.eyebrow}
          title={locationSection.title}
          subtitle="Visit Mtayleb or Awkar — find directions, hours, and branch details below."
          align="left"
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {branchList.map((branch) => (
            <article
              key={branch.id}
              className="glass-card overflow-hidden rounded-2xl sm:rounded-[var(--radius-xl)]"
            >
              <div className="relative overflow-hidden p-5 sm:p-6">
                <div className="relative flex min-h-[8rem] items-end overflow-hidden rounded-xl bg-[linear-gradient(135deg,#1a1600_0%,#121212_55%,#050505_100%)] p-4 sm:min-h-[9rem] sm:p-5">
                  <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,229,0,0.14),transparent_50%)]"
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <p className="font-display text-2xl text-white uppercase sm:text-3xl">
                      {branch.name}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--color-yellow)] sm:text-sm">
                      <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      {branch.shortAddress}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2.5 px-5 pb-5 sm:px-6 sm:pb-6">
                <Button
                  href={`https://www.google.com/maps/search/?api=1&query=${branch.mapsQuery}`}
                  icon={Navigation}
                  fullWidth
                  ariaLabel={`${copy.getDirectionsCta} — ${branch.name}`}
                >
                  {copy.getDirectionsCta}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => scrollToId(branch.id)}
                  fullWidth
                  ariaLabel={`${copy.exploreBranchCta} — ${branch.name}`}
                >
                  {copy.exploreBranchCta}
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="glass-card rounded-2xl p-5 sm:rounded-[var(--radius-xl)] sm:p-6">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-yellow)]" aria-hidden="true" />
                <div>
                  <p className="font-display text-lg text-white uppercase sm:text-xl">
                    {locationSection.locationCardTitle}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-gray)] sm:text-base">
                    {location.address}
                  </p>
                  <p className="mt-2 text-xs text-white/55 sm:text-sm">
                    Also visit our {BRANCHES.awkar.name} branch — {BRANCHES.awkar.shortAddress}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-5 sm:rounded-[var(--radius-xl)] sm:p-6">
              <div className="mb-3 flex items-center gap-2 sm:mb-4">
                <Clock className="h-5 w-5 text-[var(--color-yellow)]" aria-hidden="true" />
                <p className="font-display text-lg text-white uppercase sm:text-xl">
                  {locationSection.hoursCardTitle}
                </p>
              </div>
              <ul className="space-y-2.5 sm:space-y-3">
                {openingHours.map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between gap-3 border-b border-white/5 pb-2.5 text-sm last:border-0 last:pb-0"
                  >
                    <span className="text-white/80">{row.day}</span>
                    <span
                      className={
                        row.hours === 'Closed'
                          ? 'text-white/45'
                          : 'font-semibold text-[var(--color-yellow)]'
                      }
                    >
                      {row.hours}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              href={phoneHref(activeConfig.phone)}
              icon={Phone}
              fullWidth
              ariaLabel="Call gym"
            >
              {copy.callCta}
            </Button>

            <div className="glass-card flex items-center justify-between gap-4 rounded-2xl p-4 sm:rounded-[var(--radius-xl)] sm:p-5">
              <div>
                <p className="font-display text-sm tracking-[0.18em] text-white uppercase sm:text-base">
                  {locationSection.followTitle}
                </p>
                <p className="mt-1 text-xs text-[var(--color-gray)] sm:text-sm">
                  @{activeConfig.social.instagramHandle} · {locationSection.followHint}
                </p>
              </div>
              <SocialLinks size="md" />
            </div>
          </div>

          <div className="glass-card flex min-h-[240px] flex-col items-center justify-center gap-4 rounded-2xl p-6 text-center sm:min-h-[320px] sm:rounded-[var(--radius-xl)] sm:gap-5 sm:p-8 lg:min-h-[360px]">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-yellow)]/25 bg-[var(--color-yellow)]/10"
              aria-hidden="true"
            >
              <MapPin className="h-8 w-8 text-[var(--color-yellow)]" />
            </div>
            <p className="font-display text-2xl text-white uppercase sm:text-3xl">
              {copy.viewLocationCta}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--color-gray)]">
              Two branches across Lebanon. Get directions or explore each location.
            </p>
            <div className="flex w-full max-w-xs flex-col gap-2.5">
              <Button
                href={location.googleMapsUrl}
                icon={Navigation}
                fullWidth
                ariaLabel={copy.getDirectionsCta}
              >
                {copy.getDirectionsCta}
              </Button>
              <Button
                variant="secondary"
                onClick={() => scrollToId('mtayleb')}
                fullWidth
                ariaLabel={copy.exploreBranchCta}
              >
                {copy.exploreBranchCta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}

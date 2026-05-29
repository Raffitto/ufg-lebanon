import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { activeConfig } from '../data/activeConfig'
import { BRANCHES, ufgMedia } from '../data/ufgMedia'
import { phoneHref, whatsappHref } from '../utils/links'
import Button from './ui/Button'
import ResponsiveImage from './ui/ResponsiveImage'
import SocialLinks from './ui/SocialLinks'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

const branchLocations = [
  { branch: BRANCHES.mtayleb, media: ufgMedia.locationMtayleb, primary: true },
  { branch: BRANCHES.awkar, media: ufgMedia.locationAwkar, primary: false },
]

export default function Location() {
  const { location, openingHours, opensAt, sections, copy } = activeConfig
  const locationSection = sections.location

  return (
    <SectionReveal id="location" className="section-padding bg-[var(--color-surface)]/50">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={locationSection.eyebrow}
          title={locationSection.title}
          subtitle="Mtayleb & Awkar — train at the branch that fits your routine."
          align="left"
        />

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {branchLocations.map(({ branch, media, primary }) => (
            <article
              key={branch.id}
              className="glass-card overflow-hidden rounded-2xl sm:rounded-[var(--radius-xl)]"
            >
              <div className="relative aspect-[16/10]">
                <ResponsiveImage
                  media={media}
                  sizesPreset="section"
                  className="absolute inset-0"
                  overlayClassName="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="font-display text-xl text-white uppercase sm:text-2xl">
                    {branch.name}
                    {primary ? (
                      <span className="ml-2 text-xs tracking-wide text-[var(--color-yellow)] normal-case">
                        · Main
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">{branch.shortAddress}</p>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <Button
                  href={`https://www.google.com/maps/search/?api=1&query=${branch.mapsQuery}`}
                  variant="secondary"
                  fullWidth
                  ariaLabel={`Open ${branch.name} in Google Maps`}
                >
                  {copy.openMapsCta}
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
                  <p className="mt-1 text-xs text-white/60 sm:text-sm">
                    {locationSection.opensFromLabel} {opensAt}
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
                    <span className="text-[var(--color-gray)]">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2.5">
              <Button
                href={phoneHref(activeConfig.phone)}
                icon={Phone}
                fullWidth
                ariaLabel="Call gym"
              >
                {copy.callCta}
              </Button>
              <Button
                href={whatsappHref(activeConfig.whatsapp, activeConfig.whatsappMessage)}
                variant="secondary"
                icon={MessageCircle}
                fullWidth
                ariaLabel={copy.whatsappCta}
              >
                {copy.whatsappCta}
              </Button>
            </div>

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

          <div className="glass-card overflow-hidden rounded-2xl sm:rounded-[var(--radius-xl)]">
            {location.embedUrl ? (
              <iframe
                title={`${activeConfig.brandName} map`}
                src={location.embedUrl}
                className="aspect-[4/5] min-h-[240px] w-full border-0 sm:aspect-auto sm:min-h-[320px] lg:min-h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="relative min-h-[240px] sm:min-h-[320px] lg:min-h-[360px]">
                <ResponsiveImage
                  media={ufgMedia.locationMtayleb}
                  sizesPreset="section"
                  className="absolute inset-0"
                  overlayClassName="absolute inset-0 bg-black/55"
                />
                <div className="relative flex h-full min-h-[240px] flex-col items-center justify-center gap-3 p-6 text-center sm:min-h-[320px] sm:gap-4 sm:p-8">
                  <MapPin className="h-9 w-9 text-[var(--color-yellow)] sm:h-10 sm:w-10" aria-hidden="true" />
                  <p className="font-display text-xl text-white uppercase sm:text-2xl">
                    {location.shortAddress}
                  </p>
                  <Button
                    href={location.googleMapsUrl}
                    fullWidth
                    className="max-w-xs"
                    ariaLabel={copy.openMapsCta}
                  >
                    {copy.openMapsCta}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}

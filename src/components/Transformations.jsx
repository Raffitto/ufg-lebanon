import { ArrowRight } from 'lucide-react'
import { activeConfig } from '../data/activeConfig'
import { ufgMedia } from '../data/ufgMedia'
import { whatsappHref } from '../utils/links'
import BackgroundVideo from './ui/BackgroundVideo'
import Button from './ui/Button'
import ResponsiveImage from './ui/ResponsiveImage'
import SectionHeader from './ui/SectionHeader'
import SectionReveal from './ui/SectionReveal'

export default function Transformations() {
  const { transformations } = activeConfig
  const mediaItems = ufgMedia.transformations

  return (
    <SectionReveal id="results" className="section-padding bg-[var(--color-surface)]/50">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={activeConfig.sections.transformations.eyebrow}
          title={transformations.headline}
          subtitle={transformations.subheadline}
        />

        <div className="flex flex-col gap-3 sm:gap-4 md:grid md:grid-cols-3 md:gap-5">
          {transformations.items.map((item, index) => {
            const media = mediaItems[index]
            const isVideo = media?.type === 'video'

            return (
              <article
                key={item.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10"
              >
                <div className="relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
                  {isVideo ? (
                    <BackgroundVideo
                      media={media}
                      loadMode="viewport"
                      overlayClassName="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20"
                    />
                  ) : media ? (
                    <ResponsiveImage
                      media={media}
                      sizesPreset="card"
                      className="absolute inset-0"
                      overlayClassName="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15"
                    />
                  ) : (
                    <div className="ufg-media-fallback absolute inset-0" />
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 sm:p-5">
                  <p className="font-display text-xl text-white uppercase sm:text-2xl">{item.label}</p>
                  <p className="mt-1 text-xs text-[var(--color-gray)] sm:text-sm">{item.caption}</p>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center sm:mt-10">
          <Button
            href={whatsappHref(
              activeConfig.whatsapp,
              'Hi, I want to book a transformation consultation.',
            )}
            icon={ArrowRight}
            fullWidth
            className="max-w-md sm:w-auto"
            ariaLabel={transformations.cta}
          >
            {transformations.cta}
          </Button>
        </div>
      </div>
    </SectionReveal>
  )
}

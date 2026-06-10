import { activeConfig } from '../../data/activeConfig'

export default function Logo({
  className = 'inline-flex shrink-0 items-center gap-2',
}) {
  return (
    <a href="#hero" className={className} aria-label={activeConfig.brandName}>
      <span
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-yellow)]/40 bg-[var(--color-yellow)] font-display text-sm font-bold tracking-wide text-black sm:h-9 sm:w-9 sm:text-base"
        aria-hidden="true"
      >
        {activeConfig.shortName}
      </span>
      <span className="hidden min-w-0 flex-col leading-none sm:flex">
        <span className="font-display text-sm tracking-[0.12em] text-white uppercase sm:text-base">
          Ultimate Fitness
        </span>
        <span className="text-[10px] tracking-[0.2em] text-[var(--color-yellow)] uppercase">
          Gym Lebanon
        </span>
      </span>
    </a>
  )
}

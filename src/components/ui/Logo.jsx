import { activeConfig } from '../../data/activeConfig'

const LOGO_SRC = '/ufg-logo-clean.png'
const LOGO_ALT = 'Ultimate Fitness Gym logo'

export default function Logo({
  imageClassName = 'h-8 w-8 sm:h-9 sm:w-9',
  badgeClassName = '',
}) {
  const src = activeConfig.logo || LOGO_SRC

  return (
    <a href="#hero" className="inline-flex shrink-0 items-center" aria-label={activeConfig.brandName}>
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full bg-white p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.1)] ${badgeClassName}`}
      >
        <img
          src={src}
          alt={LOGO_ALT}
          className={`rounded-full object-cover ${imageClassName}`}
          decoding="async"
        />
      </span>
    </a>
  )
}

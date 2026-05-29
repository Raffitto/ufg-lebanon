import { useCallback, useState } from 'react'

const SIZES_ATTR = {
  hero: '100vw',
  card: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  gallery: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  section: '(max-width: 768px) 100vw, 50vw',
  full: '100vw',
}

/**
 * Responsive picture with WebP/AVIF, lazy load, blur-up, and gradient fallback.
 */
export default function ResponsiveImage({
  media,
  sizesPreset = 'gallery',
  sizes: sizesOverride,
  className = '',
  imgClassName = 'h-full w-full object-cover object-center',
  overlayClassName = '',
  showBlur = true,
  fetchPriority,
}) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const onLoad = useCallback(() => setLoaded(true), [])
  const onError = useCallback(() => setFailed(true), [])

  if (!media?.desktop) {
    return (
      <div
        className={`ufg-media-fallback ${className}`}
        role="img"
        aria-label={media?.alt ?? 'Gym atmosphere'}
      />
    )
  }

  const sizes = sizesOverride ?? SIZES_ATTR[sizesPreset] ?? SIZES_ATTR.gallery
  const priority = media.priority ?? fetchPriority === 'high'
  const loading = priority ? 'eager' : 'lazy'
  const decoding = priority ? 'sync' : 'async'

  if (failed) {
    return (
      <div
        className={`ufg-media-fallback ${className}`}
        role="img"
        aria-label={media.alt}
      />
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {showBlur && media.blur ? (
        <img
          src={media.blur}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full scale-110 object-cover blur-xl transition-opacity duration-500 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : null}
      <picture>
        {media.srcSetAvif ? (
          <source type="image/avif" srcSet={media.srcSetAvif} sizes={sizes} />
        ) : null}
        {media.srcSet ? (
          <source type="image/webp" srcSet={media.srcSet} sizes={sizes} />
        ) : null}
        <img
          src={media.mobile ?? media.desktop}
          srcSet={media.srcSet}
          sizes={sizes}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading={loading}
          decoding={decoding}
          fetchPriority={priority ? 'high' : undefined}
          onLoad={onLoad}
          onError={onError}
          className={`${imgClassName} transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </picture>
      {overlayClassName ? <div className={overlayClassName} aria-hidden="true" /> : null}
    </div>
  )
}

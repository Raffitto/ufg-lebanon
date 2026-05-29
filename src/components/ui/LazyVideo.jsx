import { useEffect, useRef, useState } from 'react'

/**
 * Loads and plays video only when near viewport (muted, inline).
 */
export default function LazyVideo({
  media,
  className = 'h-full w-full object-cover',
  playWhenVisible = true,
  autoPlay = true,
}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [active, setActive] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el || !playWhenVisible) {
      setActive(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '120px 0px', threshold: 0.12 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [playWhenVisible])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active || !autoPlay) return undefined

    const play = () => {
      video.play().catch(() => {})
    }

    if (video.readyState >= 2) play()
    else video.addEventListener('loadeddata', play, { once: true })

    return () => video.removeEventListener('loadeddata', play)
  }, [active, autoPlay])

  if (!media?.mobileMp4 || failed) {
    return (
      <div
        ref={containerRef}
        className={`ufg-media-fallback ${className}`}
        role="img"
        aria-label={media?.alt ?? 'Gym video'}
      />
    )
  }

  const useDesktop =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(min-width: 1024px)')?.matches
  const mp4 = useDesktop ? media.desktopMp4 : media.mobileMp4

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {!active && media.poster ? (
        <img
          src={media.poster}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : null}
      {active ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={media.poster}
          muted
          playsInline
          loop={media.loop !== false}
          preload="metadata"
          width={media.width}
          height={media.height}
          aria-label={media.alt}
          onError={() => setFailed(true)}
        >
          {media.mobileWebm ? <source src={media.mobileWebm} type="video/webm" /> : null}
          <source src={mp4} type="video/mp4" />
        </video>
      ) : null}
    </div>
  )
}

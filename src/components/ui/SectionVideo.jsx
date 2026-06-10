import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const CINEMATIC_OVERLAY =
  'absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.72)_45%,rgba(5,5,5,0.88)_100%),radial-gradient(circle_at_18%_12%,rgba(255,229,0,0.1),transparent_42%)]'

/**
 * Cinematic section video — muted, loop, no controls, no audio.
 * immediate: autoplay on load (hero)
 * viewport: load + play when section enters viewport
 */
export default function SectionVideo({
  src,
  className = 'absolute inset-0',
  overlayClassName = CINEMATIC_OVERLAY,
  loadMode = 'viewport',
  priority = false,
}) {
  const reduced = useReducedMotion()
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [active, setActive] = useState(loadMode === 'immediate')

  useEffect(() => {
    if (loadMode !== 'viewport' || reduced) return undefined
    const el = containerRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { rootMargin: '100px 0px', threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMode, reduced])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active || reduced) return undefined

    video.muted = true
    video.defaultMuted = true
    video.volume = 0

    const play = () => {
      video.play().catch(() => {})
    }
    if (video.readyState >= 2) play()
    else video.addEventListener('canplay', play, { once: true })
    return () => video.removeEventListener('canplay', play)
  }, [active, reduced])

  if (reduced) {
    return (
      <div
        ref={containerRef}
        className={`ufg-media-fallback ${className}`}
        aria-hidden="true"
      >
        {overlayClassName ? <div className={overlayClassName} aria-hidden="true" /> : null}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {active ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover object-center"
          src={src}
          muted
          defaultMuted
          playsInline
          autoPlay
          loop
          preload={priority ? 'auto' : 'metadata'}
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          aria-hidden="true"
          onVolumeChange={(e) => {
            e.currentTarget.muted = true
            e.currentTarget.volume = 0
          }}
        />
      ) : (
        <div className="ufg-media-fallback absolute inset-0" aria-hidden="true" />
      )}
      {overlayClassName ? <div className={overlayClassName} aria-hidden="true" /> : null}
    </div>
  )
}

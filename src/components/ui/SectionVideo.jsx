import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const CINEMATIC_OVERLAY =
  'absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.72)_45%,rgba(5,5,5,0.88)_100%),radial-gradient(circle_at_18%_12%,rgba(255,229,0,0.1),transparent_42%)]'

function VideoLayer({ src, priority }) {
  const videoRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const syncMuted = () => {
      video.muted = true
      video.defaultMuted = true
      video.volume = 0
    }

    const tryPlay = () => {
      syncMuted()
      video.play().catch(() => {})
    }

    const onLoaded = () => {
      setVisible(true)
      tryPlay()
    }

    syncMuted()
    tryPlay()

    video.addEventListener('loadeddata', onLoaded)
    video.addEventListener('canplay', tryPlay)

    const onVisibility = () => {
      if (document.visibilityState === 'visible') tryPlay()
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      video.removeEventListener('loadeddata', onLoaded)
      video.removeEventListener('canplay', tryPlay)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
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
  )
}

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
      <div className="ufg-media-fallback absolute inset-0" aria-hidden="true" />
      {active ? <VideoLayer key={src} src={src} priority={priority} /> : null}
      {overlayClassName ? <div className={overlayClassName} aria-hidden="true" /> : null}
    </div>
  )
}

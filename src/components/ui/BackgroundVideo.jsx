import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useVideoSource } from '../../hooks/useVideoSource'

/**
 * Cinematic background video — muted, no controls, no sound.
 * immediate: hero (autoplay on load)
 * viewport: branch/services/CTA (load + play when near viewport)
 */
export default function BackgroundVideo({
  media,
  className = 'absolute inset-0',
  imgClassName = 'h-full w-full object-cover object-center',
  overlayClassName = 'absolute inset-0 bg-black/55',
  loadMode = 'viewport',
  priority = false,
}) {
  const reduced = useReducedMotion()
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [active, setActive] = useState(loadMode === 'immediate')
  const [failed, setFailed] = useState(false)
  const mp4 = useVideoSource(active ? media : null)

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
      { rootMargin: '80px 0px', threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMode, reduced])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !active || reduced || !mp4 || failed) return undefined

    video.muted = true
    video.defaultMuted = true
    video.volume = 0

    const play = () => {
      video.play().catch(() => {})
    }
    if (video.readyState >= 2) play()
    else video.addEventListener('canplay', play, { once: true })
    return () => video.removeEventListener('canplay', play)
  }, [active, reduced, mp4, failed])

  if (!media?.poster && !media?.mobileMp4) {
    return <div ref={containerRef} className={`ufg-media-fallback ${className}`} aria-hidden="true" />
  }

  if (failed || reduced) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        <img
          src={media.poster}
          alt=""
          aria-hidden="true"
          className={imgClassName}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
        {overlayClassName ? <div className={overlayClassName} aria-hidden="true" /> : null}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img
        src={media.poster}
        alt=""
        aria-hidden="true"
        className={`${imgClassName} transition-opacity duration-700 ${
          active && mp4 ? 'opacity-0' : 'opacity-100'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
      />
      {active && mp4 ? (
        <video
          ref={videoRef}
          className={`${imgClassName} absolute inset-0 transition-opacity duration-700 opacity-100`}
          src={mp4}
          poster={media.poster}
          muted
          defaultMuted
          playsInline
          autoPlay
          loop={media.loop !== false}
          preload={priority ? 'auto' : 'metadata'}
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          width={media.width}
          height={media.height}
          aria-hidden="true"
          onVolumeChange={(e) => {
            e.currentTarget.muted = true
            e.currentTarget.volume = 0
          }}
          onError={() => setFailed(true)}
        />
      ) : null}
      {overlayClassName ? <div className={overlayClassName} aria-hidden="true" /> : null}
    </div>
  )
}

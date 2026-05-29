import { useCallback, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { useVideoSource } from '../../hooks/useVideoSource'

/**
 * Gallery video — poster until tap; muted play on demand; no autoplay.
 */
export default function GalleryVideo({ media, className = 'absolute inset-0' }) {
  const videoRef = useRef(null)
  const [armed, setArmed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const mp4 = useVideoSource(armed ? media : null)

  const toggle = useCallback(() => {
    if (failed) return
    if (!armed) {
      setArmed(true)
      setPlaying(true)
      return
    }
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }, [armed, failed])

  const onCanPlay = useCallback(() => {
    const video = videoRef.current
    if (!video || !playing) return
    video.muted = true
    video.volume = 0
    video.play().catch(() => {})
  }, [playing])

  if (!media?.poster || failed) {
    return (
      <div className={`ufg-media-fallback ${className}`} role="img" aria-label={media?.alt} />
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={media.poster}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          playing ? 'opacity-0' : 'opacity-100'
        }`}
        loading="lazy"
        decoding="async"
      />
      {armed && mp4 ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            playing ? 'opacity-100' : 'opacity-0'
          }`}
          src={mp4}
          poster={media.poster}
          muted
          defaultMuted
          playsInline
          loop
          preload="none"
          disablePictureInPicture
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          width={media.width}
          height={media.height}
          aria-label={media.alt}
          onCanPlay={onCanPlay}
          onEnded={() => setPlaying(false)}
          onVolumeChange={(e) => {
            e.currentTarget.muted = true
            e.currentTarget.volume = 0
          }}
          onError={() => setFailed(true)}
        />
      ) : null}

      <button
        type="button"
        onClick={toggle}
        className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 transition hover:bg-black/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-yellow)]"
        aria-label={playing ? `Pause ${media.alt}` : `Play ${media.alt}`}
      >
        <span
          className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition ${
            playing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
          }`}
          aria-hidden="true"
        >
          <Play className="ml-1 h-6 w-6 fill-white text-white" />
        </span>
      </button>
    </div>
  )
}

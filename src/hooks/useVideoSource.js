import { useEffect, useState } from 'react'

/** Pick mobile vs desktop MP4 based on viewport (updates on resize). */
export function useVideoSource(media) {
  const [mp4, setMp4] = useState(media?.mobileMp4 ?? '')

  useEffect(() => {
    if (!media?.mobileMp4) return undefined

    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => {
      setMp4(mq.matches && media.desktopMp4 ? media.desktopMp4 : media.mobileMp4)
    }
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [media])

  return mp4
}

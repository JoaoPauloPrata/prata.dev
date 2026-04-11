import { useEffect } from 'react'

export default function AuroraBackground() {
  useEffect(() => {
    let rafId
    let targetX = 0, targetY = 0
    let currentX = 0, currentY = 0
    const root = document.documentElement

    const onMouseMove = (e) => {
      // Normalize to -1 … 1
      targetX = (e.clientX / window.innerWidth  - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const tick = () => {
      // Very slow lerp for a dreamy trailing feel
      currentX += (targetX - currentX) * 0.025
      currentY += (targetY - currentY) * 0.025
      root.style.setProperty('--aurora-mx', currentX.toFixed(4))
      root.style.setProperty('--aurora-my', currentY.toFixed(4))
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      <div className="aurora-blob aurora-blob-5" />
      <div className="aurora-blob aurora-blob-6" />
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion'

export function useCountUp(target: number, active = true, duration = 1500) {
  const [value, setValue] = useState(0)
  const current = useRef(0)

  useEffect(() => {
    if (!active) return
    if (prefersReducedMotion()) {
      current.current = target
      setValue(target)
      return
    }
    const from = current.current
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = Math.round(from + (target - from) * eased)
      current.current = next
      setValue(next)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, duration])

  return value
}

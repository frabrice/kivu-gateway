import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { IMG } from '../../data/images'
import { prefersReducedMotion } from '../../lib/motion'

const SLIDE_MS = 7000

const SLIDES = [
  { src: IMG.gomaVolcano, position: 'center 42%' },
  { src: IMG.lakesideResort, position: 'center 58%' },
  { src: IMG.lakeAerialPortrait, position: 'center 62%' },
  { src: IMG.lakesideMarket, position: 'center 55%' },
]

export default function Hero() {
  const reduced = useRef(prefersReducedMotion())
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)

  useEffect(() => {
    if (reduced.current) return
    const id = window.setTimeout(() => {
      setPrevious(active)
      setActive((active + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => window.clearTimeout(id)
  }, [active])

  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-navy-800">
      <div aria-hidden className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={s.src}
              alt=""
              style={{ objectPosition: s.position }}
              className={`h-full w-full object-cover ${i === active || i === previous ? 'animate-kenburns-slow' : ''}`}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* A light shade behind the text only, so the photography stays bright */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900/75 via-navy-900/25 to-transparent" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/10 to-transparent sm:hidden" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-900/45 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <h1
          className="max-w-3xl animate-fade-up font-heading text-5xl font-bold leading-[1.04] tracking-tight text-white [text-shadow:0_2px_30px_rgba(7,22,39,0.5)] sm:text-6xl xl:text-[5.5rem]"
          style={{ animationDelay: '150ms' }}
        >
          Your gateway to
          <span className="block font-display text-[1.1em] font-normal italic tracking-normal">Goma &amp; Gisenyi.</span>
        </h1>

        <p
          className="mt-6 max-w-md animate-fade-up text-lg leading-relaxed text-white/95 [text-shadow:0_1px_18px_rgba(7,22,39,0.6)]"
          style={{ animationDelay: '350ms' }}
        >
          Business, travel, markets and opportunity across Lake Kivu — in one place.
        </p>

        <div className="mt-9 flex animate-fade-up flex-wrap items-center gap-x-8 gap-y-4" style={{ animationDelay: '550ms' }}>
          <Link
            to="/enter-the-market"
            className="group inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-sm font-bold text-white shadow-[0_10px_40px_-12px_rgba(47,111,237,0.9)] transition hover:bg-blue-400"
          >
            Enter the Market
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
          >
            Explore the region
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

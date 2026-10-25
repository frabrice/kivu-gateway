import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import WhatsAppButton from '../layout/WhatsAppButton'
import { IMG } from '../../data/images'
import { useData } from '../../data/store'
import { useCountUp } from '../../hooks/useCountUp'
import { prefersReducedMotion } from '../../lib/motion'

const SLIDE_MS = 6500

const SLIDES = [
  { src: IMG.gomaVolcano, caption: 'Goma', sub: 'Rooftops beneath the volcano', position: 'center 42%' },
  { src: IMG.lakesideResort, caption: 'Lake Kivu', sub: 'The waterfront both cities share', position: 'center 58%' },
  { src: IMG.lakeAerialPortrait, caption: 'Two shores', sub: 'One lake, one market', position: 'center 62%' },
  { src: IMG.lakesideMarket, caption: 'The market', sub: 'Where the region trades', position: 'center 55%' },
]

const WORDS = ['Explore', 'Invest in', 'Source from', 'Do business in', 'Connect with']

function useClock() {
  const read = () =>
    new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Kigali' })
  const [time, setTime] = useState(read)
  useEffect(() => {
    const id = window.setInterval(() => setTime(read()), 15000)
    return () => window.clearInterval(id)
  }, [])
  return time
}

function Stat({ value, label, active }: { value: number; label: string; active: boolean }) {
  const shown = useCountUp(value, active)
  return (
    <div className="px-5 py-4 sm:px-7">
      <div className="font-heading text-3xl font-bold tabular-nums text-white sm:text-4xl">{shown}</div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-blue-200/90">{label}</div>
    </div>
  )
}

export default function Hero() {
  const { businesses, events, opportunities, loading } = useData()
  const heroRef = useRef<HTMLElement>(null)
  const frame = useRef(0)
  const reduced = useRef(prefersReducedMotion())
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [word, setWord] = useState(0)
  const time = useClock()


  function goTo(next: number) {
    setPrevious(active)
    setActive(next)
  }

  useEffect(() => {
    if (reduced.current) return
    const id = window.setTimeout(() => {
      setPrevious(active)
      setActive((active + 1) % SLIDES.length)
    }, SLIDE_MS)
    return () => window.clearTimeout(id)
  }, [active])

  useEffect(() => {
    if (reduced.current) return
    const id = window.setInterval(() => setWord((w) => (w + 1) % WORDS.length), 2800)
    return () => window.clearInterval(id)
  }, [])

  function handleMove(e: MouseEvent<HTMLElement>) {
    const el = heroRef.current
    if (!el || reduced.current) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty('--px', String((x - 0.5) * 2))
      el.style.setProperty('--py', String((y - 0.5) * 2))
      el.style.setProperty('--sx', `${x * 100}%`)
      el.style.setProperty('--sy', `${y * 100}%`)
    })
  }

  const slide = SLIDES[active]

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-900"
    >
      {/* Photography: crossfading slides with a slow drift, nudged by the pointer */}
      <div
        aria-hidden
        className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: 'translate3d(calc(var(--px, 0) * -14px), calc(var(--py, 0) * -9px), 0) scale(1.05)' }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-in-out ${i === active ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={s.src}
              alt=""
              style={{ objectPosition: s.position }}
              className={`h-full w-full object-cover ${i === active || i === previous ? 'animate-kenburns' : ''}`}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Legibility + atmosphere */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-900/85 via-navy-900/40 to-navy-900/5" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-transparent to-navy-900/55" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background:
            'radial-gradient(620px circle at var(--sx, 72%) var(--sy, 30%), rgba(90, 138, 240, 0.24), transparent 62%)',
        }}
      />

      {/* Headline block */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-32 sm:px-6 lg:px-8">
        <div className="my-auto max-w-3xl py-10">
          <span
            className="inline-flex animate-fade-up items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-md"
            style={{ animationDelay: '150ms' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-400" />
            </span>
            Kivu Gateway · Gisenyi ⇄ Goma
          </span>

          <h1
            className="mt-6 animate-fade-up font-heading text-[2.7rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl xl:text-[5rem]"
            style={{ animationDelay: '300ms' }}
          >
            <span className="sr-only">Explore, invest in, source from and connect with Goma and Gisenyi</span>
            <span aria-hidden className="relative block">
              <span className="inline-grid">
                {WORDS.map((w, i) => (
                  <span
                    key={w}
                    className={`col-start-1 row-start-1 transition-all duration-700 ease-out ${
                      i === word ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-5 opacity-0 blur-sm'
                    }`}
                  >
                    {w}
                  </span>
                ))}
              </span>
            </span>
            <span
              aria-hidden
              className="block bg-gradient-to-r from-blue-300 via-white to-blue-400 bg-clip-text pb-2 font-display text-[1.12em] font-normal italic tracking-normal text-transparent"
            >
              Goma &amp; Gisenyi.
            </span>
          </h1>

          <p
            className="mt-5 max-w-xl animate-fade-up text-base leading-relaxed text-navy-100 sm:text-lg"
            style={{ animationDelay: '480ms' }}
          >
            One platform for the two cities on Lake Kivu — businesses, markets, investors, events and opportunities, all
            within reach.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-4" style={{ animationDelay: '640ms' }}>
            <Link
              to="/enter-the-market"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-blue-500 px-8 py-4 text-sm font-bold text-white shadow-[0_10px_40px_-10px_rgba(47,111,237,0.9)] transition hover:bg-blue-400"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/4 animate-sheen bg-white/25 blur-md"
              />
              <span className="relative">Enter the Market</span>
              <ArrowRight size={16} className="relative transition-transform group-hover:translate-x-1" />
            </Link>
            <WhatsAppButton className="!rounded-full !px-7 !py-4 backdrop-blur-md" />
          </div>
        </div>

        {/* The corridor: a floating glass card */}
        <div
          className="absolute right-8 top-1/2 hidden w-[19rem] -translate-y-[44%] animate-fade-up xl:block"
          style={{ animationDelay: '900ms' }}
        >
          <div className="animate-float rounded-3xl border border-white/20 bg-navy-900/60 p-5 shadow-2xl backdrop-blur-xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-200">The corridor</p>
            <svg viewBox="0 0 280 84" fill="none" className="mt-2 w-full" aria-hidden>
              <path
                d="M24 62 C 90 4, 190 4, 256 62"
                stroke="rgba(255,255,255,0.8)"
                strokeWidth="2"
                strokeDasharray="4 6"
                className="animate-dash"
              />
              <circle cx="24" cy="62" r="5" fill="#8FB0F5" />
              <circle cx="256" cy="62" r="5" fill="#8FB0F5" />
              <circle cx="24" cy="62" r="5" stroke="#8FB0F5" strokeWidth="1.5">
                <animate attributeName="r" values="5;15" dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="256" cy="62" r="5" stroke="#8FB0F5" strokeWidth="1.5">
                <animate attributeName="r" values="5;15" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
              </circle>
              <circle r="4.5" fill="#fff">
                <animateMotion
                  dur="5s"
                  repeatCount="indefinite"
                  path="M24 62 C 90 4, 190 4, 256 62"
                  keyPoints="0;1;0"
                  keyTimes="0;0.5;1"
                  calcMode="linear"
                />
              </circle>
            </svg>
            <div className="flex items-end justify-between text-white">
              <div>
                <p className="font-display text-3xl italic leading-none">Gisenyi</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-white/65">Rwanda</p>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl italic leading-none">Goma</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-white/65">DR Congo</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-xs text-white/75">
              <span>Local time</span>
              <span className="font-heading text-sm font-semibold tabular-nums text-white">{time} CAT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom rail: slide caption, scroll cue, live numbers */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-200">
              {String(active + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
            </p>
            <div key={active} className="mt-1 animate-fade-in">
              <p className="font-display text-3xl italic leading-tight text-white">{slide.caption}</p>
              <p className="text-xs text-white/70">{slide.sub}</p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show photo ${i + 1} of ${SLIDES.length}: ${s.caption}`}
                  className="flex h-4 w-12 items-center"
                >
                  <span className="block h-[3px] w-full overflow-hidden rounded-full bg-white/25">
                    <span
                      key={i === active ? `on-${active}` : `off-${i}`}
                      className={`block h-full rounded-full bg-white ${
                        i === active ? 'animate-progress' : i < active ? 'w-full' : 'w-0'
                      }`}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <a href="#after-hero" className="hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70 transition hover:text-white sm:flex">
            Scroll
            <span className="flex h-10 w-6 justify-center rounded-full border border-white/40 pt-2">
              <span className="h-1.5 w-1 animate-scroll-dot rounded-full bg-white" />
            </span>
          </a>
        </div>

        <div className="grid grid-cols-2 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/15 bg-navy-900/45 backdrop-blur-xl md:grid-cols-4">
          <Stat value={2} label="Cities, one corridor" active />
          <Stat value={businesses.length} label="Businesses listed" active={!loading} />
          <Stat value={events.length} label="Events listed" active={!loading} />
          <Stat value={opportunities.length} label="Jobs & tenders posted" active={!loading} />
        </div>
      </div>
    </section>
  )
}

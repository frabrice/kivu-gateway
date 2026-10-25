import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Compass, HeartHandshake, Newspaper, Rocket, Store, TrendingUp, type LucideIcon } from 'lucide-react'
import Reveal from '../shared/Reveal'
import { PILLARS } from '../../data/site'

const ICONS: Record<string, LucideIcon> = {
  explore: Compass,
  'do-business': Store,
  'enter-market': Rocket,
  'invest-source': TrendingUp,
  connect: HeartHandshake,
  insights: Newspaper,
}

export default function PillarShowcase() {
  const [active, setActive] = useState(0)

  return (
    <>
      {/* Large screens: panels that open as you move across them */}
      <div className="hidden h-[34rem] gap-3 lg:flex">
        {PILLARS.map((pillar, i) => {
          const Icon = ICONS[pillar.id]
          const open = i === active
          return (
            <Link
              key={pillar.id}
              to={pillar.to}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className={`group relative min-w-0 overflow-hidden rounded-3xl bg-navy-800 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,0.8,0.2,1)] ${
                open ? 'flex-[6]' : 'flex-[1]'
              }`}
            >
              <img
                src={pillar.image}
                alt=""
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1400ms] ease-out ${
                  open ? 'scale-105 saturate-100' : 'scale-125 saturate-50'
                }`}
              />
              <div
                className={`absolute inset-0 transition-opacity duration-700 ${
                  open ? 'bg-gradient-to-t from-navy-900/95 via-navy-900/30 to-navy-900/10' : 'bg-navy-900/55'
                }`}
              />

              <span className="absolute left-5 top-4 font-display text-3xl italic text-white/85">
                {String(i + 1).padStart(2, '0')}
              </span>

              <span
                className={`absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-base font-semibold tracking-wide text-white transition-opacity duration-500 [writing-mode:vertical-rl] rotate-180 ${
                  open ? 'opacity-0' : 'opacity-100 delay-300'
                }`}
              >
                {pillar.title}
              </span>

              <div
                className={`absolute inset-x-0 bottom-0 p-8 transition-all duration-700 ${
                  open ? 'translate-y-0 opacity-100 delay-300' : 'pointer-events-none translate-y-6 opacity-0'
                }`}
              >
                <div className="w-[22rem] max-w-full">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 shadow-lg">
                    <Icon size={22} className="text-white" />
                  </span>
                  <h3 className="mt-4 font-heading text-3xl font-bold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/80">{pillar.short}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
                    Explore
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Smaller screens: image cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {PILLARS.map((pillar, i) => {
          const Icon = ICONS[pillar.id]
          return (
            <Reveal key={pillar.id} delay={(i % 2) * 90} className="flex flex-col [&>*]:flex-1">
              <Link to={pillar.to} className="group relative block min-h-[15rem] overflow-hidden rounded-2xl bg-navy-800">
                <img
                  src={pillar.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/35 to-navy-900/10" />
                <span className="absolute left-4 top-3 font-display text-2xl italic text-white/85">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                    <Icon size={18} className="text-white" />
                  </span>
                  <h3 className="mt-3 font-heading text-xl font-bold text-white">{pillar.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-white/80">{pillar.short}</p>
                </div>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </>
  )
}

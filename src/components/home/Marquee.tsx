const ITEMS = [
  'Hotels & stays',
  'Logistics & freight',
  'Agriculture',
  'Real estate',
  'Professional services',
  'Retail & markets',
  'NGOs & development',
  'Tourism & trekking',
  'Trade fairs & events',
]

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div
      id="after-hero"
      aria-hidden
      className="group relative overflow-hidden border-y border-white/10 bg-navy-900 py-5"
    >
      <div className="flex w-max animate-marquee items-center whitespace-nowrap group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-8 font-display text-3xl italic text-white/90">{item}</span>
            <span className="text-blue-400">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy-900 to-transparent" />
    </div>
  )
}

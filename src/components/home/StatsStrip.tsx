import { useData } from '../../data/store'
import { useCountUp } from '../../hooks/useCountUp'
import { useInView } from '../../hooks/useInView'

function Stat({ value, label, active }: { value: number; label: string; active: boolean }) {
  const shown = useCountUp(value, active)
  return (
    <div className="px-4 py-8 text-center sm:py-10">
      <div className="font-heading text-4xl font-bold tabular-nums text-navy-700 sm:text-5xl">{shown}</div>
      <div className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-navy-400">{label}</div>
    </div>
  )
}

export default function StatsStrip() {
  const { businesses, events, opportunities, loading } = useData()
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const active = inView && !loading

  return (
    <section className="border-b border-navy-100 bg-white">
      <div
        ref={ref}
        className="mx-auto grid max-w-5xl grid-cols-2 divide-navy-100 sm:px-6 md:grid-cols-4 md:divide-x lg:px-8"
      >
        <Stat value={2} label="Cities" active={inView} />
        <Stat value={businesses.length} label="Businesses" active={active} />
        <Stat value={events.length} label="Events" active={active} />
        <Stat value={opportunities.length} label="Jobs & tenders" active={active} />
      </div>
    </section>
  )
}

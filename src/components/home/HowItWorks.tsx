import { Handshake, Rocket, Target, type LucideIcon } from 'lucide-react'
import Reveal from '../shared/Reveal'
import { useInView } from '../../hooks/useInView'

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Target,
    title: 'Tell us your goal',
    text: 'Starting up, sourcing a product, hiring, investing — say what you are after and where you are stuck.',
  },
  {
    icon: Handshake,
    title: 'We connect the dots',
    text: 'Advisors, suppliers, venues and partners from our directory, matched to what you actually need.',
  },
  {
    icon: Rocket,
    title: 'Cross with confidence',
    text: 'Launch, trade and grow between Goma and Gisenyi with local knowledge behind every step.',
  },
]

export default function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25)

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-white">
      <div aria-hidden className="absolute -left-32 top-0 h-96 w-96 animate-blob rounded-full bg-blue-500/20 blur-3xl" />
      <div
        aria-hidden
        className="absolute -right-24 bottom-0 h-80 w-80 animate-blob rounded-full bg-blue-400/15 blur-3xl [animation-delay:-8s]"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">How it works</p>
          <h2 className="mt-3 max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-5xl">
            From first question to <span className="font-display font-normal italic text-blue-300">first deal</span>.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          <div aria-hidden className="absolute left-0 right-0 top-[3.1rem] hidden h-px bg-white/10 md:block">
            <div
              className={`h-full origin-left bg-gradient-to-r from-blue-400 via-blue-300 to-transparent transition-transform duration-[1800ms] ease-out ${
                inView ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </div>

          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 180}>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <span className="relative flex h-[6.2rem] w-[6.2rem] shrink-0 items-center justify-center">
                    <span className="text-stroke absolute font-heading text-[5.5rem] font-extrabold leading-none">
                      {i + 1}
                    </span>
                    <span className="relative ml-10 mt-10 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 shadow-[0_8px_30px_-6px_rgba(47,111,237,0.9)]">
                      <step.icon size={21} className="text-white" />
                    </span>
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold">{step.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-navy-100">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

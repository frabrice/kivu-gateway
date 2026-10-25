import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import WhatsAppButton from '../layout/WhatsAppButton'
import Reveal from '../shared/Reveal'

export default function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-28 text-center text-white sm:py-36">
      <div aria-hidden className="absolute left-1/4 top-0 h-96 w-96 animate-blob rounded-full bg-blue-500/25 blur-3xl" />
      <div
        aria-hidden
        className="absolute bottom-0 right-1/4 h-80 w-80 animate-blob rounded-full bg-blue-300/15 blur-3xl [animation-delay:-8s]"
      />
      <div
        aria-hidden
        className="text-stroke-faint pointer-events-none absolute inset-x-0 bottom-[-0.12em] select-none whitespace-nowrap font-heading text-[16vw] font-extrabold leading-none"
      >
        GISENYI ⇄ GOMA
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Ready when you are</p>
          <h2 className="mt-4 font-heading text-4xl font-bold leading-[1.05] sm:text-6xl">
            Ready to <span className="font-display font-normal italic text-blue-300">cross over</span>?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-navy-100 sm:text-lg">
            Tell us what you are building, buying or looking for. We will point you to the right people on both sides of
            the lake.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-listed"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-4 text-sm font-bold text-white shadow-[0_10px_40px_-10px_rgba(47,111,237,0.9)] transition hover:bg-blue-400"
            >
              I Want To Enter Kivu
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <WhatsAppButton className="!rounded-full !px-7 !py-4" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

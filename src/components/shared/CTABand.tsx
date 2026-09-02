import { Link } from 'react-router-dom'
import WhatsAppButton from '../layout/WhatsAppButton'

type CTABandProps = {
  title: string
  description?: string
  primaryLabel?: string
  primaryTo?: string
}

export default function CTABand({
  title,
  description,
  primaryLabel = "Let's Connect",
  primaryTo = '/contact',
}: CTABandProps) {
  return (
    <section className="bg-navy-gradient">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        {description && <p className="max-w-xl text-navy-100">{description}</p>}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to={primaryTo}
            className="inline-flex items-center justify-center rounded-md bg-blue-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
          >
            {primaryLabel} →
          </Link>
          <WhatsAppButton />
        </div>
      </div>
    </section>
  )
}

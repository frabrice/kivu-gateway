import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

type PageHeroProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  image: string
  position?: string
}

export default function PageHero({ eyebrow, title, subtitle, image, position = 'center' }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-navy-800">
      <img
        src={image}
        alt=""
        style={{ objectPosition: position }}
        className="absolute inset-0 h-full w-full animate-kenburns-slow object-cover opacity-50"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-800/65 to-navy-700/25" />
      <div aria-hidden className="absolute -left-24 -top-28 h-80 w-80 animate-blob rounded-full bg-blue-500/25 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
        <div
          className="flex animate-fade-up items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-300"
          style={{ animationDelay: '100ms' }}
        >
          <Link to="/" className="text-navy-100 transition-colors hover:text-white">Home</Link>
          <ChevronRight size={14} />
          <span>{eyebrow ?? title}</span>
        </div>
        <h1
          className="mt-4 max-w-3xl animate-fade-up font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          style={{ animationDelay: '250ms' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-5 max-w-xl animate-fade-up text-base text-navy-100 sm:text-lg"
            style={{ animationDelay: '420ms' }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

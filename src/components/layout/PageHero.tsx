import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

type PageHeroProps = {
  eyebrow?: string
  title: string
  subtitle?: string
  image: string
}

export default function PageHero({ eyebrow, title, subtitle, image }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-navy-700">
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-40"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-800/95 via-navy-700/85 to-navy-600/60" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-500">
          <Link to="/" className="text-navy-100 hover:text-blue-400">Home</Link>
          <ChevronRight size={14} />
          <span>{eyebrow ?? title}</span>
        </div>
        <h1 className="mt-4 max-w-2xl font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 max-w-xl text-base text-navy-100 sm:text-lg">{subtitle}</p>}
      </div>
    </div>
  )
}

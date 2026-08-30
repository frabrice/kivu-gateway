import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import type { Destination } from '../../data/site'

type DestinationCardProps = {
  destination: Destination
  to: string
}

export default function DestinationCard({ destination, to }: DestinationCardProps) {
  const Wrapper = to.startsWith('#') ? 'a' : Link
  const linkProp = to.startsWith('#') ? { href: to } : { to }

  return (
    <Wrapper
      {...(linkProp as any)}
      className="group relative block h-64 w-full overflow-hidden rounded-xl text-left shadow-card"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-800/90 via-navy-800/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <div className="flex items-center gap-1.5 text-sm font-bold">
          <MapPin size={15} className="text-gold-500" />
          {destination.name}
        </div>
        <div className="mt-1 text-xs text-navy-100">{destination.tags}</div>
      </div>
    </Wrapper>
  )
}

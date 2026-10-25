import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, MapPin, Newspaper, Route } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { IMG } from '../data/images'

const TRACKS = [
  {
    icon: MapPin,
    title: 'Destinations',
    description: 'Goma, the Masisi highlands and Virunga National Park — tourism, culture and nature.',
    to: '/explore/destinations',
    cta: 'Discover Destinations',
  },
  {
    icon: Route,
    title: 'Travel & Border Guide',
    description: 'Documents, process and timing for crossing between Gisenyi and Goma.',
    to: '/explore/travel',
    cta: 'Read the Guide',
  },
  {
    icon: CalendarDays,
    title: 'Events',
    description: "What's happening in Goma and Gisenyi — business forums, music nights and more.",
    to: '/events',
    cta: 'See Events',
  },
  {
    icon: Newspaper,
    title: 'Insights',
    description: 'Best cafés, best stays and local guides for getting around the region.',
    to: '/insights',
    cta: 'Read Insights',
  },
]

export default function Explore() {
  useDocumentTitle(
    'Explore Kivu',
    'Discover destinations, hotels, restaurants, experiences, events and lifestyle across Goma and Gisenyi.',
  )

  return (
    <>
      <PageHero
        title="Explore Kivu"
        subtitle="Discover destinations, hotels, restaurants, experiences, events and lifestyle across Goma and Gisenyi."
        image={IMG.lakeAerialPortrait}
        position="center 60%"
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {TRACKS.map((track) => (
            <Link
              key={track.to}
              to={track.to}
              className="group flex flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                <track.icon size={26} className="text-blue-600" />
              </span>
              <h2 className="mt-5 font-heading text-xl font-bold text-navy-700">{track.title}</h2>
              <p className="mt-2 text-sm text-navy-400">{track.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
                {track.cta} <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

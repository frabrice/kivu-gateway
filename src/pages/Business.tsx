import { Link } from 'react-router-dom'
import { ArrowRight, Rocket, Store } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const TRACKS = [
  {
    icon: Rocket,
    title: 'Start a Business',
    description: 'Setting up in Goma? Requirements, registration, investment and support — in one guide.',
    to: '/business/start',
    cta: 'Start Here',
  },
  {
    icon: Store,
    title: 'Find a Business',
    description: 'Browse hotels, restaurants, services and more across Goma and Gisenyi.',
    to: '/business/directory',
    cta: 'Browse Directory',
  },
]

export default function Business() {
  useDocumentTitle('Business', 'Start a business in Goma or find a trusted business in Goma and Gisenyi through the Kivu Gateway directory.')

  return (
    <>
      <PageHero
        title="Business"
        subtitle="Whether you're setting up operations or looking for a trusted local business, start here."
        image="https://images.unsplash.com/photo-1573164574397-dd250bc8a598?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
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

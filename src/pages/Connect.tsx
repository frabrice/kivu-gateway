import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, CalendarDays, HeartHandshake, Users } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const TRACKS = [
  {
    icon: Users,
    title: 'Business Matchmaking',
    description: 'Tell us who you are and what you need — we connect businesses, investors and partners directly.',
    to: '/get-listed',
    cta: 'Get Matched',
  },
  {
    icon: Briefcase,
    title: 'Jobs & Tenders',
    description: 'Connecting companies and NGOs with talent — browse open jobs and tenders across the region.',
    to: '/jobs',
    cta: 'View Jobs & Tenders',
  },
  {
    icon: CalendarDays,
    title: 'Events',
    description: 'Business forums, networking nights and community events where connections happen in person.',
    to: '/events',
    cta: 'See Events',
  },
  {
    icon: HeartHandshake,
    title: 'Partnerships & NGOs',
    description: 'Working with an NGO, expert or organization? Reach out and let\'s find the right fit.',
    to: '/contact',
    cta: 'Talk To Us',
  },
]

export default function Connect() {
  useDocumentTitle(
    'Connect',
    'Connect with businesses, investors, organizations, entrepreneurs, professionals and local partners across Goma and Gisenyi.',
  )

  return (
    <>
      <PageHero
        title="Connect"
        subtitle="Connect with businesses, investors, organizations, entrepreneurs, professionals and local partners across Goma and Gisenyi."
        image="https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?auto=format&fit=crop&w=1400&q=55"
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

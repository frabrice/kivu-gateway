import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, CalendarDays, Compass, Newspaper, Rocket, Store, type LucideIcon } from 'lucide-react'
import WhatsAppButton from '../components/layout/WhatsAppButton'
import SectionHeading from '../components/shared/SectionHeading'
import ServiceCard from '../components/shared/ServiceCard'
import DestinationCard from '../components/shared/DestinationCard'
import BusinessCard from '../components/shared/BusinessCard'
import EventCard from '../components/shared/EventCard'
import ArticleCard from '../components/shared/ArticleCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import { DESTINATIONS, PILLARS } from '../data/site'

const PILLAR_ICONS: Record<string, LucideIcon> = {
  explore: Compass,
  'start-business': Rocket,
  directory: Store,
  events: CalendarDays,
  opportunities: Briefcase,
  journal: Newspaper,
}

export default function Home() {
  useDocumentTitle(
    'Home',
    'Kivu Gateway connects Goma and Gisenyi — start a business, cross the border, explore the region, find local businesses, catch events and see opportunities.',
  )
  const { businesses, events, articles } = useData()
  const featuredBusinesses = businesses.filter((b) => b.tier === 'featured').slice(0, 3)
  const upcomingEvents = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)
  const latestArticles = articles
    .filter((a) => a.published)
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    .slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-700">
        <img
          src="https://images.unsplash.com/photo-1589715718565-223fdf9b7cd4?auto=format&fit=crop&w=1600&q=55"
          alt="Lake Kivu shoreline near Goma and Gisenyi"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-800/85 to-navy-700/30" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-24 sm:px-6 lg:px-8">
          <h1 className="max-w-xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            Your Gateway <span className="block text-blue-500">to Goma &amp; Gisenyi</span>
          </h1>
          <p className="max-w-md text-base text-navy-100 sm:text-lg">
            Start a business, cross the border, explore the region, find local businesses and see what's happening —
            all in one place.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/business/start"
              className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-blue-600"
            >
              Start a Business <ArrowRight size={16} />
            </Link>
            <WhatsAppButton />
          </div>

          <div className="mt-4 inline-flex w-fit items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            Gisenyi <span className="text-blue-500">⇄</span> Goma
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {PILLARS.map((pillar) => (
            <ServiceCard
              key={pillar.id}
              icon={PILLAR_ICONS[pillar.id]}
              title={pillar.title}
              description={pillar.short}
              to={pillar.to}
            />
          ))}
        </div>
      </section>

      {/* Featured businesses */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="Business Directory" title="Featured Businesses" />
          <Link to="/business/directory" className="text-sm font-bold text-blue-600 hover:text-blue-700">
            View Full Directory →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </section>

      {/* Explore the region */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Explore The Region" title="Goma, Masisi & Virunga" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {DESTINATIONS.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} to={`/explore#${destination.id}`} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 rounded-md border-2 border-navy-600 px-7 py-3 text-sm font-bold text-navy-600 transition hover:bg-navy-600 hover:text-white"
            >
              Explore The Region <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="What's On" title="Upcoming Events" />
          <Link to="/events" className="text-sm font-bold text-blue-600 hover:text-blue-700">
            View All Events →
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Lifestyle */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading align="left" eyebrow="Lifestyle" title="Latest From Lifestyle" />
            <Link to="/lifestyle" className="text-sm font-bold text-blue-600 hover:text-blue-700">
              Read More →
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

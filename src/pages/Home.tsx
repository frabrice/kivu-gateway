import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/home/Hero'
import Marquee from '../components/home/Marquee'
import PillarShowcase from '../components/home/PillarShowcase'
import HowItWorks from '../components/home/HowItWorks'
import ClosingCTA from '../components/home/ClosingCTA'
import Reveal from '../components/shared/Reveal'
import SectionHeading from '../components/shared/SectionHeading'
import DestinationCard from '../components/shared/DestinationCard'
import BusinessCard from '../components/shared/BusinessCard'
import EventCard from '../components/shared/EventCard'
import ArticleCard from '../components/shared/ArticleCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import { DESTINATIONS } from '../data/site'

const STAGGER = 'flex flex-col [&>*]:flex-1'

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
      <Hero />
      <Marquee />

      {/* Six ways in */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Six ways in"
            title="Whatever brought you to Kivu, start here."
            description="Pick a door. Each one opens onto the people, places and opportunities behind it."
          />
        </Reveal>
        <div className="mt-12">
          <PillarShowcase />
        </div>
      </section>

      <HowItWorks />

      {/* Featured businesses */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="Business Directory" title="Featured Businesses" />
          <Link to="/business/directory" className="group inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700">
            View Full Directory <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredBusinesses.map((business, i) => (
            <Reveal key={business.id} delay={i * 110} className={STAGGER}>
              <BusinessCard business={business} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Explore the region */}
      <section className="bg-navy-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Explore The Region" title="Goma, Masisi & Virunga" />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {DESTINATIONS.map((destination, i) => (
              <Reveal key={destination.id} delay={i * 130} className={STAGGER}>
                <DestinationCard destination={destination} to={`/explore/destinations#${destination.id}`} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 flex justify-center">
            <Link
              to="/explore/destinations"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-navy-600 px-8 py-3.5 text-sm font-bold text-navy-600 transition hover:bg-navy-600 hover:text-white"
            >
              Explore The Region <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading align="left" eyebrow="What's On" title="Upcoming Events" />
          <Link to="/events" className="group inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700">
            View All Events <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.map((event, i) => (
            <Reveal key={event.id} delay={i * 110} className={STAGGER}>
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section className="bg-navy-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading align="left" eyebrow="Insights" title="Latest Insights" />
            <Link to="/insights" className="group inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700">
              Read More <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.map((article, i) => (
              <Reveal key={article.id} delay={i * 110} className={STAGGER}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  )
}

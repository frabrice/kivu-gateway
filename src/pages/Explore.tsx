import { Link } from 'react-router-dom'
import { ArrowRight, Compass, MapPin } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/shared/SectionHeading'
import CTABand from '../components/shared/CTABand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { DESTINATIONS } from '../data/site'

export default function Explore() {
  useDocumentTitle('Explore Goma, Masisi & Virunga', 'Discover Goma, the Masisi highlands and Virunga National Park — nature, culture and gorilla trekking around Lake Kivu.')

  return (
    <>
      <PageHero
        title="Explore the Region"
        subtitle="Goma, the Masisi highlands and Virunga National Park — nature, culture and adventure around Lake Kivu."
        image="https://images.unsplash.com/photo-1509897739002-791fa79aac9b?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Destinations" title="Three places to start" align="left" />

        <div className="mt-12 space-y-16">
          {DESTINATIONS.map((destination, i) => (
            <div
              key={destination.id}
              id={destination.id}
              className={`scroll-mt-20 grid items-center gap-8 lg:grid-cols-2 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="h-64 w-full rounded-2xl object-cover shadow-card sm:h-80"
                loading="lazy"
                decoding="async"
              />
              <div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-600">
                  <MapPin size={16} />
                  {destination.name}
                </div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-navy-400">{destination.tags}</p>
                <p className="mt-4 text-sm text-navy-500 sm:text-base">{destination.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {destination.activities.map((activity) => (
                    <li
                      key={activity}
                      className="rounded-full bg-navy-50 px-3.5 py-1.5 text-xs font-semibold text-navy-600"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/business/directory"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700"
                >
                  Find Tour Operators & Stays <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Compass size={32} className="mx-auto text-blue-600" />
          <SectionHeading
            title="Crossing from Gisenyi?"
            description="Read our border guide before you travel — documents, process, timing and a few tips from people who cross regularly."
          />
          <Link
            to="/explore/travel"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-navy-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-navy-500"
          >
            Read the Border Guide <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTABand
        title="Ready to Explore Goma, Masisi & Virunga?"
        description="From gorilla trekking to lakeside markets — let's help you plan the trip."
      />
    </>
  )
}

import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Compass,
  Handshake,
  Megaphone,
  Package,
  Store,
  Users,
  type LucideIcon,
} from 'lucide-react'
import WhatsAppButton from '../components/layout/WhatsAppButton'
import SectionHeading from '../components/shared/SectionHeading'
import ServiceCard from '../components/shared/ServiceCard'
import DestinationCard from '../components/shared/DestinationCard'
import { DESTINATIONS, MARKET_ACCESS_SERVICES, PILLARS } from '../data/site'

const PILLAR_ICONS: Record<string, LucideIcon> = {
  business: Handshake,
  trade: Package,
  property: Building2,
  hospitality: Store,
  tourism: Compass,
}

const MARKET_ACCESS_ICONS: Record<string, LucideIcon> = {
  'product-launch': Megaphone,
  'property-launch': Building2,
  'hotel-business-launch': Store,
  'market-entry': Users,
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-700">
        <img
          src="https://images.unsplash.com/photo-1589715718565-223fdf9b7cd4?auto=format&fit=crop&w=1600&q=55"
          alt="Lake Kivu shoreline"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-800 via-navy-800/85 to-navy-700/30" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-6 px-4 py-24 sm:px-6 lg:px-8">
          <h1 className="max-w-xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl">
            Your Gateway <span className="block text-gold-500">to the Great Lakes</span>
          </h1>
          <p className="max-w-md text-base text-navy-100 sm:text-lg">
            Connecting People, Businesses &amp; Opportunities Across Rwanda and Eastern DRC.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-navy-800 transition hover:bg-gold-400"
            >
              Explore Our Services <ArrowRight size={16} />
            </Link>
            <WhatsAppButton />
          </div>

          <div className="mt-4 inline-flex w-fit items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            Rwanda <span className="text-gold-500">⇄</span> Eastern DRC
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="relative z-10 mx-auto -mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 rounded-2xl bg-white/0 sm:grid-cols-2 lg:grid-cols-5">
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

      {/* Market Access & Activation */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-navy-gradient">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-3 gap-3">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=55"
                alt="Product on display"
                className="col-span-1 h-40 w-full rounded-xl object-cover sm:h-56"
                loading="lazy"
                decoding="async"
              />
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=55"
                alt="Property development"
                className="col-span-1 h-40 w-full rounded-xl object-cover sm:h-56"
                loading="lazy"
                decoding="async"
              />
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=55"
                alt="Hotel room"
                className="col-span-1 h-40 w-full rounded-xl object-cover sm:h-56"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div>
              <SectionHeading
                align="left"
                eyebrow="Market Access & Activation"
                title="We help businesses, products, properties and hospitality brands enter, launch and grow in the Great Lakes market."
                light
              />

              <div className="mt-8 grid grid-cols-2 gap-6">
                {MARKET_ACCESS_SERVICES.map((service) => {
                  const Icon = MARKET_ACCESS_ICONS[service.id]
                  return (
                    <div key={service.id}>
                      <Icon size={22} className="text-gold-500" />
                      <div className="mt-2 text-sm font-bold uppercase tracking-wide text-white">{service.title}</div>
                      <div className="mt-1 text-xs text-navy-100">{service.tagline}</div>
                    </div>
                  )
                })}
              </div>

              <Link
                to="/market-access"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-navy-800 transition hover:bg-gold-400"
              >
                Launch With Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discover the Great Lakes */}
      <section className="mx-auto max-w-7xl px-4 py-4 pb-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Explore The Region" title="Discover the Great Lakes" />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} to={`/tourism#${destination.id}`} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/tourism"
            className="inline-flex items-center gap-2 rounded-md border-2 border-navy-600 px-7 py-3 text-sm font-bold uppercase tracking-wide text-navy-600 transition hover:bg-navy-600 hover:text-white"
          >
            Explore All Destinations <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}

import { Building2, CheckCircle2, Megaphone, Store, Users, type LucideIcon } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/shared/SectionHeading'
import CTABand from '../components/shared/CTABand'
import { MARKET_ACCESS_SERVICES } from '../data/site'

const ICONS: Record<string, LucideIcon> = {
  'product-launch': Megaphone,
  'property-launch': Building2,
  'hotel-business-launch': Store,
  'market-entry': Users,
}

export default function MarketAccess() {
  return (
    <>
      <PageHero
        title="Market Access & Activation"
        subtitle="We help businesses, products, properties and hospitality brands enter, launch and grow in the Great Lakes market."
        image="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Launch Programs"
          title="Four ways we get you into the market"
          description="Whichever kind of launch you're planning, our team handles the local groundwork — research, positioning, partnerships and promotion — so you can focus on the product."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {MARKET_ACCESS_SERVICES.map((service) => {
            const Icon = ICONS[service.id]
            return (
              <div key={service.id} className="rounded-2xl border border-navy-100 bg-white p-7 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-600">
                  <Icon size={22} className="text-gold-500" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-navy-700">{service.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gold-600">{service.tagline}</p>
                <p className="mt-3 text-sm text-navy-400">{service.description}</p>

                <ul className="mt-5 space-y-2">
                  {service.steps.map((step, i) => (
                    <li key={step} className="flex items-start gap-2.5 text-sm text-navy-500">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-50 text-[11px] font-bold text-gold-700">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Launch With Us" title="Local reach, from day one" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              'A ready network of 500+ business, property and hospitality partners across Rwanda and Eastern DRC.',
              'On-the-ground representation — we know who to talk to and how launches actually get traction here.',
              'One partner for the whole launch: research, introductions, promotion and follow-up support.',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-xl bg-white p-5 shadow-card">
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-gold-600" />
                <p className="text-sm text-navy-500">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Launch With Us"
        description="Tell us about your product, property, hotel or business — we'll come back with a launch approach tailored to the Great Lakes market."
        primaryLabel="Start Your Launch"
      />
    </>
  )
}

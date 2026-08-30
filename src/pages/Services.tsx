import {
  Building2,
  CheckCircle2,
  Handshake,
  Package,
  Store,
  type LucideIcon,
} from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/shared/SectionHeading'
import CTABand from '../components/shared/CTABand'

type ServiceSectionProps = {
  id: string
  icon: LucideIcon
  eyebrow: string
  title: string
  description: string
  whatWeDo: string[]
  cards: { title: string; detail: string; image: string }[]
  cardsLabel: string
  image: string
  reverse?: boolean
  tinted?: boolean
}

function ServiceSection({
  id,
  icon: Icon,
  eyebrow,
  title,
  description,
  whatWeDo,
  cards,
  cardsLabel,
  image,
  reverse,
  tinted,
}: ServiceSectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 ${tinted ? 'bg-navy-50' : 'bg-white'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <img src={image} alt={title} className="h-64 w-full rounded-2xl object-cover shadow-card sm:h-80" />

          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-600">
              <Icon size={22} className="text-gold-500" />
            </span>
            <SectionHeading align="left" eyebrow={eyebrow} title={title} description={description} />
            <ul className="mt-5 space-y-2.5">
              {whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy-500">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-gold-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-navy-400">{cardsLabel}</h3>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {cards.map((card) => (
              <div key={card.title} className="overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card">
                <img src={card.image} alt={card.title} className="h-36 w-full object-cover" />
                <div className="p-4">
                  <div className="text-sm font-bold text-navy-700">{card.title}</div>
                  <div className="mt-1 text-xs text-navy-400">{card.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Business Connections, Trade &amp; Sourcing, Real Estate &amp; Property and Hospitality — everything you need to do business across the Great Lakes."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
      />

      <ServiceSection
        id="business"
        icon={Handshake}
        eyebrow="Business Connections"
        title="Trusted partners, real introductions"
        description="We connect entrepreneurs, investors and companies with trusted local partners and opportunities across Rwanda and Eastern DRC — from first introduction to long-term partnership."
        whatWeDo={[
          'Investor & entrepreneur matchmaking',
          'B2B partner introductions',
          'Networking events & business mixers',
          'Partner vetting and background checks',
        ]}
        cardsLabel="Who We Connect"
        cards={[
          { title: 'Investors & Funds', detail: 'Deal flow and vetted local opportunities.', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80' },
          { title: 'SMEs & Startups', detail: 'Partners, distributors and capital.', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80' },
          { title: 'Corporates & NGOs', detail: 'Local representation and partnerships.', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80' },
        ]}
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
      />

      <ServiceSection
        id="trade"
        icon={Package}
        eyebrow="Trade & Sourcing"
        title="Source, supply, trade with confidence"
        description="We connect buyers, suppliers and businesses across Rwanda and Eastern DRC — helping you source products, find distribution partners, and move goods across the border with confidence."
        whatWeDo={[
          'Buyer–supplier matchmaking',
          'Product and supplier sourcing requests',
          'Cross-border logistics partner referrals',
          'Quality and compliance guidance',
        ]}
        cardsLabel="Sectors We Cover"
        cards={[
          { title: 'Agriculture & Food', detail: 'Produce, staples and processed goods.', image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=600&q=80' },
          { title: 'Construction Materials', detail: 'Building supplies and hardware.', image: 'https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=600&q=80' },
          { title: 'Consumer Goods', detail: 'Retail-ready product sourcing.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80' },
        ]}
        image="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1200&q=80"
        reverse
        tinted
      />

      <ServiceSection
        id="property"
        icon={Building2}
        eyebrow="Real Estate & Property"
        title="Property sourcing, sales & management"
        description="From sourcing the right plot or unit to full property management, we help owners, investors and tenants navigate real estate across the region."
        whatWeDo={[
          'Property sourcing and search',
          'Sales and rentals brokerage',
          'Professional property management',
          'Investment and pricing advisory',
        ]}
        cardsLabel="Featured Listings (Sample)"
        cards={[
          { title: 'Modern Apartment — Kigali', detail: 'Kimihurura · Contact for pricing', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80' },
          { title: 'Commercial Plot — Rubavu', detail: 'Prime location · Contact for pricing', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80' },
          { title: 'Lakeside Villa — Karongi', detail: 'Lake Kivu views · Contact for pricing', image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80' },
        ]}
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
      />

      <ServiceSection
        id="hospitality"
        icon={Store}
        eyebrow="Hospitality"
        title="Accommodation, dining & guest experience"
        description="Quality accommodation, dining and hospitality services for visitors, businesses and property owners — plus launch support for new hospitality brands entering the market."
        whatWeDo={[
          'Accommodation and stay recommendations',
          'Restaurant and venue partnerships',
          'Hospitality brand launch support',
          'Guest experience curation',
        ]}
        cardsLabel="Featured Partners (Sample)"
        cards={[
          { title: 'Boutique Lake Hotel', detail: 'Rubavu / Gisenyi', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80' },
          { title: 'Lakeside Restaurant', detail: 'Karongi', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
          { title: 'Business Guesthouse', detail: 'Kigali', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80' },
        ]}
        image="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
        reverse
        tinted
      />

      <CTABand
        title="Ready to start a conversation?"
        description="Tell us what you're looking for — a partner, a supplier, a property or a place to stay — and we'll connect you with the right people."
      />
    </>
  )
}

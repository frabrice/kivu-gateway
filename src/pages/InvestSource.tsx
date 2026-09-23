import { Link } from 'react-router-dom'
import { CheckCircle2, Coins, Package, TrendingUp } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/shared/SectionHeading'
import CTABand from '../components/shared/CTABand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const OPPORTUNITIES = [
  'Equity and joint-venture opportunities in growing local businesses',
  'Commercial real estate and property development projects',
  'Infrastructure and logistics projects serving the Gisenyi–Goma corridor',
  'NGO and development-partner co-financing opportunities',
]

const SOURCING = [
  'Locally made goods — textiles, crafts, food & beverage products',
  'Agricultural produce and processed goods from North Kivu and the wider region',
  'Verified local suppliers for retail, hospitality and construction',
  'Sourcing introductions vetted through our business directory',
]

const SERVICES = [
  { title: 'Investment Opportunities', detail: 'Curated opportunities across property, infrastructure and growing local businesses, matched to your investment profile.' },
  { title: 'Local Products', detail: 'Discover and source locally made goods — from textiles and crafts to food and beverage products — for export or local resale.' },
  { title: 'Suppliers', detail: 'Vetted local suppliers for retail, hospitality, construction and logistics, drawn from our business directory.' },
  { title: 'Projects', detail: 'Visibility into infrastructure, real estate and development projects looking for co-investment or partners.' },
  { title: 'Commercial Opportunities', detail: 'Trade and distribution opportunities connecting your business to the Gisenyi–Goma market.' },
]

export default function InvestSource() {
  useDocumentTitle(
    'Invest & Source',
    'Discover investment opportunities, local products, suppliers and projects across Goma and Gisenyi.',
  )

  return (
    <>
      <PageHero
        title="Invest & Source"
        subtitle="Discover investment opportunities, local products, projects, businesses and suppliers across Goma and Gisenyi."
        image="https://images.unsplash.com/photo-1655682604476-96976c1917fb?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <TrendingUp size={22} className="text-blue-600" />
            </span>
            <SectionHeading align="left" eyebrow="Investment Opportunities" title="Where capital is needed" />
            <ul className="mt-5 space-y-3">
              {OPPORTUNITIES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy-500">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <Package size={22} className="text-blue-600" />
            </span>
            <SectionHeading align="left" eyebrow="Sourcing & Supply" title="What's available to source" />
            <ul className="mt-5 space-y-3">
              {SOURCING.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy-500">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-navy-400">
              Browse verified suppliers directly in our{' '}
              <Link to="/business/directory" className="font-semibold text-blue-600">Business Directory</Link>.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-2">
            <Coins size={20} className="text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">How We Help</span>
          </div>
          <h2 className="mt-2 font-heading text-2xl font-bold text-navy-700 sm:text-3xl">Investment & sourcing support</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((item) => (
              <div key={item.title} className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <h3 className="font-heading text-base font-bold text-navy-700">{item.title}</h3>
                <p className="mt-2 text-sm text-navy-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to invest or source in Kivu?"
        description="Tell us what you're looking for — an investment opportunity, a supplier, or a local product to source — and we'll help you find it."
        primaryLabel="Get Started"
      />
    </>
  )
}

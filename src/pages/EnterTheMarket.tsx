import { Link } from 'react-router-dom'
import { Banknote, CheckCircle2, FileText, Rocket } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/shared/SectionHeading'
import CTABand from '../components/shared/CTABand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const REQUIREMENTS = [
  'Choose a business structure (sole proprietorship, SARL/limited company, etc.) suited to your activity',
  'Register with the one-stop business registration office (Guichet Unique) for a national identification number',
  'Register for tax with the DGI (Direction Générale des Impôts) and obtain a tax identification number',
  'Register employees with the national social security fund (INSS) once you start hiring',
  'Obtain any sector-specific permits (health, import/export, hospitality, etc.) relevant to your activity',
]

const FUNDING = [
  'Local bank financing through commercial banks operating in Goma',
  'Microfinance institutions for smaller working-capital needs',
  'NGO and development-partner grant programs supporting local enterprise',
  'Diaspora and private investors — we can help make the right introductions',
]

const SUPPORT = [
  { title: 'Market Research', detail: 'Local insight on your sector, competitors, pricing and what a realistic launch looks like in Goma and Gisenyi.' },
  { title: 'Product Launch', detail: 'Guidance on introducing a new product or service to the market, from positioning to launch logistics.' },
  { title: 'Distribution', detail: 'Connections to distributors, retailers and logistics partners already active across the region.' },
  { title: 'Product Activation', detail: 'On-the-ground support to get your product in front of real customers — sampling, demos and local marketing.' },
  { title: 'Local Partnerships', detail: 'Introductions to investors, distributors and partners who can help you enter the market with confidence.' },
]

export default function EnterTheMarket() {
  useDocumentTitle(
    'Enter the Market',
    'Market research, product launch, distribution and local partnerships for entrepreneurs and investors entering Goma and Gisenyi.',
  )

  return (
    <>
      <PageHero
        title="Enter the Market"
        subtitle="Market research, product launch, distribution, activation and local partnerships — everything you need to enter Goma and Gisenyi with confidence."
        image="https://images.unsplash.com/photo-1573164574397-dd250bc8a598?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <FileText size={22} className="text-blue-600" />
            </span>
            <SectionHeading align="left" eyebrow="Requirements & Registration" title="Getting registered" />
            <ul className="mt-5 space-y-3">
              {REQUIREMENTS.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy-500">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-navy-400">
              Requirements and fees change — we recommend confirming current steps with a local advisor before you begin. Our
              directory lists <Link to="/business/directory?category=Professional+Services" className="font-semibold text-blue-600">Professional Services</Link> who can walk you through it.
            </p>
          </div>

          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <Banknote size={22} className="text-blue-600" />
            </span>
            <SectionHeading align="left" eyebrow="Investment & Funding" title="Financing your launch" />
            <ul className="mt-5 space-y-3">
              {FUNDING.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-navy-500">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center gap-2">
            <Rocket size={20} className="text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">How We Help</span>
          </div>
          <h2 className="mt-2 font-heading text-2xl font-bold text-navy-700 sm:text-3xl">Market-entry support</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORT.map((item) => (
              <div key={item.title} className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
                <h3 className="font-heading text-base font-bold text-navy-700">{item.title}</h3>
                <p className="mt-2 text-sm text-navy-400">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to enter the market?"
        description="Tell us about your product or business idea and where you're stuck — registration, funding, distribution or finding the right partners."
        primaryLabel="Get Started"
      />
    </>
  )
}

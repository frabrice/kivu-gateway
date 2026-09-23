import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, Building2, Store, Truck } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const CATEGORIES = [
  { icon: Store, label: 'Hotels & Restaurants' },
  { icon: Briefcase, label: 'Professional Services' },
  { icon: Building2, label: 'Properties' },
  { icon: Truck, label: 'Suppliers & Logistics' },
]

export default function Business() {
  useDocumentTitle('Do Business', 'Find trusted businesses, professional services, properties and suppliers across Goma and Gisenyi.')

  return (
    <>
      <PageHero
        title="Do Business"
        subtitle="Find local businesses, suppliers, professionals, services and commercial opportunities across Goma and Gisenyi."
        image="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map((category) => (
            <div key={category.label} className="flex flex-col items-center gap-2 rounded-xl border border-navy-100 bg-white p-5 text-center shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                <category.icon size={20} className="text-blue-600" />
              </span>
              <span className="text-xs font-bold text-navy-700">{category.label}</span>
            </div>
          ))}
        </div>

        <Link
          to="/business/directory"
          className="group mt-8 flex flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-card transition hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 className="font-heading text-xl font-bold text-navy-700">Browse the Full Directory</h2>
            <p className="mt-2 max-w-xl text-sm text-navy-400">
              Hotels, restaurants, professional services, real estate, retail, transport & logistics, and tour operators — trusted
              businesses across Goma and Gisenyi.
            </p>
          </div>
          <span className="mt-6 inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-blue-600 sm:mt-0">
            Browse Directory <ArrowRight size={15} className="transition group-hover:translate-x-1" />
          </span>
        </Link>
      </section>
    </>
  )
}

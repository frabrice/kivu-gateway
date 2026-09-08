import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/layout/PageHero'
import FilterChips from '../components/shared/FilterChips'
import BusinessCard from '../components/shared/BusinessCard'
import CTABand from '../components/shared/CTABand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import type { BusinessCategory, City } from '../data/types'

const CATEGORIES: BusinessCategory[] = [
  'Stay',
  'Food & Drink',
  'Professional Services',
  'Real Estate',
  'Retail & Shopping',
  'Transport & Logistics',
  'Tour Operators',
]
const CITIES: City[] = ['Goma', 'Gisenyi']

export default function BusinessDirectory() {
  useDocumentTitle('Business Directory', 'Find trusted hotels, restaurants, services and more across Goma and Gisenyi.')
  const { businesses } = useData()
  const [searchParams] = useSearchParams()
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [city, setCity] = useState('All')

  const filtered = useMemo(
    () =>
      businesses
        .filter((b) => category === 'All' || b.category === category)
        .filter((b) => city === 'All' || b.city === city)
        .sort((a, b) => (a.tier === b.tier ? 0 : a.tier === 'featured' ? -1 : 1)),
    [businesses, category, city],
  )

  return (
    <>
      <PageHero
        title="Business Directory"
        subtitle="Trusted hotels, restaurants, professional services and more across Goma and Gisenyi."
        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-3 rounded-xl border border-navy-100 bg-white p-5 shadow-card">
          <FilterChips label="City" options={CITIES} value={city} onChange={setCity} />
          <FilterChips label="Category" options={CATEGORIES} value={category} onChange={setCategory} />
        </div>

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-navy-400">No businesses match those filters yet.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </section>

      <CTABand
        title="Own a business in Goma or Gisenyi?"
        description="Get listed in our directory — free basic listings, with featured placement for businesses that want more visibility."
        primaryLabel="Get Listed"
        primaryTo="/get-listed?type=business"
      />
    </>
  )
}

import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero'
import FilterChips from '../components/shared/FilterChips'
import OpportunityCard from '../components/shared/OpportunityCard'
import CTABand from '../components/shared/CTABand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import type { OpportunityType } from '../data/types'

const TYPES: OpportunityType[] = ['Job', 'Tender']

export default function Jobs() {
  useDocumentTitle('Jobs', 'Jobs and tenders from companies and NGOs working in Goma, Gisenyi and North Kivu.')
  const { opportunities } = useData()
  const [type, setType] = useState('All')

  const filtered = useMemo(
    () =>
      opportunities
        .filter((o) => type === 'All' || o.type === type)
        .sort((a, b) => a.deadline.localeCompare(b.deadline)),
    [opportunities, type],
  )

  return (
    <>
      <PageHero
        title="Jobs"
        subtitle="Jobs and tenders from companies and NGOs working across Goma, Gisenyi and North Kivu."
        image="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=1400&q=42"
      />

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <FilterChips label="Type" options={TYPES} value={type} onChange={setType} />

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-navy-400">No jobs or tenders match that filter right now.</p>
        ) : (
          <div className="mt-8 flex flex-col gap-4">
            {filtered.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        )}
      </section>

      <CTABand
        title="Hiring or publishing a tender?"
        description="Reach entrepreneurs, professionals and organizations across Goma and Gisenyi."
        primaryLabel="Post a Job or Tender"
        primaryTo="/get-listed?type=job"
      />
    </>
  )
}

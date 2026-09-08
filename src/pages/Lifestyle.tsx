import { useMemo, useState } from 'react'
import PageHero from '../components/layout/PageHero'
import FilterChips from '../components/shared/FilterChips'
import ArticleCard from '../components/shared/ArticleCard'
import CTABand from '../components/shared/CTABand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import type { ArticleCategory } from '../data/types'

const CATEGORIES: ArticleCategory[] = ['Food & Cafés', 'Stay & Hotels', 'Guides', 'Nature & Wildlife']

export default function Lifestyle() {
  useDocumentTitle('Lifestyle', 'Lifestyle guides for Goma and Gisenyi — best cafés, best hotels, border guides and more.')
  const { articles } = useData()
  const [category, setCategory] = useState('All')

  const filtered = useMemo(
    () =>
      articles
        .filter((a) => a.published)
        .filter((a) => category === 'All' || a.category === category)
        .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate)),
    [articles, category],
  )

  return (
    <>
      <PageHero
        title="Lifestyle"
        subtitle="Lifestyle guides for Goma and Gisenyi — best cafés, best hotels, border guides and more."
        image="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FilterChips label="Category" options={CATEGORIES} value={category} onChange={setCategory} />

        {filtered.length === 0 ? (
          <p className="mt-12 text-center text-sm text-navy-400">No articles in this category yet.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>

      <CTABand
        title="Want us to feature your business?"
        description="Pitch a story — best cafés, best stays, local guides and more."
        primaryLabel="Pitch a Story"
        primaryTo="/get-listed?type=article"
      />
    </>
  )
}

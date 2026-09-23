import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Article } from '../../data/types'

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/insights/${article.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="h-44 w-full overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-blue-600">{article.category}</span>
        <h3 className="mt-1.5 font-heading text-base font-bold text-navy-700">{article.title}</h3>
        <p className="mt-2 text-sm text-navy-400">{article.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-xs font-bold text-blue-600">
          Read Article <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  )
}

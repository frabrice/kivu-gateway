import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function LifestyleDetail() {
  const { slug } = useParams()
  const { articles } = useData()
  const article = articles.find((a) => a.slug === slug && a.published)

  useDocumentTitle(article ? article.title : 'Article Not Found', article?.excerpt)

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-bold text-navy-700">Article not found</h1>
        <Link to="/lifestyle" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
          <ArrowLeft size={15} /> Back to Lifestyle
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <img src={article.coverImage} alt={article.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
          <Link to="/lifestyle" className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white">
            <ArrowLeft size={14} /> Back to Lifestyle
          </Link>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">{article.category}</span>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">{article.title}</h1>
        </div>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5 border-b border-navy-100 pb-6 text-xs font-semibold text-navy-400">
          <span className="flex items-center gap-1.5">
            <User size={14} className="text-blue-600" /> {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-blue-600" /> {formatDate(article.publishedDate)}
          </span>
        </div>

        <div className="mt-8 space-y-5">
          {article.body.split('\n\n').map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-navy-600 sm:text-base">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </>
  )
}

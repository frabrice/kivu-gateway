import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Briefcase, Building2, Clock, Mail, MapPin } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import { formatDate } from '../components/shared/EventCard'

export default function OpportunityDetail() {
  const { id } = useParams()
  const { opportunities } = useData()
  const opportunity = opportunities.find((o) => o.id === id)

  useDocumentTitle(opportunity ? opportunity.title : 'Opportunity Not Found', opportunity?.description)

  if (!opportunity) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-bold text-navy-700">Opportunity not found</h1>
        <Link to="/opportunities" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
          <ArrowLeft size={15} /> Back to Opportunities
        </Link>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/opportunities" className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400 hover:text-blue-600">
        <ArrowLeft size={14} /> Back to Opportunities
      </Link>

      <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            opportunity.type === 'Job' ? 'bg-blue-50 text-blue-600' : 'bg-navy-50 text-navy-600'
          }`}
        >
          <Briefcase size={11} /> {opportunity.type}
        </span>
        <h1 className="mt-3 font-heading text-2xl font-bold text-navy-700 sm:text-3xl">{opportunity.title}</h1>
        <p className="mt-1 text-sm font-semibold text-navy-500">{opportunity.org}</p>

        <div className="mt-6 grid grid-cols-1 gap-3 border-y border-navy-100 py-5 sm:grid-cols-3">
          <div className="flex items-center gap-2 text-sm text-navy-600">
            <MapPin size={16} className="text-blue-600" /> {opportunity.city}
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-600">
            <Clock size={16} className="text-blue-600" /> Deadline {formatDate(opportunity.deadline)}
          </div>
          <div className="flex items-center gap-2 text-sm text-navy-600">
            <Building2 size={16} className="text-blue-600" /> Posted {formatDate(opportunity.postedDate)}
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-navy-500 sm:text-base">{opportunity.description}</p>

        <a
          href={`mailto:${opportunity.contact}`}
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-blue-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
        >
          <Mail size={16} /> Apply — {opportunity.contact}
        </a>
      </div>
    </section>
  )
}

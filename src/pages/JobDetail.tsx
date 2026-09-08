import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Banknote, Briefcase, Building2, Clock, ExternalLink, Mail, MapPin } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import { formatDate } from '../components/shared/EventCard'

export default function JobDetail() {
  const { id } = useParams()
  const { opportunities } = useData()
  const opportunity = opportunities.find((o) => o.id === id)

  useDocumentTitle(opportunity ? opportunity.title : 'Job Not Found', opportunity?.description)

  if (!opportunity) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-bold text-navy-700">Job not found</h1>
        <Link to="/jobs" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
          <ArrowLeft size={15} /> Back to Jobs
        </Link>
      </div>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link to="/jobs" className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-400 hover:text-blue-600">
        <ArrowLeft size={14} /> Back to Jobs
      </Link>

      <div className="mt-6 rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
              opportunity.type === 'Job' ? 'bg-blue-50 text-blue-600' : 'bg-navy-50 text-navy-600'
            }`}
          >
            <Briefcase size={11} /> {opportunity.type}
          </span>
          {opportunity.employmentType && (
            <span className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2.5 py-1 text-[11px] font-bold text-navy-600">
              {opportunity.employmentType}
            </span>
          )}
        </div>
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
          {opportunity.compensation && (
            <div className="flex items-center gap-2 text-sm text-navy-600">
              <Banknote size={16} className="text-blue-600" /> {opportunity.compensation}
            </div>
          )}
        </div>

        <p className="mt-6 text-sm leading-relaxed text-navy-500 sm:text-base">{opportunity.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${opportunity.contact}`}
            className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
          >
            <Mail size={16} /> Apply — {opportunity.contact}
          </a>
          {opportunity.applyLink && (
            <a
              href={opportunity.applyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-navy-200 px-6 py-3 text-sm font-bold text-navy-700 transition hover:bg-navy-50"
            >
              <ExternalLink size={16} /> Application Link
            </a>
          )}
        </div>
      </div>
    </section>
  )
}

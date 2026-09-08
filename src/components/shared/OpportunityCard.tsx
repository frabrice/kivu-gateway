import { Link } from 'react-router-dom'
import { Briefcase, Clock, MapPin } from 'lucide-react'
import type { Opportunity } from '../../data/types'
import { formatDate } from './EventCard'

export default function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <Link
      to={`/jobs/${opportunity.id}`}
      className="flex flex-col gap-3 rounded-xl border border-navy-100 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            opportunity.type === 'Job' ? 'bg-blue-50 text-blue-600' : 'bg-navy-50 text-navy-600'
          }`}
        >
          <Briefcase size={11} />
          {opportunity.type}
        </span>
        <h3 className="mt-2 font-heading text-base font-bold text-navy-700">{opportunity.title}</h3>
        <p className="mt-1 text-sm text-navy-400">{opportunity.org}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-navy-500">
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-blue-500" />
            {opportunity.city}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-blue-500" />
            Deadline {formatDate(opportunity.deadline)}
          </span>
        </div>
      </div>
      <span className="shrink-0 text-sm font-bold text-blue-600">View Details →</span>
    </Link>
  )
}

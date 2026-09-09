import { Link } from 'react-router-dom'
import { ArrowRight, Briefcase, CalendarDays, Inbox, Newspaper, Store } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useData } from '../../data/store'

export default function AdminOverview() {
  useDocumentTitle('Admin Overview')
  const { businesses, events, opportunities, articles, submissions } = useData()

  const upcomingEvents = events.filter((e) => e.date >= new Date().toISOString().slice(0, 10)).length
  const openOpportunities = opportunities.filter((o) => o.deadline >= new Date().toISOString().slice(0, 10)).length
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending').length

  const cards = [
    { label: 'Businesses Listed', value: businesses.length, icon: Store, to: '/admin/businesses' },
    { label: 'Upcoming Events', value: upcomingEvents, icon: CalendarDays, to: '/admin/events' },
    { label: 'Open Jobs & Tenders', value: openOpportunities, icon: Briefcase, to: '/admin/jobs' },
    { label: 'Lifestyle Articles', value: articles.length, icon: Newspaper, to: '/admin/lifestyle' },
    { label: 'Pending Submissions', value: pendingSubmissions, icon: Inbox, to: '/admin/submissions' },
  ]

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy-700">Overview</h1>
      <p className="mt-1 text-sm text-navy-400">Live data from your Supabase database.</p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="group rounded-xl border border-navy-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
              <card.icon size={20} className="text-blue-600" />
            </span>
            <div className="mt-4 font-heading text-3xl font-bold text-navy-700">{card.value}</div>
            <div className="mt-1 text-sm text-navy-400">{card.label}</div>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-600">
              Manage <ArrowRight size={12} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

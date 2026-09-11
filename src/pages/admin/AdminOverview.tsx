import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Inbox,
  Newspaper,
  Star,
  Store,
} from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useData } from '../../data/store'
import { formatDate } from '../../components/shared/EventCard'
import type { SubmissionStatus, SubmissionType } from '../../data/types'

const TODAY = new Date().toISOString().slice(0, 10)

const SUBMISSION_TYPE_LABEL: Record<SubmissionType, string> = {
  business: 'Business',
  job: 'Job / Tender',
  event: 'Event',
  article: 'Lifestyle Story',
}

const STATUS_COLOR: Record<SubmissionStatus, string> = {
  pending: 'bg-amber-400',
  reviewed: 'bg-green-500',
  dismissed: 'bg-navy-300',
}

function BarList({ items, colorClass = 'bg-blue-500' }: { items: { label: string; value: number }[]; colorClass?: string }) {
  const max = Math.max(1, ...items.map((i) => i.value))
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between text-xs font-semibold text-navy-500">
            <span>{item.label}</span>
            <span className="text-navy-700">{item.value}</span>
          </div>
          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-navy-50">
            <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${(item.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AdminOverview() {
  useDocumentTitle('Admin Overview')
  const { businesses, events, opportunities, articles, submissions } = useData()

  const upcomingEvents = events.filter((e) => e.date >= TODAY).sort((a, b) => a.date.localeCompare(b.date))
  const openOpportunities = opportunities.filter((o) => o.deadline >= TODAY).sort((a, b) => a.deadline.localeCompare(b.deadline))
  const pendingSubmissions = submissions.filter((s) => s.status === 'pending')

  const cards = [
    { label: 'Businesses Listed', value: businesses.length, icon: Store, to: '/admin/businesses' },
    { label: 'Upcoming Events', value: upcomingEvents.length, icon: CalendarDays, to: '/admin/events' },
    { label: 'Open Jobs & Tenders', value: openOpportunities.length, icon: Briefcase, to: '/admin/jobs' },
    { label: 'Lifestyle Articles', value: articles.length, icon: Newspaper, to: '/admin/lifestyle' },
    { label: 'Pending Submissions', value: pendingSubmissions.length, icon: Inbox, to: '/admin/submissions' },
  ]

  const featuredCount = businesses.filter((b) => b.tier === 'featured').length
  const cityCounts = ['Goma', 'Gisenyi'].map((city) => ({
    label: city,
    value: businesses.filter((b) => b.city === city).length,
  }))
  const categoryCounts = Array.from(new Set(businesses.map((b) => b.category)))
    .map((category) => ({ label: category, value: businesses.filter((b) => b.category === category).length }))
    .sort((a, b) => b.value - a.value)

  const statusCounts: { status: SubmissionStatus; value: number }[] = ['pending', 'reviewed', 'dismissed'].map((status) => ({
    status: status as SubmissionStatus,
    value: submissions.filter((s) => s.status === status).length,
  }))
  const totalSubmissions = submissions.length

  const recentSubmissions = [...submissions]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5)

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

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="font-heading text-sm font-bold text-navy-700">Businesses by Category</h2>
          <p className="mt-0.5 text-xs text-navy-400">{businesses.length} total listings</p>
          <div className="mt-5">
            <BarList items={categoryCounts} />
          </div>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
          <h2 className="font-heading text-sm font-bold text-navy-700">Businesses by City</h2>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-navy-400">
            <Star size={11} className="fill-blue-500 text-blue-500" /> {featuredCount} featured listings
          </p>
          <div className="mt-5">
            <BarList items={cityCounts} colorClass="bg-navy-600" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card lg:col-span-1">
          <h2 className="font-heading text-sm font-bold text-navy-700">Submissions</h2>
          <p className="mt-0.5 text-xs text-navy-400">{totalSubmissions} received in total</p>

          {totalSubmissions > 0 && (
            <div className="mt-5 flex h-2.5 w-full overflow-hidden rounded-full bg-navy-50">
              {statusCounts.map(
                ({ status, value }) =>
                  value > 0 && (
                    <div
                      key={status}
                      className={STATUS_COLOR[status]}
                      style={{ width: `${(value / totalSubmissions) * 100}%` }}
                    />
                  ),
              )}
            </div>
          )}

          <div className="mt-4 space-y-2">
            {statusCounts.map(({ status, value }) => (
              <div key={status} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 font-semibold capitalize text-navy-500">
                  <span className={`h-2 w-2 rounded-full ${STATUS_COLOR[status]}`} /> {status}
                </span>
                <span className="font-bold text-navy-700">{value}</span>
              </div>
            ))}
          </div>

          <Link to="/admin/submissions" className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
            Review Submissions <ArrowRight size={12} />
          </Link>
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-sm font-bold text-navy-700">Recent Submissions</h2>
            <Link to="/admin/submissions" className="text-xs font-bold text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          {recentSubmissions.length === 0 ? (
            <p className="mt-6 text-center text-xs text-navy-400">No submissions yet.</p>
          ) : (
            <div className="mt-4 divide-y divide-navy-100">
              {recentSubmissions.map((s) => (
                <div key={s.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy-700">{s.contactName}</p>
                    <p className="text-xs text-navy-400">
                      {SUBMISSION_TYPE_LABEL[s.type]} · {formatDate(s.createdAt.slice(0, 10))}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold capitalize ${
                      s.status === 'pending'
                        ? 'bg-amber-50 text-amber-600'
                        : s.status === 'reviewed'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-navy-50 text-navy-400'
                    }`}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-sm font-bold text-navy-700">Next Up: Events</h2>
            <Link to="/admin/events" className="text-xs font-bold text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          {upcomingEvents.length === 0 ? (
            <p className="mt-6 text-center text-xs text-navy-400">No upcoming events.</p>
          ) : (
            <div className="mt-4 divide-y divide-navy-100">
              {upcomingEvents.slice(0, 5).map((e) => (
                <div key={e.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy-700">{e.title}</p>
                    <p className="text-xs text-navy-400">{e.city}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-navy-500">{formatDate(e.date)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-sm font-bold text-navy-700">Closing Soon: Jobs & Tenders</h2>
            <Link to="/admin/jobs" className="text-xs font-bold text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          {openOpportunities.length === 0 ? (
            <p className="mt-6 text-center text-xs text-navy-400">No open jobs or tenders.</p>
          ) : (
            <div className="mt-4 divide-y divide-navy-100">
              {openOpportunities.slice(0, 5).map((o) => (
                <div key={o.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-navy-700">{o.title}</p>
                    <p className="text-xs text-navy-400">{o.org}</p>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-navy-500">Deadline {formatDate(o.deadline)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

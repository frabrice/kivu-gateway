import { useState } from 'react'
import { CheckCircle2, Inbox, XCircle } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useData } from '../../data/store'
import type { Submission, SubmissionStatus, SubmissionType } from '../../data/types'
import Slideover from './components/Slideover'
import { SectionTitle } from './components/fields'

const TYPE_LABEL: Record<SubmissionType, string> = {
  business: 'Business',
  job: 'Job / Tender',
  event: 'Event',
  article: 'Lifestyle Story',
}

const STATUS_STYLE: Record<SubmissionStatus, string> = {
  pending: 'bg-amber-50 text-amber-600',
  reviewed: 'bg-green-50 text-green-600',
  dismissed: 'bg-navy-50 text-navy-400',
}

const FIELD_LABELS: Record<string, string> = {
  businessName: 'Business Name',
  category: 'Category',
  city: 'City',
  about: 'About',
  jobTitle: 'Job / Tender Title',
  organization: 'Organization',
  type: 'Type',
  deadline: 'Deadline',
  description: 'Description',
  eventTitle: 'Event Title',
  date: 'Date',
  time: 'Time',
  venue: 'Venue',
  title: 'Proposed Title',
  pitch: 'Pitch',
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export default function AdminSubmissions() {
  useDocumentTitle('Manage Submissions')
  const { submissions, updateSubmissionStatus } = useData()
  const [active, setActive] = useState<Submission | null>(null)
  const [filter, setFilter] = useState<SubmissionStatus | 'all'>('pending')

  const filtered = submissions.filter((s) => filter === 'all' || s.status === filter)
  const pendingCount = submissions.filter((s) => s.status === 'pending').length

  async function handleStatus(id: string, status: SubmissionStatus) {
    await updateSubmissionStatus(id, status)
    setActive((prev) => (prev && prev.id === id ? { ...prev, status } : prev))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-700">Submissions</h1>
          <p className="mt-1 text-sm text-navy-400">{pendingCount} pending review</p>
        </div>
        <div className="flex gap-1 rounded-md border border-navy-100 bg-white p-1">
          {(['pending', 'reviewed', 'dismissed', 'all'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded px-3 py-1.5 text-xs font-bold capitalize transition ${
                filter === f ? 'bg-blue-500 text-white' : 'text-navy-500 hover:bg-navy-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-navy-100 bg-navy-50 text-xs font-bold uppercase tracking-wide text-navy-500">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">From</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-navy-400">
                  <Inbox size={22} className="mx-auto mb-2 text-navy-300" />
                  Nothing here.
                </td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} className="cursor-pointer hover:bg-navy-50/50" onClick={() => setActive(s)}>
                <td className="px-4 py-3 font-semibold text-navy-700">{TYPE_LABEL[s.type]}</td>
                <td className="px-4 py-3 text-navy-500">{s.contactName}</td>
                <td className="px-4 py-3 text-navy-500">{formatDateTime(s.createdAt)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${STATUS_STYLE[s.status]}`}>{s.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  {s.status === 'pending' && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatus(s.id, 'reviewed')
                        }}
                        className="rounded p-1.5 text-navy-400 hover:bg-green-50 hover:text-green-600"
                        title="Mark reviewed"
                      >
                        <CheckCircle2 size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatus(s.id, 'dismissed')
                        }}
                        className="ml-1 rounded p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600"
                        title="Dismiss"
                      >
                        <XCircle size={15} />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Slideover open={!!active} title={active ? TYPE_LABEL[active.type] : ''} onClose={() => setActive(null)}>
        {active && (
          <div className="space-y-6">
            <SectionTitle>Submitted Details</SectionTitle>
            <div className="space-y-4">
              {Object.entries(active.payload).map(([key, value]) => (
                <div key={key}>
                  <span className="block text-xs font-bold uppercase tracking-wide text-navy-500">{FIELD_LABELS[key] ?? key}</span>
                  <p className="mt-1 whitespace-pre-wrap text-sm text-navy-700">{value || '—'}</p>
                </div>
              ))}
            </div>

            <SectionTitle>Contact</SectionTitle>
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wide text-navy-500">Name</span>
                <p className="mt-1 text-sm text-navy-700">{active.contactName}</p>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wide text-navy-500">Email or Phone</span>
                <p className="mt-1 text-sm text-navy-700">{active.contactInfo}</p>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wide text-navy-500">Submitted</span>
                <p className="mt-1 text-sm text-navy-700">{formatDateTime(active.createdAt)}</p>
              </div>
            </div>

            {active.status === 'pending' ? (
              <div className="flex gap-3 border-t border-navy-100 pt-5">
                <button
                  type="button"
                  onClick={() => handleStatus(active.id, 'reviewed')}
                  className="flex-1 rounded-md bg-blue-500 py-2.5 text-sm font-bold text-white hover:bg-blue-600"
                >
                  Mark Reviewed
                </button>
                <button
                  type="button"
                  onClick={() => handleStatus(active.id, 'dismissed')}
                  className="flex-1 rounded-md border border-navy-200 py-2.5 text-sm font-bold text-navy-500 hover:bg-navy-50"
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <div className="border-t border-navy-100 pt-5">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${STATUS_STYLE[active.status]}`}>{active.status}</span>
              </div>
            )}
          </div>
        )}
      </Slideover>
    </div>
  )
}

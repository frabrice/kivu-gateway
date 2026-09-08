import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useData } from '../../data/store'
import type { Opportunity, OpportunityType } from '../../data/types'
import Slideover from './components/Slideover'
import { Field, inputClass } from './components/fields'
import { formatDate } from '../../components/shared/EventCard'

const CITIES = ['Goma', 'Gisenyi', 'Masisi'] as const
const TYPES: OpportunityType[] = ['Job', 'Tender']

const EMPTY: Omit<Opportunity, 'id'> = {
  title: '',
  org: '',
  type: 'Job',
  city: 'Goma',
  deadline: '',
  postedDate: new Date().toISOString().slice(0, 10),
  description: '',
  contact: '',
}

export default function AdminOpportunities() {
  useDocumentTitle('Manage Opportunities')
  const { opportunities, addOpportunity, updateOpportunity, deleteOpportunity } = useData()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY)

  function openAdd() {
    setEditingId(null)
    setForm(EMPTY)
    setOpen(true)
  }
  function openEdit(opportunity: Opportunity) {
    setEditingId(opportunity.id)
    const { id, ...rest } = opportunity
    void id
    setForm(rest)
    setOpen(true)
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (editingId) updateOpportunity(editingId, form)
    else addOpportunity(form)
    setOpen(false)
  }
  function handleDelete(id: string, title: string) {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) deleteOpportunity(id)
  }

  const sorted = [...opportunities].sort((a, b) => a.deadline.localeCompare(b.deadline))

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-700">Opportunities</h1>
          <p className="mt-1 text-sm text-navy-400">{opportunities.length} jobs & tenders</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-600"
        >
          <Plus size={16} /> Add Opportunity
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-navy-100 bg-navy-50 text-xs font-bold uppercase tracking-wide text-navy-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Deadline</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {sorted.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3 font-semibold text-navy-700">{o.title}</td>
                <td className="px-4 py-3 text-navy-500">{o.type}</td>
                <td className="px-4 py-3 text-navy-500">{o.city}</td>
                <td className="px-4 py-3 text-navy-500">{formatDate(o.deadline)}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => openEdit(o)} className="rounded p-1.5 text-navy-400 hover:bg-navy-50 hover:text-blue-600">
                    <Pencil size={15} />
                  </button>
                  <button type="button" onClick={() => handleDelete(o.id, o.title)} className="ml-1 rounded p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Slideover open={open} title={editingId ? 'Edit Opportunity' : 'Add Opportunity'} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Organization">
            <input required className={inputClass} value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Type">
              <select className={inputClass} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as OpportunityType })}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="City">
              <select className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value as Opportunity['city'] })}>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Posted Date">
              <input type="date" required className={inputClass} value={form.postedDate} onChange={(e) => setForm({ ...form, postedDate: e.target.value })} />
            </Field>
            <Field label="Deadline">
              <input type="date" required className={inputClass} value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
            </Field>
          </div>
          <Field label="Description">
            <textarea required rows={4} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Contact Email">
            <input required type="email" className={inputClass} value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} />
          </Field>
          <button type="submit" className="w-full rounded-md bg-blue-500 py-2.5 text-sm font-bold text-white hover:bg-blue-600">
            {editingId ? 'Save Changes' : 'Add Opportunity'}
          </button>
        </form>
      </Slideover>
    </div>
  )
}

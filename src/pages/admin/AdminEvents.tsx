import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useData } from '../../data/store'
import type { City, Event, EventCategory } from '../../data/types'
import Slideover from './components/Slideover'
import { Field, inputClass } from './components/fields'
import { formatDate } from '../../components/shared/EventCard'

const CITIES: City[] = ['Goma', 'Gisenyi']
const CATEGORIES: EventCategory[] = ['Business & Networking', 'Music & Entertainment', 'Community', 'Culture & Conservation']

const EMPTY: Omit<Event, 'id'> = {
  title: '',
  city: 'Goma',
  date: '',
  time: '',
  venue: '',
  category: 'Business & Networking',
  description: '',
  image: '',
}

export default function AdminEvents() {
  useDocumentTitle('Manage Events')
  const { events, addEvent, updateEvent, deleteEvent } = useData()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY)

  function openAdd() {
    setEditingId(null)
    setForm(EMPTY)
    setOpen(true)
  }
  function openEdit(event: Event) {
    setEditingId(event.id)
    const { id, ...rest } = event
    void id
    setForm(rest)
    setOpen(true)
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (editingId) updateEvent(editingId, form)
    else addEvent(form)
    setOpen(false)
  }
  function handleDelete(id: string, title: string) {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) deleteEvent(id)
  }

  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-700">Events</h1>
          <p className="mt-1 text-sm text-navy-400">{events.length} events</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-600"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-navy-100 bg-navy-50 text-xs font-bold uppercase tracking-wide text-navy-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {sorted.map((ev) => (
              <tr key={ev.id}>
                <td className="px-4 py-3 font-semibold text-navy-700">{ev.title}</td>
                <td className="px-4 py-3 text-navy-500">{ev.city}</td>
                <td className="px-4 py-3 text-navy-500">{formatDate(ev.date)}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => openEdit(ev)} className="rounded p-1.5 text-navy-400 hover:bg-navy-50 hover:text-blue-600">
                    <Pencil size={15} />
                  </button>
                  <button type="button" onClick={() => handleDelete(ev.id, ev.title)} className="ml-1 rounded p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Slideover open={open} title={editingId ? 'Edit Event' : 'Add Event'} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="City">
              <select className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value as City })}>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Category">
              <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as EventCategory })}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input type="date" required className={inputClass} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </Field>
            <Field label="Time">
              <input type="time" required className={inputClass} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </Field>
          </div>
          <Field label="Venue">
            <input required className={inputClass} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea required rows={4} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>
          <Field label="Image URL">
            <input required className={inputClass} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </Field>
          <button type="submit" className="w-full rounded-md bg-blue-500 py-2.5 text-sm font-bold text-white hover:bg-blue-600">
            {editingId ? 'Save Changes' : 'Add Event'}
          </button>
        </form>
      </Slideover>
    </div>
  )
}

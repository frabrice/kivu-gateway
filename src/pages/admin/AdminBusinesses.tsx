import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Star, Trash2 } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useData } from '../../data/store'
import type { Business, BusinessCategory, City } from '../../data/types'
import Slideover from './components/Slideover'
import { Field, Grid2, ImageListField, SectionTitle, inputClass } from './components/fields'

const CATEGORIES: BusinessCategory[] = [
  'Stay',
  'Food & Drink',
  'Professional Services',
  'Real Estate',
  'Retail & Shopping',
  'Transport & Logistics',
  'Tour Operators',
]
const CITIES: City[] = ['Goma', 'Gisenyi']

const EMPTY: Omit<Business, 'id'> = {
  name: '',
  category: 'Stay',
  city: 'Goma',
  tagline: '',
  description: '',
  images: [''],
  phone: '',
  whatsapp: '',
  email: '',
  website: '',
  hours: '',
  address: '',
  tier: 'free',
}

export default function AdminBusinesses() {
  useDocumentTitle('Manage Businesses')
  const { businesses, addBusiness, updateBusiness, deleteBusiness } = useData()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY)

  function openAdd() {
    setEditingId(null)
    setForm(EMPTY)
    setOpen(true)
  }
  function openEdit(business: Business) {
    setEditingId(business.id)
    const { id, ...rest } = business
    void id
    setForm(rest)
    setOpen(true)
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const payload = { ...form, images: form.images.filter((img) => img.trim() !== '') }
    if (payload.images.length === 0) payload.images = ['']
    if (editingId) updateBusiness(editingId, payload)
    else addBusiness(payload)
    setOpen(false)
  }
  function handleDelete(id: string, name: string) {
    if (confirm(`Delete "${name}"? This cannot be undone.`)) deleteBusiness(id)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-700">Businesses</h1>
          <p className="mt-1 text-sm text-navy-400">{businesses.length} listings</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-600"
        >
          <Plus size={16} /> Add Business
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-navy-100 bg-navy-50 text-xs font-bold uppercase tracking-wide text-navy-500">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Tier</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {businesses.map((b) => (
              <tr key={b.id}>
                <td className="px-4 py-3 font-semibold text-navy-700">{b.name}</td>
                <td className="px-4 py-3 text-navy-500">{b.category}</td>
                <td className="px-4 py-3 text-navy-500">{b.city}</td>
                <td className="px-4 py-3">
                  {b.tier === 'featured' ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-600">
                      <Star size={11} className="fill-blue-600" /> Featured
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-navy-400">Free</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => openEdit(b)} className="rounded p-1.5 text-navy-400 hover:bg-navy-50 hover:text-blue-600">
                    <Pencil size={15} />
                  </button>
                  <button type="button" onClick={() => handleDelete(b.id, b.name)} className="ml-1 rounded p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Slideover open={open} title={editingId ? 'Edit Business' : 'Add Business'} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <SectionTitle>Basic Info</SectionTitle>
          <Grid2>
            <Field label="Business Name">
              <input required className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Category">
              <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as BusinessCategory })}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
          </Grid2>
          <Field label="Tagline" hint="One short line shown on the directory card">
            <input required className={inputClass} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea required rows={4} className={inputClass} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </Field>

          <SectionTitle>Photos</SectionTitle>
          <ImageListField label="Photo URLs" images={form.images} onChange={(images) => setForm({ ...form, images })} />

          <SectionTitle>Location & Hours</SectionTitle>
          <Grid2>
            <Field label="City">
              <select className={inputClass} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value as City })}>
                {CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Hours (optional)" hint="e.g. Daily 08:00 – 20:00">
              <input className={inputClass} value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
            </Field>
          </Grid2>
          <Field label="Address">
            <input required className={inputClass} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </Field>

          <SectionTitle>Contact</SectionTitle>
          <Grid2>
            <Field label="Phone">
              <input required className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="WhatsApp Link (optional)">
              <input className={inputClass} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
            </Field>
            <Field label="Email (optional)">
              <input className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field label="Website (optional)">
              <input className={inputClass} value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            </Field>
          </Grid2>

          <SectionTitle>Visibility</SectionTitle>
          <Field label="Tier" hint="Featured listings show a badge and appear first">
            <select className={inputClass} value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value as Business['tier'] })}>
              <option value="free">Free</option>
              <option value="featured">Featured</option>
            </select>
          </Field>

          <button type="submit" className="w-full rounded-md bg-blue-500 py-2.5 text-sm font-bold text-white hover:bg-blue-600">
            {editingId ? 'Save Changes' : 'Add Business'}
          </button>
        </form>
      </Slideover>
    </div>
  )
}

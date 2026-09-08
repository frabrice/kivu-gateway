import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { useData } from '../../data/store'
import type { Article, ArticleCategory } from '../../data/types'
import Slideover from './components/Slideover'
import { Field, inputClass } from './components/fields'

const CATEGORIES: ArticleCategory[] = ['Food & Cafés', 'Stay & Hotels', 'Guides', 'Nature & Wildlife']

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const EMPTY: Omit<Article, 'id'> = {
  title: '',
  slug: '',
  category: 'Guides',
  coverImage: '',
  excerpt: '',
  body: '',
  author: 'Kivu Gateway Editorial',
  publishedDate: new Date().toISOString().slice(0, 10),
  published: true,
}

export default function AdminLifestyle() {
  useDocumentTitle('Manage Lifestyle')
  const { articles, addArticle, updateArticle, deleteArticle } = useData()
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(EMPTY)

  function openAdd() {
    setEditingId(null)
    setForm(EMPTY)
    setOpen(true)
  }
  function openEdit(article: Article) {
    setEditingId(article.id)
    const { id, ...rest } = article
    void id
    setForm(rest)
    setOpen(true)
  }
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const payload = { ...form, slug: form.slug || slugify(form.title) }
    if (editingId) updateArticle(editingId, payload)
    else addArticle(payload)
    setOpen(false)
  }
  function handleDelete(id: string, title: string) {
    if (confirm(`Delete "${title}"? This cannot be undone.`)) deleteArticle(id)
  }

  const sorted = [...articles].sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-700">Lifestyle</h1>
          <p className="mt-1 text-sm text-navy-400">{articles.length} articles</p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-blue-600"
        >
          <Plus size={16} /> Add Article
        </button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-navy-100 bg-white shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-navy-100 bg-navy-50 text-xs font-bold uppercase tracking-wide text-navy-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-100">
            {sorted.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3 font-semibold text-navy-700">{a.title}</td>
                <td className="px-4 py-3 text-navy-500">{a.category}</td>
                <td className="px-4 py-3">
                  {a.published ? (
                    <span className="text-xs font-bold text-blue-600">Published</span>
                  ) : (
                    <span className="text-xs font-semibold text-navy-400">Draft</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button type="button" onClick={() => openEdit(a)} className="rounded p-1.5 text-navy-400 hover:bg-navy-50 hover:text-blue-600">
                    <Pencil size={15} />
                  </button>
                  <button type="button" onClick={() => handleDelete(a.id, a.title)} className="ml-1 rounded p-1.5 text-navy-400 hover:bg-red-50 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Slideover open={open} title={editingId ? 'Edit Article' : 'Add Article'} onClose={() => setOpen(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Title">
            <input required className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Slug (auto if left blank)">
            <input className={inputClass} value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder={slugify(form.title)} />
          </Field>
          <Field label="Category">
            <select className={inputClass} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as ArticleCategory })}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Cover Image URL">
            <input required className={inputClass} value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
          </Field>
          <Field label="Excerpt">
            <textarea required rows={2} className={inputClass} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </Field>
          <Field label="Body">
            <textarea required rows={8} className={inputClass} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Author">
              <input required className={inputClass} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </Field>
            <Field label="Published Date">
              <input type="date" required className={inputClass} value={form.publishedDate} onChange={(e) => setForm({ ...form, publishedDate: e.target.value })} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-navy-600">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
              className="h-4 w-4 rounded border-navy-200 text-blue-600 focus:ring-blue-500"
            />
            Published (visible on the site)
          </label>
          <button type="submit" className="w-full rounded-md bg-blue-500 py-2.5 text-sm font-bold text-white hover:bg-blue-600">
            {editingId ? 'Save Changes' : 'Add Article'}
          </button>
        </form>
      </Slideover>
    </div>
  )
}

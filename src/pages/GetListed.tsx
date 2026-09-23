import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Briefcase, CalendarDays, CheckCircle2, Newspaper, Store } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import WhatsAppButton from '../components/layout/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'
import type { ArticleCategory, BusinessCategory, City } from '../data/types'

type ListingType = 'business' | 'job' | 'event' | 'article'

const TYPE_OPTIONS: { id: ListingType; icon: typeof Store; title: string; description: string }[] = [
  { id: 'business', icon: Store, title: 'Feature My Business', description: 'Get listed in the directory' },
  { id: 'job', icon: Briefcase, title: 'Post a Job or Tender', description: 'Reach the region' },
  { id: 'event', icon: CalendarDays, title: 'Submit an Event', description: 'Goma or Gisenyi' },
  { id: 'article', icon: Newspaper, title: 'Pitch an Insight Story', description: 'Guides, cafés, hotels' },
]

const inputClass = 'mt-1.5 w-full rounded-md border border-navy-100 px-4 py-2.5 text-sm outline-none focus:border-blue-500'

const BUSINESS_CATEGORIES: BusinessCategory[] = [
  'Stay',
  'Food & Drink',
  'Professional Services',
  'Real Estate',
  'Retail & Shopping',
  'Transport & Logistics',
  'Tour Operators',
]
const ARTICLE_CATEGORIES: ArticleCategory[] = ['Food & Cafés', 'Stay & Hotels', 'Guides', 'Nature & Wildlife']
const CITIES: City[] = ['Goma', 'Gisenyi']

const CONFIRMATION_COPY: Record<ListingType, string> = {
  business: 'a listing in our Business Directory',
  job: 'your job or tender',
  event: 'your event',
  article: 'your story pitch',
}

const FIELDS_BY_TYPE: Record<ListingType, string[]> = {
  business: ['businessName', 'category', 'city', 'about'],
  job: ['jobTitle', 'organization', 'type', 'deadline', 'description'],
  event: ['eventTitle', 'city', 'date', 'time', 'venue', 'description'],
  article: ['title', 'category', 'pitch'],
}

function isListingType(value: string | null): value is ListingType {
  return value === 'business' || value === 'job' || value === 'event' || value === 'article'
}

export default function GetListed() {
  useDocumentTitle('Get Listed', 'List your business, post a job or tender, submit an event, or pitch an Insights story on Kivu Gateway.')
  const { addSubmission } = useData()
  const [searchParams] = useSearchParams()
  const initialType = searchParams.get('type')
  const [type, setType] = useState<ListingType>(isListingType(initialType) ? initialType : 'business')
  const [fields, setFields] = useState<Record<string, string>>({})
  const [contactName, setContactName] = useState('')
  const [contactInfo, setContactInfo] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleFieldChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const payload: Record<string, string> = {}
    for (const key of FIELDS_BY_TYPE[type]) {
      payload[key] = fields[key] ?? ''
    }
    setSubmitting(true)
    try {
      await addSubmission(type, payload, contactName, contactInfo)
      setSubmitted(true)
    } catch {
      setError('Something went wrong submitting this — please try again or reach us on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        title="Get Listed"
        subtitle="Tell us what you want to share — a business, a job or tender, an event, or a story — and we'll take it from there."
        image="https://images.unsplash.com/photo-1573164574397-dd250bc8a598?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {submitted ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-navy-100 bg-white p-12 text-center shadow-card">
            <CheckCircle2 size={40} className="text-blue-600" />
            <h2 className="mt-4 font-heading text-xl font-bold text-navy-700">Thanks — we've got it</h2>
            <p className="mt-2 max-w-sm text-sm text-navy-400">
              Your request for {CONFIRMATION_COPY[type]} has been sent to our team for review. We'll follow up with you directly
              — in the meantime, feel free to reach us on WhatsApp or email.
            </p>
            <div className="mt-6">
              <WhatsAppButton className="!border-navy-200 !text-navy-700 hover:!bg-navy-50" />
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {TYPE_OPTIONS.map((option) => {
                const isActive = option.id === type
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setType(option.id)}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition ${
                      isActive ? 'border-blue-500 bg-blue-50' : 'border-navy-100 bg-white hover:border-blue-200'
                    }`}
                  >
                    <span className={`flex h-11 w-11 items-center justify-center rounded-full ${isActive ? 'bg-blue-500' : 'bg-navy-50'}`}>
                      <option.icon size={20} className={isActive ? 'text-white' : 'text-blue-600'} />
                    </span>
                    <span className="text-xs font-bold text-navy-700 sm:text-sm">{option.title}</span>
                    <span className="hidden text-[11px] text-navy-400 sm:block">{option.description}</span>
                  </button>
                )
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
              {type === 'business' && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Business Name</span>
                      <input name="businessName" required className={inputClass} value={fields.businessName ?? ''} onChange={handleFieldChange} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Category</span>
                      <select name="category" required className={inputClass} value={fields.category ?? ''} onChange={handleFieldChange}>
                        <option value="" disabled>Select a category</option>
                        {BUSINESS_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">City</span>
                    <select name="city" required className={inputClass} value={fields.city ?? ''} onChange={handleFieldChange}>
                      <option value="" disabled>Select a city</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Tell us about the business</span>
                    <textarea
                      name="about"
                      required
                      rows={4}
                      placeholder="What you offer, and anything that makes it stand out"
                      className={inputClass}
                      value={fields.about ?? ''}
                      onChange={handleFieldChange}
                    />
                  </label>
                </>
              )}

              {type === 'job' && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Job or Tender Title</span>
                      <input name="jobTitle" required className={inputClass} value={fields.jobTitle ?? ''} onChange={handleFieldChange} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Organization</span>
                      <input name="organization" required className={inputClass} value={fields.organization ?? ''} onChange={handleFieldChange} />
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Type</span>
                      <select name="type" required className={inputClass} value={fields.type ?? ''} onChange={handleFieldChange}>
                        <option value="" disabled>Select type</option>
                        <option value="Job">Job</option>
                        <option value="Tender">Tender</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Application Deadline</span>
                      <input name="deadline" required type="date" className={inputClass} value={fields.deadline ?? ''} onChange={handleFieldChange} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Description</span>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      placeholder="Role, requirements, how to apply"
                      className={inputClass}
                      value={fields.description ?? ''}
                      onChange={handleFieldChange}
                    />
                  </label>
                </>
              )}

              {type === 'event' && (
                <>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Event Title</span>
                    <input name="eventTitle" required className={inputClass} value={fields.eventTitle ?? ''} onChange={handleFieldChange} />
                  </label>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">City</span>
                      <select name="city" required className={inputClass} value={fields.city ?? ''} onChange={handleFieldChange}>
                        <option value="" disabled>Select</option>
                        {CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Date</span>
                      <input name="date" required type="date" className={inputClass} value={fields.date ?? ''} onChange={handleFieldChange} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Time</span>
                      <input name="time" required type="time" className={inputClass} value={fields.time ?? ''} onChange={handleFieldChange} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Venue</span>
                    <input name="venue" required className={inputClass} value={fields.venue ?? ''} onChange={handleFieldChange} />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Description</span>
                    <textarea name="description" required rows={4} className={inputClass} value={fields.description ?? ''} onChange={handleFieldChange} />
                  </label>
                </>
              )}

              {type === 'article' && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Proposed Title</span>
                      <input name="title" required className={inputClass} value={fields.title ?? ''} onChange={handleFieldChange} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Category</span>
                      <select name="category" required className={inputClass} value={fields.category ?? ''} onChange={handleFieldChange}>
                        <option value="" disabled>Select a category</option>
                        {ARTICLE_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Your Pitch</span>
                    <textarea
                      name="pitch"
                      required
                      rows={4}
                      placeholder="What's the story, and why should we cover it?"
                      className={inputClass}
                      value={fields.pitch ?? ''}
                      onChange={handleFieldChange}
                    />
                  </label>
                </>
              )}

              <div className="grid gap-5 border-t border-navy-100 pt-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Your Name</span>
                  <input required className={inputClass} value={contactName} onChange={(e) => setContactName(e.target.value)} />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Your Email or Phone</span>
                  <input required className={inputClass} value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
                </label>
              </div>

              {error && <p className="text-xs font-semibold text-red-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-md bg-blue-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-blue-600 disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </button>
            </form>
          </>
        )}
      </section>
    </>
  )
}

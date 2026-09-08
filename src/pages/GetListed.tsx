import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Briefcase, CalendarDays, CheckCircle2, Newspaper, Store } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import WhatsAppButton from '../components/layout/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import type { ArticleCategory, BusinessCategory, City } from '../data/types'

type ListingType = 'business' | 'job' | 'event' | 'article'

const TYPE_OPTIONS: { id: ListingType; icon: typeof Store; title: string; description: string }[] = [
  { id: 'business', icon: Store, title: 'Feature My Business', description: 'Get listed in the directory' },
  { id: 'job', icon: Briefcase, title: 'Post a Job or Tender', description: 'Reach the region' },
  { id: 'event', icon: CalendarDays, title: 'Submit an Event', description: 'Goma or Gisenyi' },
  { id: 'article', icon: Newspaper, title: 'Pitch a Lifestyle Story', description: 'Cafés, hotels, guides' },
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

function isListingType(value: string | null): value is ListingType {
  return value === 'business' || value === 'job' || value === 'event' || value === 'article'
}

export default function GetListed() {
  useDocumentTitle('Get Listed', 'List your business, post a job or tender, submit an event, or pitch a Lifestyle story on Kivu Gateway.')
  const [searchParams] = useSearchParams()
  const initialType = searchParams.get('type')
  const [type, setType] = useState<ListingType>(isListingType(initialType) ? initialType : 'business')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
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
              This is a demo submission form. Once our review process is connected, requests for {CONFIRMATION_COPY[type]} will
              reach our team directly — in the meantime, reach us on WhatsApp or email and we'll follow up personally.
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
                      <input required className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Category</span>
                      <select required className={inputClass} defaultValue="">
                        <option value="" disabled>Select a category</option>
                        {BUSINESS_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">City</span>
                    <select required className={inputClass} defaultValue="">
                      <option value="" disabled>Select a city</option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Tell us about the business</span>
                    <textarea required rows={4} placeholder="What you offer, and anything that makes it stand out" className={inputClass} />
                  </label>
                </>
              )}

              {type === 'job' && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Job or Tender Title</span>
                      <input required className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Organization</span>
                      <input required className={inputClass} />
                    </label>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Type</span>
                      <select required className={inputClass} defaultValue="">
                        <option value="" disabled>Select type</option>
                        <option value="Job">Job</option>
                        <option value="Tender">Tender</option>
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Application Deadline</span>
                      <input required type="date" className={inputClass} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Description</span>
                    <textarea required rows={4} placeholder="Role, requirements, how to apply" className={inputClass} />
                  </label>
                </>
              )}

              {type === 'event' && (
                <>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Event Title</span>
                    <input required className={inputClass} />
                  </label>
                  <div className="grid gap-5 sm:grid-cols-3">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">City</span>
                      <select required className={inputClass} defaultValue="">
                        <option value="" disabled>Select</option>
                        {CITIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Date</span>
                      <input required type="date" className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Time</span>
                      <input required type="time" className={inputClass} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Venue</span>
                    <input required className={inputClass} />
                  </label>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Description</span>
                    <textarea required rows={4} className={inputClass} />
                  </label>
                </>
              )}

              {type === 'article' && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Proposed Title</span>
                      <input required className={inputClass} />
                    </label>
                    <label className="block">
                      <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Category</span>
                      <select required className={inputClass} defaultValue="">
                        <option value="" disabled>Select a category</option>
                        {ARTICLE_CATEGORIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Your Pitch</span>
                    <textarea required rows={4} placeholder="What's the story, and why should we cover it?" className={inputClass} />
                  </label>
                </>
              )}

              <div className="grid gap-5 border-t border-navy-100 pt-5 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Your Name</span>
                  <input required className={inputClass} />
                </label>
                <label className="block">
                  <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Your Email or Phone</span>
                  <input required className={inputClass} />
                </label>
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-md bg-blue-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </section>
    </>
  )
}

import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Globe, Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useData } from '../data/store'

export default function BusinessDetail() {
  const { id } = useParams()
  const { businesses } = useData()
  const business = businesses.find((b) => b.id === id)

  useDocumentTitle(business ? business.name : 'Business Not Found', business?.tagline)

  if (!business) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-heading text-2xl font-bold text-navy-700">Business not found</h1>
        <p className="mt-2 text-sm text-navy-400">This listing may have been removed.</p>
        <Link to="/business/directory" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600">
          <ArrowLeft size={15} /> Back to Directory
        </Link>
      </div>
    )
  }

  const [cover, ...gallery] = business.images

  return (
    <>
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <img src={cover} alt={business.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <Link to="/business/directory" className="mb-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white">
            <ArrowLeft size={14} /> Back to Directory
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            {business.tier === 'featured' && (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-500 px-2.5 py-1 text-[11px] font-bold text-white">
                <Star size={11} className="fill-white" /> Featured
              </span>
            )}
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">{business.category}</span>
          </div>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl">{business.name}</h1>
          <p className="mt-1 text-sm text-navy-100 sm:text-base">{business.tagline}</p>
        </div>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-lg font-bold text-navy-700">About</h2>
            <p className="mt-3 text-sm leading-relaxed text-navy-500 sm:text-base">{business.description}</p>

            {gallery.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((src) => (
                  <img key={src} src={src} alt={business.name} loading="lazy" decoding="async" className="h-28 w-full rounded-lg object-cover sm:h-32" />
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-card">
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-navy-500">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-blue-600" />
                <span className="text-navy-600">{business.address}</span>
              </li>
              {business.hours && (
                <li className="flex items-start gap-2.5">
                  <Clock size={16} className="mt-0.5 shrink-0 text-blue-600" />
                  <span className="text-navy-600">{business.hours}</span>
                </li>
              )}
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-blue-600" />
                <a href={`tel:${business.phone.replace(/\s/g, '')}`} className="text-navy-600 hover:text-blue-600">
                  {business.phone}
                </a>
              </li>
              {business.whatsapp && (
                <li className="flex items-center gap-2.5">
                  <MessageCircle size={16} className="shrink-0 text-blue-600" />
                  <a href={business.whatsapp} target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-blue-600">
                    Chat on WhatsApp
                  </a>
                </li>
              )}
              {business.email && (
                <li className="flex items-center gap-2.5">
                  <Mail size={16} className="shrink-0 text-blue-600" />
                  <a href={`mailto:${business.email}`} className="text-navy-600 hover:text-blue-600">
                    {business.email}
                  </a>
                </li>
              )}
              {business.website && (
                <li className="flex items-center gap-2.5">
                  <Globe size={16} className="shrink-0 text-blue-600" />
                  <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-navy-600 hover:text-blue-600">
                    {business.website.replace(/^https?:\/\//, '')}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

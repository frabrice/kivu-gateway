import { useState, type FormEvent } from 'react'
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import WhatsAppButton from '../components/layout/WhatsAppButton'
import SectionHeading from '../components/shared/SectionHeading'
import { CONTACT } from '../data/site'

const TOPICS = ['Business Connections', 'Trade & Sourcing', 'Property', 'Hospitality', 'Market Access', 'Tourism', 'Other']

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="Tell us what you're looking for and our team will get back to you within one business day."
        image="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading align="left" eyebrow="Get In Touch" title="We'd love to hear from you" />

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-600">
                  <Phone size={17} className="text-gold-500" />
                </span>
                <div>
                  <div className="text-sm font-bold text-navy-700">Call Us</div>
                  <a href={CONTACT.phoneHref} className="text-sm text-navy-500 hover:text-gold-600">{CONTACT.phoneDisplay}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-600">
                  <MessageCircle size={17} className="text-gold-500" />
                </span>
                <div>
                  <div className="text-sm font-bold text-navy-700">WhatsApp</div>
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-sm text-navy-500 hover:text-gold-600">
                    Chat with our team
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-600">
                  <Mail size={17} className="text-gold-500" />
                </span>
                <div>
                  <div className="text-sm font-bold text-navy-700">Email</div>
                  <a href={`mailto:${CONTACT.email}`} className="text-sm text-navy-500 hover:text-gold-600">{CONTACT.email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-600">
                  <MapPin size={17} className="text-gold-500" />
                </span>
                <div>
                  <div className="text-sm font-bold text-navy-700">Office</div>
                  <div className="text-sm text-navy-500">{CONTACT.address}</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-600">
                  <Clock size={17} className="text-gold-500" />
                </span>
                <div>
                  <div className="text-sm font-bold text-navy-700">Office Hours</div>
                  <div className="text-sm text-navy-500">{CONTACT.hours}</div>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex h-48 w-full items-center justify-center rounded-xl border border-dashed border-navy-100 bg-navy-50 text-center text-sm text-navy-400">
              <div>
                <MapPin size={24} className="mx-auto mb-2 text-navy-400" />
                Map placeholder — embed Google Maps here
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-card sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <CheckCircle2 size={40} className="text-gold-600" />
                  <h3 className="mt-4 font-heading text-lg font-bold text-navy-700">Thanks — message ready</h3>
                  <p className="mt-2 max-w-sm text-sm text-navy-400">
                    This is a demo form. Once your inbox/CRM is connected, submissions like this will reach your
                    team directly — in the meantime, reach us on WhatsApp or email.
                  </p>
                  <div className="mt-6">
                    <WhatsAppButton className="!text-navy-700 !border-navy-200 hover:!bg-navy-50" />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wide text-navy-500">Full Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        className="mt-1.5 w-full rounded-md border border-navy-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wide text-navy-500">Email</label>
                      <input
                        required
                        type="email"
                        placeholder="you@example.com"
                        className="mt-1.5 w-full rounded-md border border-navy-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-navy-500">I'm interested in</label>
                    <select
                      required
                      defaultValue=""
                      className="mt-1.5 w-full rounded-md border border-navy-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
                    >
                      <option value="" disabled>Select a topic</option>
                      {TOPICS.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wide text-navy-500">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us a bit about what you're looking for..."
                      className="mt-1.5 w-full rounded-md border border-navy-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-gold-500 px-7 py-3 text-sm font-bold uppercase tracking-wide text-navy-800 transition hover:bg-gold-400"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

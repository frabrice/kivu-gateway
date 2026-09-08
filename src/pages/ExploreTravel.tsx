import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock, IdCard, MapPin, Wallet } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/shared/SectionHeading'
import CTABand from '../components/shared/CTABand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const DOCUMENTS = [
  'Valid passport (required for all non-EAC/non-Congolese travelers)',
  'Visa or day-pass for DR Congo, if required for your nationality — confirm before travel, rules change often',
  'Yellow fever vaccination card, sometimes checked at the crossing',
  'A small amount of cash (USD or Congolese francs) for the day pass fee and local transport',
]

const STEPS = [
  { title: 'Arrive at Grande Barrière', detail: 'The main Gisenyi–Goma crossing, a short walk or moto ride from central Gisenyi.' },
  { title: 'Rwandan exit formalities', detail: 'Show your passport at the Rwandan side; this is usually the quicker of the two steps.' },
  { title: 'DRC entry formalities', detail: 'Present your passport/visa/day-pass on the Congolese side. Have small cash ready for any applicable fee.' },
  { title: "You're in Goma", detail: 'From the border it is a short walk or taxi ride into central Goma.' },
]

const TIPS = [
  'Cross in the morning if you can — queues build up by midday and again on Friday afternoons.',
  'Agree on exchange rates with money changers at the border before handing over cash.',
  'Keep your passport accessible — you may be asked to show it more than once on each side.',
  'If you\'re crossing for business regularly, a few businesses in our directory offer border facilitation and can walk you through it the first time.',
]

export default function ExploreTravel() {
  useDocumentTitle('Gisenyi ⇄ Goma Border Guide', 'What you need to cross the Gisenyi–Goma border: documents, the step-by-step process, timing and practical tips.')

  return (
    <>
      <PageHero
        title="Gisenyi ⇄ Goma Border Guide"
        subtitle="What to bring, what to expect, and how long it actually takes to cross at the Grande Barrière."
        image="https://images.unsplash.com/photo-1675793049324-32d4932eafff?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <IdCard size={22} className="text-blue-600" />
            </span>
            <SectionHeading align="left" eyebrow="Before You Go" title="What you'll need" />
            <ul className="mt-5 space-y-3">
              {DOCUMENTS.map((doc) => (
                <li key={doc} className="flex items-start gap-2.5 text-sm text-navy-500">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-blue-600" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <Clock size={22} className="text-blue-600" />
            </span>
            <SectionHeading align="left" eyebrow="Timing" title="What to expect" />
            <div className="mt-5 space-y-3 text-sm text-navy-500">
              <p>
                A typical crossing takes <strong className="text-navy-700">20–60 minutes</strong> depending on the time of day.
                Mornings and Friday afternoons are the busiest.
              </p>
              <p>
                Day passes for Goma are available at the border for many nationalities, but fees and rules change —
                confirm the current requirements the same week you travel rather than relying on older information.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading eyebrow="The Process" title="Crossing step by step" />
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <div key={step.title} className="rounded-xl border border-navy-100 bg-white p-5 shadow-card">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-heading text-sm font-bold text-navy-700">{step.title}</h3>
                <p className="mt-1.5 text-xs text-navy-400">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-navy-50 p-8">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-blue-600">
            <Wallet size={16} /> Tips From Regular Crossers
          </div>
          <ul className="mt-4 space-y-2.5">
            {TIPS.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 text-sm text-navy-500">
                <MapPin size={15} className="mt-0.5 shrink-0 text-blue-600" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Where To Stay"
            title="Staying on either side of the border?"
            description="Our directory lists hotels, guesthouses and apartments in both Gisenyi and Goma — filter by Stay to see what's available."
          />
          <Link
            to="/business/directory?category=Stay"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-blue-500 px-7 py-3 text-sm font-bold text-white transition hover:bg-blue-600"
          >
            Browse Places to Stay <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTABand
        title="Need help with a first crossing?"
        description="Tell us your travel dates and we'll point you to the right local contacts."
      />
    </>
  )
}

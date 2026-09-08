import { Compass, Handshake, ShieldCheck, Target, Users2 } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/shared/SectionHeading'
import CTABand from '../components/shared/CTABand'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { STATS } from '../data/site'

const VALUES = [
  { icon: Handshake, title: 'Trust', description: 'Every business we list and every guide we publish is checked — we put our name behind it.' },
  { icon: Compass, title: 'Local Knowledge', description: 'We live and work between Goma and Gisenyi — we know the market, not just the map.' },
  { icon: Target, title: 'Results', description: 'We measure success by businesses launched, borders crossed and opportunities filled — not activity.' },
  { icon: ShieldCheck, title: 'Integrity', description: 'Clear information, honest guides, and no false promises — even when it costs us a listing.' },
]

const TEAM = [
  { name: 'Team Lead', role: 'Business & Directory' },
  { name: 'Team Lead', role: 'Explore & Travel' },
  { name: 'Team Lead', role: 'Events & Opportunities' },
  { name: 'Team Lead', role: 'Journal & Content' },
]

export default function About() {
  useDocumentTitle('About Us', 'Kivu Gateway is the connection point between people, businesses and opportunities in Goma and Gisenyi.')

  return (
    <>
      <PageHero
        title="About Kivu Gateway"
        subtitle="We are the connection point between people, businesses and opportunities in Goma and Gisenyi."
        image="https://images.unsplash.com/photo-1514548383638-cef9251a73ec?auto=format&fit=crop&w=1400&q=45"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1675793049324-32d4932eafff?auto=format&fit=crop&w=1000&q=55"
            alt="Lake Kivu shoreline between Gisenyi and Goma"
            className="h-72 w-full rounded-2xl object-cover shadow-card sm:h-96"
            loading="lazy"
            decoding="async"
          />
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Built between Gisenyi and Goma"
              description="Kivu Gateway was founded to close a simple gap: Gisenyi and Goma share a border, a lake and huge day-to-day movement of people and business between them, but too few trusted local resources — for someone starting a business, crossing the border, exploring the region, or looking for a job. We built Kivu Gateway to be that resource — one place for business, travel, tourism, events and opportunity across both cities."
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-navy-50 p-8">
            <Target size={26} className="text-blue-600" />
            <h3 className="mt-3 font-heading text-lg font-bold text-navy-700">Our Mission</h3>
            <p className="mt-2 text-sm text-navy-500">
              To connect people, businesses and opportunities across Goma and Gisenyi — making it easier to start a
              business, cross the border, find a trusted business, and stay informed on what's happening.
            </p>
          </div>
          <div className="rounded-2xl bg-navy-50 p-8">
            <Compass size={26} className="text-blue-600" />
            <h3 className="mt-3 font-heading text-lg font-bold text-navy-700">Our Vision</h3>
            <p className="mt-2 text-sm text-navy-500">
              To be the first name that comes to mind for business, travel and local information across Goma,
              Gisenyi and North Kivu.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy-800 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What Drives Us" title="Our Values" light />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <div key={value.title} className="rounded-xl border border-white/10 p-6">
                <value.icon size={24} className="text-blue-500" />
                <h3 className="mt-3 font-heading text-base font-bold">{value.title}</h3>
                <p className="mt-2 text-sm text-navy-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Reach" title="The numbers so far" />
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-navy-100 p-6 text-center shadow-card">
              <div className="font-heading text-2xl font-bold text-navy-600">{stat.value}</div>
              <div className="mt-1 text-xs text-navy-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="The Team" title="Local experts, ready to connect you" />
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {TEAM.map((member) => (
              <div key={member.role} className="rounded-xl bg-white p-6 text-center shadow-card">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-navy-600">
                  <Users2 size={26} className="text-blue-500" />
                </span>
                <div className="mt-3 text-sm font-bold text-navy-700">{member.name}</div>
                <div className="mt-0.5 text-xs text-navy-400">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Let's build something across Goma and Gisenyi"
        description="Whatever brings you to the region, we'd love to hear from you."
      />
    </>
  )
}

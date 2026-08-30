import { Compass, Handshake, ShieldCheck, Target, Users2 } from 'lucide-react'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/shared/SectionHeading'
import CTABand from '../components/shared/CTABand'
import { STATS } from '../data/site'

const VALUES = [
  { icon: Handshake, title: 'Trust', description: 'Every partner we introduce is vetted — we put our name behind every connection.' },
  { icon: Compass, title: 'Local Knowledge', description: 'We live and work across Rwanda and Eastern DRC — we know the market, not just the map.' },
  { icon: Target, title: 'Results', description: "We measure success by deals closed, launches landed and trips well spent — not activity." },
  { icon: ShieldCheck, title: 'Integrity', description: 'Clear terms, honest advice, and no false promises — even when it costs us the deal.' },
]

const TEAM = [
  { name: 'Team Lead', role: 'Business & Partnerships' },
  { name: 'Team Lead', role: 'Trade & Sourcing' },
  { name: 'Team Lead', role: 'Property & Hospitality' },
  { name: 'Team Lead', role: 'Tourism & Experiences' },
]

export default function About() {
  return (
    <>
      <PageHero
        title="About Kivu Gateway"
        subtitle="We are the connection point between people, businesses and opportunities across the Great Lakes region."
        image="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
            alt="Kigali skyline"
            className="h-72 w-full rounded-2xl object-cover shadow-card sm:h-96"
          />
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Built on the shores of Lake Kivu"
              description="Kivu Gateway was founded to close a simple gap: Rwanda and Eastern DRC share a border, a lake and huge economic potential, but too few trusted channels connecting the people, businesses, properties and travelers who want to engage with the region. We built Kivu Gateway to be that channel — one trusted point of entry for business, trade, property, hospitality and tourism across the Great Lakes."
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl bg-navy-50 p-8">
            <Target size={26} className="text-gold-600" />
            <h3 className="mt-3 font-heading text-lg font-bold text-navy-700">Our Mission</h3>
            <p className="mt-2 text-sm text-navy-500">
              To connect people, businesses and opportunities across Rwanda and Eastern DRC — making it easier to
              trade, invest, launch, stay and explore in the Great Lakes region.
            </p>
          </div>
          <div className="rounded-2xl bg-navy-50 p-8">
            <Compass size={26} className="text-gold-600" />
            <h3 className="mt-3 font-heading text-lg font-bold text-navy-700">Our Vision</h3>
            <p className="mt-2 text-sm text-navy-500">
              To be the Great Lakes region's most trusted gateway — the first name that comes to mind for business,
              property, hospitality and travel across Rwanda and Eastern DRC.
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
                <value.icon size={24} className="text-gold-500" />
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
                  <Users2 size={26} className="text-gold-500" />
                </span>
                <div className="mt-3 text-sm font-bold text-navy-700">{member.name}</div>
                <div className="mt-0.5 text-xs text-navy-400">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Let's build something across the Great Lakes"
        description="Whatever brings you to the region, we'd love to hear from you."
      />
    </>
  )
}

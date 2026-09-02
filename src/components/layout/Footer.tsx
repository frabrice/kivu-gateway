import { Link } from 'react-router-dom'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Logo from './Logo'
import { CONTACT, NAV_ITEMS, STATS } from '../../data/site'

export default function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          <div>
            <h3 className="font-heading text-lg font-bold text-blue-500">Your Next Opportunity Starts Here</h3>
            <p className="mt-3 max-w-xs text-sm text-navy-100">
              Whether you want to do business, source products, find property, launch a product, book a stay or
              explore the Great Lakes — Kivu Gateway is here to connect you.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600"
            >
              Let's Connect →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 lg:col-span-2 lg:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="border-l-2 border-blue-500/60 pl-3">
                <div className="font-heading text-2xl font-bold text-blue-500">{stat.value}</div>
                <div className="mt-1 text-xs text-navy-100">{stat.label}</div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Get In Touch</h4>
            <ul className="mt-3 space-y-2 text-sm text-navy-100">
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-blue-500" />
                <a href={CONTACT.phoneHref} className="hover:text-blue-400">{CONTACT.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle size={15} className="text-blue-500" />
                <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  Chat on WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-blue-500" />
                <a href={`mailto:${CONTACT.email}`} className="hover:text-blue-400">{CONTACT.email}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-blue-500" />
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
          <Logo variant="light" />
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <Link key={item.to} to={item.to} className="text-xs font-semibold uppercase tracking-wide text-navy-100 hover:text-blue-400">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-white/10 pt-6 text-center text-xs text-navy-100">
          © {new Date().getFullYear()} Kivu Gateway. All rights reserved. · Connecting Rwanda &amp; Eastern DRC.
        </div>
      </div>
    </footer>
  )
}

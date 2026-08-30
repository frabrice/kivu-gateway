import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { NAV_ITEMS } from '../../data/site'

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header className="sticky top-0 z-50 bg-navy-600 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? 'text-gold-500' : 'text-white/85 hover:text-gold-400'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden shrink-0 items-center rounded-md bg-gold-500 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-navy-800 transition hover:bg-gold-400 lg:inline-flex"
        >
          Get In Touch →
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-navy-600 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-sm font-semibold uppercase tracking-wide ${
                    isActive ? 'bg-navy-500 text-gold-500' : 'text-white/85'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-2 inline-flex items-center justify-center rounded-md bg-gold-500 px-5 py-3 text-sm font-bold uppercase tracking-wide text-navy-800"
            >
              Get In Touch →
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

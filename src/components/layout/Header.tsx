import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { NAV_ITEMS } from '../../data/site'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  // Over the Home hero the bar floats transparent; everywhere else (and once scrolled) it is solid.
  const overlay = isHome && !scrolled && !open

  useEffect(() => {
    setOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = (isActive: boolean) =>
    `relative text-sm font-semibold transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-blue-500 after:transition-transform after:duration-300 ${
      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
    } ${
      overlay
        ? isActive
          ? 'text-white'
          : 'text-white/80 hover:text-white'
        : isActive
          ? 'text-blue-600'
          : 'text-navy-600 hover:text-blue-600'
    }`

  return (
    <header
      className={`${isHome ? 'fixed inset-x-0' : 'sticky'} top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        overlay
          ? 'border-transparent bg-transparent'
          : 'border-navy-100 bg-white/95 shadow-sm backdrop-blur-md'
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-900/70 to-transparent transition-opacity duration-300 ${
          overlay ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo variant={overlay ? 'light' : 'dark'} />

        <nav className="hidden items-center gap-7 xl:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => linkClass(isActive)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/get-listed"
          className="group relative hidden shrink-0 items-center overflow-hidden rounded-full bg-blue-500 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600 xl:inline-flex"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-1/4 animate-sheen bg-white/25 blur-md"
          />
          <span className="relative">I Want To Enter Kivu →</span>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center justify-center rounded-md p-2 transition-colors xl:hidden ${
            overlay ? 'text-white' : 'text-navy-700'
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="relative border-t border-navy-100 bg-white xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2.5 text-sm font-semibold ${isActive ? 'bg-blue-50 text-blue-600' : 'text-navy-600'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/get-listed"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-500 px-5 py-3 text-sm font-bold text-white"
            >
              I Want To Enter Kivu →
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

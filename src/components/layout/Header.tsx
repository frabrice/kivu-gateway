import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'
import Logo from './Logo'
import { NAV_ITEMS, type NavItem } from '../../data/site'

function isDropdown(item: NavItem): item is Extract<NavItem, { children: unknown[] }> {
  return 'children' in item
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null)
  const location = useLocation()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setOpen(false)
    setOpenDropdown(null)
    setOpenMobileGroup(null)
  }, [location])

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-6 xl:flex">
          {NAV_ITEMS.map((item) =>
            isDropdown(item) ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => {
                  cancelClose()
                  setOpenDropdown(item.label)
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={() => setOpenDropdown((v) => (v === item.label ? null : item.label))}
                  className="flex items-center gap-1 text-sm font-semibold text-navy-600 transition-colors hover:text-blue-600"
                >
                  {item.label}
                  <ChevronDown size={15} className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                </button>

                {openDropdown === item.label && (
                  <div className="absolute left-0 top-full w-64 pt-3">
                    <div className="rounded-xl border border-navy-100 bg-white p-2 shadow-card">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block rounded-lg px-3 py-2.5 text-sm hover:bg-blue-50"
                        >
                          <span className="block font-semibold text-navy-700">{child.label}</span>
                          {child.description && <span className="mt-0.5 block text-xs text-navy-400">{child.description}</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors ${
                    isActive ? 'text-blue-600' : 'text-navy-600 hover:text-blue-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <Link
          to="/get-listed"
          className="hidden shrink-0 items-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600 xl:inline-flex"
        >
          I Want To Enter Kivu →
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-700 xl:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy-100 bg-white xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_ITEMS.map((item) =>
              isDropdown(item) ? (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => setOpenMobileGroup((v) => (v === item.label ? null : item.label))}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold text-navy-600"
                  >
                    {item.label}
                    <ChevronDown size={15} className={`transition-transform ${openMobileGroup === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  {openMobileGroup === item.label && (
                    <div className="ml-3 flex flex-col gap-1 border-l border-navy-100 pl-3">
                      {item.children.map((child) => (
                        <Link key={child.to} to={child.to} className="rounded-md px-3 py-2 text-sm text-navy-500">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2.5 text-sm font-semibold ${
                      isActive ? 'bg-blue-50 text-blue-600' : 'text-navy-600'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <Link
              to="/get-listed"
              className="mt-2 inline-flex items-center justify-center rounded-md bg-blue-500 px-5 py-3 text-sm font-bold text-white"
            >
              I Want To Enter Kivu →
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

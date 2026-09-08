import { Link, NavLink, Outlet } from 'react-router-dom'
import { Briefcase, CalendarDays, LayoutDashboard, LogOut, Newspaper, Store, ExternalLink } from 'lucide-react'

const LINKS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/businesses', label: 'Businesses', icon: Store, end: false },
  { to: '/admin/events', label: 'Events', icon: CalendarDays, end: false },
  { to: '/admin/opportunities', label: 'Opportunities', icon: Briefcase, end: false },
  { to: '/admin/journal', label: 'Journal', icon: Newspaper, end: false },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-navy-50">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-100 bg-white lg:flex">
        <div className="border-b border-navy-100 px-6 py-5">
          <span className="font-heading text-lg font-bold text-navy-700">
            Kivu <span className="text-blue-600">Gateway</span>
          </span>
          <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-wide text-navy-400">Admin Dashboard</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold transition ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-navy-500 hover:bg-navy-50'
                }`
              }
            >
              <link.icon size={17} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-navy-100 p-3">
          <Link to="/" className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold text-navy-500 hover:bg-navy-50">
            <ExternalLink size={17} /> View Site
          </Link>
          <Link to="/admin/login" className="flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold text-navy-500 hover:bg-navy-50">
            <LogOut size={17} /> Sign Out
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <header className="flex items-center justify-between border-b border-navy-100 bg-white px-4 py-3 lg:hidden">
          <span className="font-heading text-base font-bold text-navy-700">
            Kivu <span className="text-blue-600">Gateway</span> Admin
          </span>
          <Link to="/" className="text-xs font-semibold text-blue-600">
            View Site
          </Link>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-navy-100 bg-white px-3 py-2 lg:hidden">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `shrink-0 rounded-md px-3 py-1.5 text-xs font-semibold ${isActive ? 'bg-blue-50 text-blue-600' : 'text-navy-500'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

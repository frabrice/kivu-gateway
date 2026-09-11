import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import {
  Briefcase,
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  Inbox,
  LayoutDashboard,
  LogOut,
  Newspaper,
  Store,
  ExternalLink,
} from 'lucide-react'
import { supabase } from '../../lib/supabase'

const SIDEBAR_COLLAPSED_KEY = 'kivu-admin-sidebar-collapsed'

const LINKS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/businesses', label: 'Businesses', icon: Store, end: false },
  { to: '/admin/events', label: 'Events', icon: CalendarDays, end: false },
  { to: '/admin/jobs', label: 'Jobs', icon: Briefcase, end: false },
  { to: '/admin/lifestyle', label: 'Lifestyle', icon: Newspaper, end: false },
  { to: '/admin/submissions', label: 'Submissions', icon: Inbox, end: false },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const [session, setSession] = useState<Session | null | undefined>(undefined)
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === 'true'
    } catch {
      return false
    }
  })

  function toggleCollapsed() {
    setCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next))
      } catch {
        // ignore storage errors (e.g. private browsing)
      }
      return next
    })
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session === null) navigate('/admin/login', { replace: true })
  }, [session, navigate])

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  if (session === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-50">
        <span className="text-sm font-semibold text-navy-400">Loading…</span>
      </div>
    )
  }

  if (session === null) return null

  return (
    <div className="flex min-h-screen bg-navy-50">
      <aside
        className={`relative hidden shrink-0 flex-col border-r border-navy-100 bg-white transition-all duration-200 lg:flex ${
          collapsed ? 'w-[76px]' : 'w-64'
        }`}
      >
        <div className={`border-b border-navy-100 px-6 py-5 ${collapsed ? 'px-4' : ''}`}>
          {collapsed ? (
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 font-heading text-sm font-bold text-white">
              KG
            </span>
          ) : (
            <>
              <span className="font-heading text-lg font-bold text-navy-700">
                Kivu <span className="text-blue-600">Gateway</span>
              </span>
              <span className="mt-0.5 block text-[11px] font-semibold uppercase tracking-wide text-navy-400">Admin Dashboard</span>
            </>
          )}
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              title={collapsed ? link.label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold transition ${collapsed ? 'justify-center' : ''} ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-navy-500 hover:bg-navy-50'
                }`
              }
            >
              <link.icon size={17} />
              {!collapsed && link.label}
            </NavLink>
          ))}
        </nav>
        <div className="space-y-1 border-t border-navy-100 p-3">
          <Link
            to="/"
            title={collapsed ? 'View Site' : undefined}
            className={`flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-semibold text-navy-500 hover:bg-navy-50 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <ExternalLink size={17} /> {!collapsed && 'View Site'}
          </Link>
          <button
            onClick={handleSignOut}
            title={collapsed ? 'Sign Out' : undefined}
            className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left text-sm font-semibold text-navy-500 hover:bg-navy-50 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={17} /> {!collapsed && 'Sign Out'}
          </button>
        </div>
        <button
          type="button"
          onClick={toggleCollapsed}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-400 shadow-card hover:text-blue-600"
        >
          {collapsed ? <ChevronsRight size={13} /> : <ChevronsLeft size={13} />}
        </button>
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

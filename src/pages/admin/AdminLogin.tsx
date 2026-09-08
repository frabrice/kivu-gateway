import { type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockKeyhole } from 'lucide-react'
import { inputClass } from './components/fields'

export default function AdminLogin() {
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-navy-100 bg-white p-8 shadow-card">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
          <LockKeyhole size={22} className="text-blue-600" />
        </span>
        <h1 className="mt-4 text-center font-heading text-lg font-bold text-navy-700">Kivu Gateway Admin</h1>
        <p className="mt-1 text-center text-xs text-navy-400">Demo sign-in — no account needed this phase.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Email</span>
            <input type="email" placeholder="you@kivugateway.com" className={inputClass} />
          </label>
          <label className="block">
            <span className="text-xs font-bold uppercase tracking-wide text-navy-500">Password</span>
            <input type="password" placeholder="••••••••" className={inputClass} />
          </label>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

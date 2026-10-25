import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main key={pathname} className="flex-1 animate-page-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

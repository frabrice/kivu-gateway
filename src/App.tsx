import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollManager from './components/shared/ScrollManager'
import Home from './pages/Home'
import Services from './pages/Services'
import MarketAccess from './pages/MarketAccess'
import Tourism from './pages/Tourism'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="market-access" element={<MarketAccess />} />
          <Route path="tourism" element={<Tourism />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  )
}

import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ScrollManager from './components/shared/ScrollManager'
import Home from './pages/Home'
import Explore from './pages/Explore'
import ExploreTravel from './pages/ExploreTravel'
import Business from './pages/Business'
import BusinessStart from './pages/BusinessStart'
import BusinessDirectory from './pages/BusinessDirectory'
import BusinessDetail from './pages/BusinessDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Jobs from './pages/Jobs'
import JobDetail from './pages/JobDetail'
import Lifestyle from './pages/Lifestyle'
import LifestyleDetail from './pages/LifestyleDetail'
import GetListed from './pages/GetListed'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminOverview from './pages/admin/AdminOverview'
import AdminBusinesses from './pages/admin/AdminBusinesses'
import AdminEvents from './pages/admin/AdminEvents'
import AdminJobs from './pages/admin/AdminJobs'
import AdminLifestyle from './pages/admin/AdminLifestyle'

export default function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="explore/travel" element={<ExploreTravel />} />
          <Route path="business" element={<Business />} />
          <Route path="business/start" element={<BusinessStart />} />
          <Route path="business/directory" element={<BusinessDirectory />} />
          <Route path="business/directory/:id" element={<BusinessDetail />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="lifestyle" element={<Lifestyle />} />
          <Route path="lifestyle/:slug" element={<LifestyleDetail />} />
          <Route path="get-listed" element={<GetListed />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="businesses" element={<AdminBusinesses />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="lifestyle" element={<AdminLifestyle />} />
        </Route>
      </Routes>
    </>
  )
}

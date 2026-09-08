export type NavLink = { label: string; to: string; description?: string }
export type NavItem = NavLink | { label: string; children: NavLink[] }

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Explore',
    children: [
      { label: 'Destinations', to: '/explore', description: 'Goma, Masisi & Virunga' },
      { label: 'Travel & Border Guide', to: '/explore/travel', description: 'Crossing Gisenyi ⇄ Goma' },
    ],
  },
  {
    label: 'Business',
    children: [
      { label: 'Start a Business', to: '/business/start', description: 'Setup guide for Goma' },
      { label: 'Directory', to: '/business/directory', description: 'Find a business' },
    ],
  },
  { label: 'Events', to: '/events' },
  { label: 'Jobs', to: '/jobs' },
  { label: 'Lifestyle', to: '/lifestyle' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const CONTACT = {
  phoneDisplay: '+250 783 171 000',
  phoneHref: 'tel:+250783171000',
  whatsappHref: 'https://wa.me/250783171000',
  email: 'kivugateway@gmail.com',
  address: 'KG 7 Ave, Nyarutarama, Kigali, Rwanda',
  hours: 'Mon – Fri: 8:00 – 18:00 · Sat: 9:00 – 13:00 (CAT)',
}

export const STATS = [
  { value: '2', label: 'Cities Covered — Goma & Gisenyi' },
  { value: '10+', label: 'Businesses Listed in Our Directory' },
  { value: '5+', label: 'Upcoming Events & Opportunities' },
  { value: '1 Goal', label: 'To Connect, Inform and Create Value' },
]

export type Pillar = {
  id: 'explore' | 'start-business' | 'directory' | 'events' | 'opportunities' | 'journal'
  title: string
  short: string
  to: string
}

export const PILLARS: Pillar[] = [
  {
    id: 'explore',
    title: 'Explore the Region',
    short: 'Goma, Masisi and Virunga — plus the Gisenyi–Goma border guide.',
    to: '/explore',
  },
  {
    id: 'start-business',
    title: 'Start a Business',
    short: 'Everything you need to set up and register in Goma.',
    to: '/business/start',
  },
  {
    id: 'directory',
    title: 'Business Directory',
    short: 'Find trusted hotels, restaurants, services and more.',
    to: '/business/directory',
  },
  {
    id: 'events',
    title: 'Events',
    short: "What's happening in Goma and Gisenyi, and when.",
    to: '/events',
  },
  {
    id: 'opportunities',
    title: 'Jobs',
    short: 'Jobs and tenders from local companies and NGOs.',
    to: '/jobs',
  },
  {
    id: 'journal',
    title: 'Lifestyle',
    short: 'Lifestyle guides — best cafés, hotels and local tips.',
    to: '/lifestyle',
  },
]

export type Destination = {
  id: string
  name: string
  tags: string
  image: string
  description: string
  activities: string[]
}

export const DESTINATIONS: Destination[] = [
  {
    id: 'goma',
    name: 'Goma',
    tags: 'Business · Culture · Lake Kivu',
    image: 'https://images.unsplash.com/photo-1589715718565-223fdf9b7cd4?auto=format&fit=crop&w=1200&q=55',
    description:
      'A major Eastern DRC commercial hub on the shores of Lake Kivu, blending business opportunity with vibrant Congolese culture, markets and music — just across the border from Gisenyi.',
    activities: ['Business networking', 'Local markets', 'Lakeside dining', 'Live music'],
  },
  {
    id: 'masisi',
    name: 'Masisi',
    tags: 'Highlands · Farming Communities · Nature',
    image: 'https://images.unsplash.com/photo-1630509866948-7ebf55e1685f?auto=format&fit=crop&w=1200&q=55',
    description:
      'A highland territory of terraced hills and farming communities west of Goma — a quieter, greener side of North Kivu for those wanting to see rural life in the region.',
    activities: ['Highland scenery', 'Community visits', 'Farming country', 'Cooler climate'],
  },
  {
    id: 'virunga',
    name: 'Virunga National Park',
    tags: 'Gorilla Trekking · Volcanoes · Wildlife',
    image: 'https://images.unsplash.com/photo-1509897739002-791fa79aac9b?auto=format&fit=crop&w=1200&q=50',
    description:
      "Africa's oldest national park and one of the last places on Earth to trek mountain gorillas in the wild, set against the Virunga volcanic range north of Goma.",
    activities: ['Gorilla trekking', 'Volcano views', 'Ranger-led tours', 'Rainforest wildlife'],
  },
]

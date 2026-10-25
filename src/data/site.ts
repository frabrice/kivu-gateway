import { IMG } from './images'

export type NavLink = { label: string; to: string; description?: string }
export type NavItem = NavLink | { label: string; children: NavLink[] }

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Do Business', to: '/business' },
  { label: 'Enter the Market', to: '/enter-the-market' },
  { label: 'Invest & Source', to: '/invest-source' },
  { label: 'Connect', to: '/connect' },
  { label: 'Insights', to: '/insights' },
  { label: 'About', to: '/about' },
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
  id: 'explore' | 'do-business' | 'enter-market' | 'invest-source' | 'connect' | 'insights'
  title: string
  short: string
  to: string
  image: string
}

export const PILLARS: Pillar[] = [
  {
    id: 'explore',
    title: 'Explore Kivu',
    short: 'Destinations, hotels, restaurants, events and lifestyle across Goma & Gisenyi.',
    to: '/explore',
    image: IMG.lakeAerialPortrait,
  },
  {
    id: 'do-business',
    title: 'Do Business',
    short: 'Find trusted local businesses, professional services, properties and suppliers.',
    to: '/business',
    image: IMG.roundaboutMoto,
  },
  {
    id: 'enter-market',
    title: 'Enter the Market',
    short: 'Market research, product launch, distribution and local partnerships.',
    to: '/enter-the-market',
    image: IMG.drinksDistribution,
  },
  {
    id: 'invest-source',
    title: 'Invest & Source',
    short: 'Investment opportunities, local products, suppliers and projects.',
    to: '/invest-source',
    image: IMG.marketGrainSellers,
  },
  {
    id: 'connect',
    title: 'Connect',
    short: 'Business matchmaking with companies, NGOs, experts and investors.',
    to: '/connect',
    image: IMG.intersectionTraffic,
  },
  {
    id: 'insights',
    title: 'Insights',
    short: 'Guides and intelligence for doing business and living in Goma & Gisenyi.',
    to: '/insights',
    image: IMG.lakeTownBay,
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
    image: IMG.lakeAerialPortrait,
    description:
      'A major Eastern DRC commercial hub on the shores of Lake Kivu, blending business opportunity with vibrant Congolese culture, markets and music — just across the border from Gisenyi.',
    activities: ['Business networking', 'Local markets', 'Lakeside dining', 'Live music'],
  },
  {
    id: 'masisi',
    name: 'Masisi',
    tags: 'Highlands · Farming Communities · Nature',
    image: IMG.waterCarriers,
    description:
      'A highland territory of terraced hills and farming communities west of Goma — a quieter, greener side of North Kivu for those wanting to see rural life in the region.',
    activities: ['Highland scenery', 'Community visits', 'Farming country', 'Cooler climate'],
  },
  {
    id: 'virunga',
    name: 'Virunga National Park',
    tags: 'Gorilla Trekking · Volcanoes · Wildlife',
    image: IMG.gomaVolcano,
    description:
      "Africa's oldest national park and one of the last places on Earth to trek mountain gorillas in the wild, set against the Virunga volcanic range north of Goma.",
    activities: ['Gorilla trekking', 'Volcano views', 'Ranger-led tours', 'Rainforest wildlife'],
  },
]

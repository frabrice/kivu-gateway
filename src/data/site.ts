export const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Market Access', to: '/market-access' },
  { label: 'Tourism', to: '/tourism' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export const CONTACT = {
  phoneDisplay: '+250 789 000 000',
  phoneHref: 'tel:+250789000000',
  whatsappHref: 'https://wa.me/250789000000',
  email: 'hello@kivugateway.com',
  address: 'KG 7 Ave, Nyarutarama, Kigali, Rwanda',
  hours: 'Mon – Fri: 8:00 – 18:00 · Sat: 9:00 – 13:00 (CAT)',
}

export const STATS = [
  { value: '500+', label: 'Business Partners & Connections' },
  { value: '200+', label: 'Properties & Hospitality Partners' },
  { value: '100+', label: 'Tourism Experiences Curated' },
  { value: '1 Goal', label: 'To Connect, Activate and Create Value' },
]

export type Pillar = {
  id: 'business' | 'trade' | 'property' | 'hospitality' | 'tourism'
  title: string
  short: string
  to: string
  image: string
}

export const PILLARS: Pillar[] = [
  {
    id: 'business',
    title: 'Business Connections',
    short: 'We connect entrepreneurs, investors and companies with trusted local partners and opportunities.',
    to: '/services#business',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=55',
  },
  {
    id: 'trade',
    title: 'Trade & Sourcing',
    short: 'Connecting buyers, suppliers and businesses across Rwanda and Eastern DRC.',
    to: '/services#trade',
    image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1000&q=42',
  },
  {
    id: 'property',
    title: 'Real Estate & Property',
    short: 'Property sourcing, sales, rentals and professional property management.',
    to: '/services#property',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=55',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    short: 'Quality accommodation, dining and hospitality services for visitors, businesses and property owners.',
    to: '/services#hospitality',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=55',
  },
  {
    id: 'tourism',
    title: 'Tourism & Experiences',
    short: 'Discover the Great Lakes through nature, culture, adventure and authentic local experiences.',
    to: '/tourism',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=55',
  },
]

export const MARKET_ACCESS_SERVICES = [
  {
    id: 'product-launch',
    title: 'Product Launch',
    tagline: 'Introduce. Activate. Grow.',
    description:
      'We take new products into the Great Lakes market — from retail activation and sampling campaigns to distributor introductions — so your launch lands with the right audience from day one.',
    steps: ['Market & audience research', 'Retail & distributor matchmaking', 'Activation campaign', 'Performance review'],
  },
  {
    id: 'property-launch',
    title: 'Property Launch',
    tagline: 'Promote. Connect. Lease or Sell.',
    description:
      'We market new developments, listings and units to qualified buyers, tenants and investors across our network, handling promotion, viewings coordination and lead qualification.',
    steps: ['Listing & positioning', 'Marketing across our channels', 'Buyer/tenant qualification', 'Viewings & handover support'],
  },
  {
    id: 'hotel-business-launch',
    title: 'Hotel & Business Launch',
    tagline: 'Attract. Engage. Succeed.',
    description:
      'From new hotels to restaurants and service businesses, we build the local visibility, partnerships and early customer base a launch needs to succeed in a new market.',
    steps: ['Local market positioning', 'Partnership & referral network', 'Launch promotion', 'Guest/customer feedback loop'],
  },
  {
    id: 'market-entry',
    title: 'Market Entry & Representation',
    tagline: 'Research. Connect. Represent.',
    description:
      'For companies entering Rwanda or Eastern DRC for the first time, we act as your local eyes, ears and representative — research, introductions, and ongoing on-the-ground support.',
    steps: ['Market entry research', 'Regulatory & partner introductions', 'Local representation', 'Ongoing account support'],
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
    id: 'rubavu-gisenyi',
    name: 'Rubavu / Gisenyi',
    tags: 'Lake Kivu · Beaches · Restaurants · Hotels',
    image: 'https://images.unsplash.com/photo-1675793049324-32d4932eafff?auto=format&fit=crop&w=1000&q=55',
    description:
      'Rwanda’s lakeside resort town on the shores of Lake Kivu, known for its beaches, waterfront restaurants and relaxed border-town energy with Goma just across the water.',
    activities: ['Lake Kivu beaches', 'Waterfront dining', 'Boat trips', 'Border-town culture'],
  },
  {
    id: 'goma',
    name: 'Goma',
    tags: 'Business · Culture · Lake Kivu Life',
    image: 'https://images.unsplash.com/photo-1483450388369-9ed95738483c?auto=format&fit=crop&w=1000&q=55',
    description:
      'A major Eastern DRC commercial hub on Lake Kivu, blending business opportunity with vibrant Congolese culture, music and markets.',
    activities: ['Business networking', 'Local markets', 'Music & nightlife', 'Lakeside views'],
  },
  {
    id: 'musanze',
    name: 'Musanze',
    tags: 'Volcanoes · Nature · Adventure · Hospitality',
    image: 'https://images.unsplash.com/photo-1547970810-dc1eac37d174?auto=format&fit=crop&w=1000&q=55',
    description:
      'Gateway to the Virunga volcanoes, Musanze is Rwanda’s adventure capital — gorilla trekking, volcano hikes and a fast-growing hospitality scene.',
    activities: ['Gorilla trekking', 'Volcano hikes', 'Cave exploration', 'Lodges & hospitality'],
  },
  {
    id: 'karongi',
    name: 'Karongi',
    tags: 'Relaxation · Water Activities',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=55',
    description:
      'A quieter stretch of Lake Kivu known for calm bays, island boat trips and relaxed lakeside stays — popular for retreats and weekend getaways.',
    activities: ['Kayaking', 'Island boat trips', 'Lakeside retreats', 'Swimming'],
  },
  {
    id: 'gishwati',
    name: 'Gishwati',
    tags: 'Nature · Hiking · Wildlife',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=42',
    description:
      'Part of the Gishwati-Mukura rainforest landscape, offering guided forest hikes, chimpanzee tracking and community-based tourism.',
    activities: ['Forest hiking', 'Chimpanzee tracking', 'Birdwatching', 'Community tourism'],
  },
  {
    id: 'nyungwe',
    name: 'Nyungwe',
    tags: 'Forest · Primates · Adventure',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=55',
    description:
      'One of Africa’s oldest rainforests, home to chimpanzees and colobus monkeys, a canopy walkway, and waterfall trails through misty highland forest.',
    activities: ['Canopy walk', 'Primate tracking', 'Waterfall trails', 'Tea plantation tours'],
  },
]

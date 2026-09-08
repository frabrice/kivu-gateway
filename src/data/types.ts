export type City = 'Goma' | 'Gisenyi'

export type BusinessCategory =
  | 'Stay'
  | 'Food & Drink'
  | 'Professional Services'
  | 'Real Estate'
  | 'Retail & Shopping'
  | 'Transport & Logistics'
  | 'Tour Operators'

export type Business = {
  id: string
  name: string
  category: BusinessCategory
  city: City
  tagline: string
  description: string
  image: string
  phone: string
  whatsapp?: string
  email?: string
  address: string
  tier: 'free' | 'featured'
}

export type EventCategory = 'Business & Networking' | 'Music & Entertainment' | 'Community' | 'Culture & Conservation'

export type Event = {
  id: string
  title: string
  city: City
  date: string // ISO yyyy-mm-dd
  time: string
  venue: string
  category: EventCategory
  description: string
  image: string
}

export type OpportunityType = 'Job' | 'Tender'

export type Opportunity = {
  id: string
  title: string
  org: string
  type: OpportunityType
  city: City | 'Masisi'
  deadline: string // ISO yyyy-mm-dd
  postedDate: string // ISO yyyy-mm-dd
  description: string
  contact: string
}

export type ArticleCategory = 'Food & Cafés' | 'Stay & Hotels' | 'Guides' | 'Nature & Wildlife'

export type Article = {
  id: string
  title: string
  slug: string
  category: ArticleCategory
  coverImage: string
  excerpt: string
  body: string
  author: string
  publishedDate: string // ISO yyyy-mm-dd
  published: boolean
}

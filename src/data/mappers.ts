// Converts between Supabase's snake_case rows and this app's camelCase models.
import type { Article, Business, Event, Opportunity, Submission } from './types'

export function businessFromRow(row: any): Business {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    city: row.city,
    tagline: row.tagline,
    description: row.description,
    images: row.images ?? [],
    phone: row.phone,
    whatsapp: row.whatsapp ?? undefined,
    email: row.email ?? undefined,
    website: row.website ?? undefined,
    hours: row.hours ?? undefined,
    address: row.address,
    tier: row.tier,
  }
}

export function businessToRow(b: Omit<Business, 'id'>) {
  return {
    name: b.name,
    category: b.category,
    city: b.city,
    tagline: b.tagline,
    description: b.description,
    images: b.images,
    phone: b.phone,
    whatsapp: b.whatsapp || null,
    email: b.email || null,
    website: b.website || null,
    hours: b.hours || null,
    address: b.address,
    tier: b.tier,
  }
}

export function eventFromRow(row: any): Event {
  return {
    id: row.id,
    title: row.title,
    city: row.city,
    date: row.date,
    time: row.time,
    venue: row.venue,
    category: row.category,
    organizer: row.organizer ?? undefined,
    priceInfo: row.price_info ?? undefined,
    description: row.description,
    image: row.image,
  }
}

export function eventToRow(e: Omit<Event, 'id'>) {
  return {
    title: e.title,
    city: e.city,
    date: e.date,
    time: e.time,
    venue: e.venue,
    category: e.category,
    organizer: e.organizer || null,
    price_info: e.priceInfo || null,
    description: e.description,
    image: e.image,
  }
}

export function opportunityFromRow(row: any): Opportunity {
  return {
    id: row.id,
    title: row.title,
    org: row.org,
    type: row.type,
    employmentType: row.employment_type ?? undefined,
    city: row.city,
    deadline: row.deadline,
    postedDate: row.posted_date,
    compensation: row.compensation ?? undefined,
    description: row.description,
    contact: row.contact,
    applyLink: row.apply_link ?? undefined,
  }
}

export function opportunityToRow(o: Omit<Opportunity, 'id'>) {
  return {
    title: o.title,
    org: o.org,
    type: o.type,
    employment_type: o.employmentType || null,
    city: o.city,
    deadline: o.deadline,
    posted_date: o.postedDate,
    compensation: o.compensation || null,
    description: o.description,
    contact: o.contact,
    apply_link: o.applyLink || null,
  }
}

export function articleFromRow(row: any): Article {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category,
    coverImage: row.cover_image,
    excerpt: row.excerpt,
    body: row.body,
    author: row.author,
    publishedDate: row.published_date,
    published: row.published,
  }
}

export function articleToRow(a: Omit<Article, 'id'>) {
  return {
    title: a.title,
    slug: a.slug,
    category: a.category,
    cover_image: a.coverImage,
    excerpt: a.excerpt,
    body: a.body,
    author: a.author,
    published_date: a.publishedDate,
    published: a.published,
  }
}

export function submissionFromRow(row: any): Submission {
  return {
    id: row.id,
    type: row.type,
    payload: row.payload,
    contactName: row.contact_name,
    contactInfo: row.contact_info,
    status: row.status,
    createdAt: row.created_at,
  }
}

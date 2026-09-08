import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Article, Business, Event, Opportunity } from './types'
import { INITIAL_BUSINESSES } from './mock/businesses'
import { INITIAL_EVENTS } from './mock/events'
import { INITIAL_OPPORTUNITIES } from './mock/opportunities'
import { INITIAL_ARTICLES } from './mock/articles'

function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

type DataContextValue = {
  businesses: Business[]
  events: Event[]
  opportunities: Opportunity[]
  articles: Article[]
  addBusiness: (b: Omit<Business, 'id'>) => void
  updateBusiness: (id: string, b: Omit<Business, 'id'>) => void
  deleteBusiness: (id: string) => void
  addEvent: (e: Omit<Event, 'id'>) => void
  updateEvent: (id: string, e: Omit<Event, 'id'>) => void
  deleteEvent: (id: string) => void
  addOpportunity: (o: Omit<Opportunity, 'id'>) => void
  updateOpportunity: (id: string, o: Omit<Opportunity, 'id'>) => void
  deleteOpportunity: (id: string) => void
  addArticle: (a: Omit<Article, 'id'>) => void
  updateArticle: (id: string, a: Omit<Article, 'id'>) => void
  deleteArticle: (id: string) => void
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES)
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS)
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES)
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES)

  const addBusiness = useCallback((b: Omit<Business, 'id'>) => {
    setBusinesses((prev) => [{ ...b, id: makeId('biz') }, ...prev])
  }, [])
  const updateBusiness = useCallback((id: string, b: Omit<Business, 'id'>) => {
    setBusinesses((prev) => prev.map((item) => (item.id === id ? { ...b, id } : item)))
  }, [])
  const deleteBusiness = useCallback((id: string) => {
    setBusinesses((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addEvent = useCallback((e: Omit<Event, 'id'>) => {
    setEvents((prev) => [{ ...e, id: makeId('evt') }, ...prev])
  }, [])
  const updateEvent = useCallback((id: string, e: Omit<Event, 'id'>) => {
    setEvents((prev) => prev.map((item) => (item.id === id ? { ...e, id } : item)))
  }, [])
  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addOpportunity = useCallback((o: Omit<Opportunity, 'id'>) => {
    setOpportunities((prev) => [{ ...o, id: makeId('opp') }, ...prev])
  }, [])
  const updateOpportunity = useCallback((id: string, o: Omit<Opportunity, 'id'>) => {
    setOpportunities((prev) => prev.map((item) => (item.id === id ? { ...o, id } : item)))
  }, [])
  const deleteOpportunity = useCallback((id: string) => {
    setOpportunities((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addArticle = useCallback((a: Omit<Article, 'id'>) => {
    setArticles((prev) => [{ ...a, id: makeId('art') }, ...prev])
  }, [])
  const updateArticle = useCallback((id: string, a: Omit<Article, 'id'>) => {
    setArticles((prev) => prev.map((item) => (item.id === id ? { ...a, id } : item)))
  }, [])
  const deleteArticle = useCallback((id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      businesses,
      events,
      opportunities,
      articles,
      addBusiness,
      updateBusiness,
      deleteBusiness,
      addEvent,
      updateEvent,
      deleteEvent,
      addOpportunity,
      updateOpportunity,
      deleteOpportunity,
      addArticle,
      updateArticle,
      deleteArticle,
    }),
    [
      businesses,
      events,
      opportunities,
      articles,
      addBusiness,
      updateBusiness,
      deleteBusiness,
      addEvent,
      updateEvent,
      deleteEvent,
      addOpportunity,
      updateOpportunity,
      deleteOpportunity,
      addArticle,
      updateArticle,
      deleteArticle,
    ],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within a DataProvider')
  return ctx
}

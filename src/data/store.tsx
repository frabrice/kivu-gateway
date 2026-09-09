import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import type { Article, Business, Event, Opportunity, Submission, SubmissionStatus, SubmissionType } from './types'
import {
  articleFromRow,
  articleToRow,
  businessFromRow,
  businessToRow,
  eventFromRow,
  eventToRow,
  opportunityFromRow,
  opportunityToRow,
  submissionFromRow,
} from './mappers'

type DataContextValue = {
  loading: boolean
  businesses: Business[]
  events: Event[]
  opportunities: Opportunity[]
  articles: Article[]
  submissions: Submission[]
  addBusiness: (b: Omit<Business, 'id'>) => Promise<void>
  updateBusiness: (id: string, b: Omit<Business, 'id'>) => Promise<void>
  deleteBusiness: (id: string) => Promise<void>
  addEvent: (e: Omit<Event, 'id'>) => Promise<void>
  updateEvent: (id: string, e: Omit<Event, 'id'>) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  addOpportunity: (o: Omit<Opportunity, 'id'>) => Promise<void>
  updateOpportunity: (id: string, o: Omit<Opportunity, 'id'>) => Promise<void>
  deleteOpportunity: (id: string) => Promise<void>
  addArticle: (a: Omit<Article, 'id'>) => Promise<void>
  updateArticle: (id: string, a: Omit<Article, 'id'>) => Promise<void>
  deleteArticle: (id: string) => Promise<void>
  addSubmission: (type: SubmissionType, payload: Record<string, string>, contactName: string, contactInfo: string) => Promise<void>
  updateSubmissionStatus: (id: string, status: SubmissionStatus) => Promise<void>
}

const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [articles, setArticles] = useState<Article[]>([])
  const [submissions, setSubmissions] = useState<Submission[]>([])

  useEffect(() => {
    let cancelled = false

    async function loadAll() {
      const [businessesRes, eventsRes, opportunitiesRes, articlesRes, submissionsRes] = await Promise.all([
        supabase.from('businesses').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('date', { ascending: true }),
        supabase.from('opportunities').select('*').order('deadline', { ascending: true }),
        supabase.from('articles').select('*').order('published_date', { ascending: false }),
        supabase.from('listing_submissions').select('*').order('created_at', { ascending: false }),
      ])

      if (cancelled) return

      if (businessesRes.error) console.error('Failed to load businesses:', businessesRes.error.message)
      if (eventsRes.error) console.error('Failed to load events:', eventsRes.error.message)
      if (opportunitiesRes.error) console.error('Failed to load opportunities:', opportunitiesRes.error.message)
      if (articlesRes.error) console.error('Failed to load articles:', articlesRes.error.message)
      if (submissionsRes.error) console.error('Failed to load submissions:', submissionsRes.error.message)

      setBusinesses((businessesRes.data ?? []).map(businessFromRow))
      setEvents((eventsRes.data ?? []).map(eventFromRow))
      setOpportunities((opportunitiesRes.data ?? []).map(opportunityFromRow))
      setArticles((articlesRes.data ?? []).map(articleFromRow))
      setSubmissions((submissionsRes.data ?? []).map(submissionFromRow))
      setLoading(false)
    }

    loadAll()
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      loadAll()
    })

    return () => {
      cancelled = true
      authListener.subscription.unsubscribe()
    }
  }, [])

  const addBusiness = useCallback(async (b: Omit<Business, 'id'>) => {
    const { data, error } = await supabase.from('businesses').insert(businessToRow(b)).select().single()
    if (error) throw new Error(error.message)
    setBusinesses((prev) => [businessFromRow(data), ...prev])
  }, [])
  const updateBusiness = useCallback(async (id: string, b: Omit<Business, 'id'>) => {
    const { data, error } = await supabase.from('businesses').update(businessToRow(b)).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    setBusinesses((prev) => prev.map((item) => (item.id === id ? businessFromRow(data) : item)))
  }, [])
  const deleteBusiness = useCallback(async (id: string) => {
    const { error } = await supabase.from('businesses').delete().eq('id', id)
    if (error) throw new Error(error.message)
    setBusinesses((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addEvent = useCallback(async (e: Omit<Event, 'id'>) => {
    const { data, error } = await supabase.from('events').insert(eventToRow(e)).select().single()
    if (error) throw new Error(error.message)
    setEvents((prev) => [eventFromRow(data), ...prev])
  }, [])
  const updateEvent = useCallback(async (id: string, e: Omit<Event, 'id'>) => {
    const { data, error } = await supabase.from('events').update(eventToRow(e)).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    setEvents((prev) => prev.map((item) => (item.id === id ? eventFromRow(data) : item)))
  }, [])
  const deleteEvent = useCallback(async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) throw new Error(error.message)
    setEvents((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addOpportunity = useCallback(async (o: Omit<Opportunity, 'id'>) => {
    const { data, error } = await supabase.from('opportunities').insert(opportunityToRow(o)).select().single()
    if (error) throw new Error(error.message)
    setOpportunities((prev) => [opportunityFromRow(data), ...prev])
  }, [])
  const updateOpportunity = useCallback(async (id: string, o: Omit<Opportunity, 'id'>) => {
    const { data, error } = await supabase.from('opportunities').update(opportunityToRow(o)).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    setOpportunities((prev) => prev.map((item) => (item.id === id ? opportunityFromRow(data) : item)))
  }, [])
  const deleteOpportunity = useCallback(async (id: string) => {
    const { error } = await supabase.from('opportunities').delete().eq('id', id)
    if (error) throw new Error(error.message)
    setOpportunities((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addArticle = useCallback(async (a: Omit<Article, 'id'>) => {
    const { data, error } = await supabase.from('articles').insert(articleToRow(a)).select().single()
    if (error) throw new Error(error.message)
    setArticles((prev) => [articleFromRow(data), ...prev])
  }, [])
  const updateArticle = useCallback(async (id: string, a: Omit<Article, 'id'>) => {
    const { data, error } = await supabase.from('articles').update(articleToRow(a)).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    setArticles((prev) => prev.map((item) => (item.id === id ? articleFromRow(data) : item)))
  }, [])
  const deleteArticle = useCallback(async (id: string) => {
    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) throw new Error(error.message)
    setArticles((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const addSubmission = useCallback(
    async (type: SubmissionType, payload: Record<string, string>, contactName: string, contactInfo: string) => {
      // No .select() here: anonymous submitters have insert-only access to this table
      // (no SELECT policy), and requesting the row back would hit Postgres's RLS check
      // for the RETURNING clause, which anon can't pass.
      const { error } = await supabase
        .from('listing_submissions')
        .insert({ type, payload, contact_name: contactName, contact_info: contactInfo })
      if (error) throw new Error(error.message)
    },
    [],
  )
  const updateSubmissionStatus = useCallback(async (id: string, status: SubmissionStatus) => {
    const { data, error } = await supabase.from('listing_submissions').update({ status }).eq('id', id).select().single()
    if (error) throw new Error(error.message)
    setSubmissions((prev) => prev.map((item) => (item.id === id ? submissionFromRow(data) : item)))
  }, [])

  const value = useMemo(
    () => ({
      loading,
      businesses,
      events,
      opportunities,
      articles,
      submissions,
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
      addSubmission,
      updateSubmissionStatus,
    }),
    [
      loading,
      businesses,
      events,
      opportunities,
      articles,
      submissions,
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
      addSubmission,
      updateSubmissionStatus,
    ],
  )

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within a DataProvider')
  return ctx
}

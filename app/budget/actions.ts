'use server'

import { createClient } from '@/lib/supabase/server';
import { categories } from './shared';

const validateInputs = (
  name: string,
  amount: number,
  date: string,
  category: string
) => {
  if (!name.trim()) return false
  if (!Number.isFinite(amount)) return false
  if (amount < 0) return false
  if (!date) return false
  if (!categories.some(({ name }) => name === category)) return false

  return true
}

export const grabTransactions = async () => {
  const supabase = await createClient()

  const { data: {user} } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('date')

  if (error) console.log(error.message)

  return data
}

export const grabTransactionsOnMonth = async (month: number, year: number) => {
  const supabase = await createClient()

  const { data: {user} } = await supabase.auth.getUser()
  if (!user) return

  const start = new Date(Date.UTC(year, month, 1)).toISOString().slice(0, 10)
  const end = new Date(Date.UTC(year, month + 1, 1)).toISOString().slice(0, 10)

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .gte('date', start)
    .lt('date', end)
    .order('date')

  if (error) console.log(error.message)

  return data
}

export const insertTransaction = async (
  name: string,
  amount: number,
  date: string,
  category: string,
  description: string
) => {

  if (!validateInputs(name, amount, date, category)) return

  const supabase = await createClient()
  const { data: {user} } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('transactions')
    .insert({
      name: name,
      amount: amount,
      date: date,
      category: category,
      description: description,
      user_id: user.id
    })

  if (error) console.log(error.message)
}

export const updateTransaction = async(
  name: string,
  amount: number,
  date: string,
  category: string,
  description: string,
  id: number
) => {

  if (!validateInputs(name, amount, date, category)) return

  const supabase = await createClient()
  const { data: {user} } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('transactions')
    .update({
      name,
      amount,
      date,
      category,
      description
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) console.log(error)
}

export const deleteTransaction = async (id: number) => {

  const supabase = await createClient()
  const { data: {user} } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) console.log(error.message)
}

type categoryStats = {
  category: string,
  total: number
}

export const getCategoryStats = async (month: number, year: number): Promise<categoryStats[] | undefined> => {
  const supabase = await createClient()

  month++

  const { data, error } = await supabase
    .rpc('get_category_totals', {
      month,
      year
    })

  if (error) {
    console.log(error.message)
    return
  }

  return data
}
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

export const insertTransaction = async (
  name: string,
  amount: number,
  date: string,
  category: string
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
      user_id: user.id
    })

  if (error) console.log(error.message)
}

export const updateTransaction = async(
  name: string,
  amount: number,
  date: string,
  category: string,
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
      category
    })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) console.log(error)
}
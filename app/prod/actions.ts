// File for db actions

'use server'
import { createClient } from '@/lib/supabase/server';
import { error } from 'console';

export async function grabActivitiesByDate(date: string) {

  const supabase = await createClient()
  const { data: {user} } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      activity_logs (
        seconds_spent
      )
    `)
    .eq('activity_logs.date', date)
    .eq('user_id', user.id)


  if (error) console.log(error.message)

  // compress the activity_logs to just seconds_spent
  const newData = data?.map(activity => {
    const log = activity.activity_logs[0]
    const secondsSpent = log?.seconds_spent ?? 0

    return {
      ...activity,
      seconds_spent: secondsSpent
    }
  })

  return newData
}

export async function addNewActiviy(activityName: string, color: string) {

  const supabase = await createClient()
  const { data: {user} } = await supabase.auth.getUser()
  if (!user) return

  activityName = activityName.trim()

  const { error } = await supabase
    .from('activities')
    .insert({
      name: activityName,
      color: color,
      user_id: user.id
    })

  if (error) console.log(error.message)
}

export async function deleteRow(activityKey: number) {

  const supabase = await createClient()
  
  const { data: {user} } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', activityKey)
    .eq('user_id', user.id)

  if (error) console.log(error.message)
}

export async function updateSeconds(activityKey: number, seconds: number, date: string) {

  const supabase = await createClient()

  const { data: {user}} = await supabase.auth.getUser()
  if (!user) return

  const { data: logs, error } = await supabase
    .from('activity_logs')
    .select('*')
    .eq('activity_id', activityKey)
    .eq('date', date)

  if (error) {
    console.log(error.message)
    return
  }

  if (logs.length > 0) {
    
    const { error } = await supabase
      .from('activity_logs')
      .update({seconds_spent: seconds})
      .eq('activity_id', activityKey)
      .eq('date', date)

    if (error) console.log(error)
  }

  else {
    const { error } = await supabase
      .from('activity_logs')
      .insert({
        activity_id: activityKey,
        date: date,
        seconds_spent: seconds
      })

    if (error) console.log(error)
  }
}
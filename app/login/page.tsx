'use client'

import { createClient } from "@/lib/supabase/client"
import {Button} from '../Buttons'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Login = () => {

  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) router.replace('/')
    }

    checkUser()
  }, [router])

  const signIn = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
       redirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) console.log(error.message)

  }

  return(
    <main className='min-h-screen flex items-center justify-center'>
      <Button onClick={signIn}>Log in with google</Button>
    </main>
  )
}

export default Login
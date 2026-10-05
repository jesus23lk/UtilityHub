'use client'

import { createClient } from "@/lib/supabase/client"
import {Button} from '../Buttons'

const Login = () => {

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
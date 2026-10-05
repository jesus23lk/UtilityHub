'use client';

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {Button} from '../Buttons'
import { LayoutGrid } from 'lucide-react';

const Navbar = ({text}: {text: string}) => {
  return(
    <div className="
      flex items-center justify-between
      bg-white border-b border-gray-300 p-2 w-full"
    >
      <div className="flex items-center gap-2">
        <LayoutGrid />
        <span>{text}</span>
      </div>
      <Logout/>
    </div>
  )
}

const Logout = () => {
  const router = useRouter()

  const signOut = async () => {
    const supabase = createClient()

    await supabase.auth.signOut()

    router.push('/login')
    router.refresh()
  }

  return (
    <Button onClick={signOut}>Log out</Button>
  )
}

export default Navbar;
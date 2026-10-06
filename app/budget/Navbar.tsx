'use client';

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {Button} from '../Buttons'
import { LayoutGrid } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { List, Menu, LogOut, CircleDollarSign } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link'

const Navbar = ({text}: {text: string}) => {

  const [isOpen, setIsOpen] = useState(false)

  return(
    <div className="
      flex items-center justify-between shadow
      bg-white border-b border-gray-300 px-4 py-4 w-full
      sticky top-0 z-30
      "
    >
      <div className="flex items-center gap-2">
        <LayoutGrid />
        <span>{text}</span>
      </div>
      <button>
        <Menu onClick={() => setIsOpen(true)} />
      </button>
      <Sidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  )
}

const Sidebar = ({onClose, isOpen} : {onClose: () => void, isOpen: boolean}) => {

    const router = useRouter()

    const signOut = async () => {
      const supabase = createClient()

      await supabase.auth.signOut()

      router.push('/login')
      router.refresh()
    }

  return (
    <>
      <div
        className={`
          fixed inset-0 z-40 bg-black/30
          transition-opacity duration-300
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
      />

      <aside className={`
        fixed top-0 right-0 z-50 h-screen w-64 bg-white shadow-lg
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <nav className='flex flex-col gap-2 py-2'>
          <SidebarLink href='/budget' onClick={onClose} icon={CircleDollarSign}>
            Transactions
          </SidebarLink>
          <SidebarLink href='/budget/categories' onClick={onClose} icon={List}>
            Categories
          </SidebarLink>
          <SidebarLink href='/login' onClick={signOut} icon={LogOut}>
            Log Out
          </SidebarLink>
        </nav>
      </aside>
    </>
  )
}

type SidebarLinkProps = {
  href: string
  onClick: () => void
  icon: LucideIcon
  children: React.ReactNode
}

const SidebarLink = ({
  href,
  onClick,
  icon: Icon,
  children
}: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className='flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-100'
    >
      <Icon size={20} />
      {children}
    </Link>
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
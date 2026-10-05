import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation'
import Navbar from './budget/Navbar';
import { ChevronRight, CircleDollarSign, LayoutList } from 'lucide-react';
import Link from 'next/link'
import { MainBody } from './Components';

export const instant = false;

async function Home() {

  // Put client object in supabase var
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  return (
    <MainBody>
      <Navbar text={'Home'} />
      <div className='flex gap-4 flex-wrap justify-center'>
        <AppLink href='/budget' title='Budget' description='Track expenses, manage categories and view reports' icon={<BudgetIcon/>}/>
        <AppLink href='/prod' title='Productivity' description='Track activities, build habits, and view your progress' icon={<ProdIcon/>}/>
      </div>
    </MainBody>
  )
}

type AppLinkProps = {
  href: string
  title: string
  description: string
  icon: React.ReactNode
}

const AppLink = ({ href, title, description, icon }: AppLinkProps) => {
  return (
    <Link href={href}>
      <div className='bg-white rounded-lg p-3 border border-gray-200 flex flex-col gap-2 w-100'>
        {icon}

        <div className='flex justify-between'>
          <span className='text-xl font-bold'>{title}</span>
          <ChevronRight className='text-gray-500' />
        </div>

        <span className='text-gray-500 text-sm max-w-[75%]'>
          {description}
        </span>
      </div>
    </Link>
  )
}

const BudgetIcon = () => {
  return(
    <div 
      className='
        bg-green-100 w-12 h-12 rounded-lg
        flex items-center justify-center
        '
    >
      <CircleDollarSign size={26} className='text-green-600'/>
    </div>
  )
}

const ProdIcon = () => {
  return(
    <div 
      className='
        bg-blue-100 w-12 h-12 rounded-lg
        flex items-center justify-center
        '
    >
      <LayoutList size={26} className='text-blue-600'/>
    </div>
  )
}

export default Home;
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation'
import Navbar from '../Navbar';
import { MainBody } from '../../Components';
import { getCategoryStats } from '../actions';
import MonthPicker from './MonthPicker';
import { categories } from '../shared';
import { formatMoney } from '@/app/helpers';

export const instant = false;

export const metadata = {
  title: 'Categories'
}

async function Home({
  searchParams
}: {
  searchParams: Promise<{ month?: string, year?: string }>
}) {
  // Put client object in supabase var
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const params = await searchParams
  const month = Number(params.month ?? new Date().getMonth())
  const year = Number(params.year ?? new Date().getFullYear())

  const categoryStats = await getCategoryStats(month, year)
  // Render activities if any
  return (
    <MainBody>
      <Navbar text='Budget' />
      <div className='flex flex-col gap-4 w-[85vw]'>
        <div className='flex justify-between items-center'>
          <span className='font-bold text-xl'>Categories</span>
          <MonthPicker month={month} year={year}/>
        </div>
        <div className='flex flex-col justify-center gap-3'>
          {categoryStats!.map(({category, total}) => 
            <CategoryStat key={category} category={category} amount={total}/>
          )}
        </div>
      </div>
    </MainBody>
  )
}

const CategoryStat = ({category, amount}: {category: string, amount: number}) => {

  const Icon = categories.find((item) => item.name === category)!.icon

  return(
    <div className='flex bg-white border border-gray-200 p-4 gap-4 rounded-lg'>
      <div>
        <Icon size={25}/>
      </div>
      <div className='flex flex-col'>
        <span className='text-sm font-semibold'>{category}</span>
        <span className='text-base font-bold'>{formatMoney(amount)}</span>
      </div>
    </div>
  )
}


export default Home;
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation'
import Navbar from '../Navbar';
import { MainBody } from '../../Components';
import { getCategoryStats } from '../actions';
import { categories } from '../shared';
import { formatMoney } from '@/app/helpers';

export const instant = false;

export const metadata = {
  title: 'Categories'
}

async function Home() {

  // Put client object in supabase var
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const categoryStats = await getCategoryStats()
  console.log(categoryStats)

  // Render activities if any
  return (
    <MainBody>
      <Navbar text='Budget' />
      <div className='flex flex-wrap justify-center gap-3'>
        {categoryStats!.map(({category, total}) => 
          <CategoryStat key={category} category={category} amount={total}/>
        )}
      </div>
    </MainBody>
  )
}

const CategoryStat = ({category, amount}: {category: string, amount: number}) => {

  const Icon = categories.find((item) => item.name === category)!.icon

  return(
    <div className='flex bg-white border border-gray-200 w-[85vw] md:w-56 p-4 gap-4 rounded-lg'>
      <div>
        <Icon size={30}/>
      </div>
      <div className='flex flex-col'>
        <span className='text-sm font-semibold'>{category}</span>
        <span className='text-lg font-bold'>{formatMoney(amount)}</span>
      </div>
    </div>
  )
}

export default Home;
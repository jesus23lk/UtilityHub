import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation'
import Navbar from './Navbar';
import { MainBody } from '../Components';
import AddTransaction from './AddTransaction';
import { grabTransactionsOnMonth } from './actions';
import Transaction from './Transaction';
import MonthPicker from './MonthPicker';
import { TotalBox } from './shared';

export const instant = false;

export const metadata = {
  title: 'Budget'
}

async function Home({ searchParams }: 
{ searchParams: Promise<{month?: string, year?: string}>}) {

  // Put client object in supabase var
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const params = await searchParams
  const month = Number(params.month ?? new Date().getMonth())
  const year = Number(params.year ?? new Date().getFullYear())

  const transactions = await grabTransactionsOnMonth(month, year)

  let sum = 0
  transactions?.forEach(({amount}) => {
    sum += amount
  })

  // Render activities if any
  return (
    <MainBody>
      <Navbar text='Budget' />
      <div className='flex flex-col gap-4 max-w-4xl w-[90vw]'>
        <div className='flex justify-between items-center'>
          <span className='font-bold text-xl'>Transactions</span>
          <MonthPicker month={month} year={year} page={''}/>
        </div>
        <TotalBox total={sum}/>
        <div className='divide-y divide-gray-200 rounded-lg shadow-sm overflow-hidden'>
          { transactions?.map(({name, amount, date, category, id}) =>
            <Transaction 
              name={name}
              amount={amount}
              date={date}
              category={category}
              id={id}
              key={id}
            />
          )}
        </div>
        { transactions?.length === 0 && <EmptyMessage/>}
        <AddTransaction/>
      </div>
    </MainBody>
  )
}

const EmptyMessage = () => {
  return(
    <div className='bg-white px-6 py-3 flex flex-col items-center justify-center rounded-lg shadow'>
      <span className='font-bold text-lg'>
        No transactions yet.
      </span>
      <span className='text-gray-600'>
        You have no transactiosn yet. Click bellow to add one
      </span>
    </div>
  )
}

export default Home;
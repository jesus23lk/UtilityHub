import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation'
import Navbar from './Navbar';
import { MainBody } from '../Components';
import AddTransaction from './AddTransaction';
import { grabTransactions } from './actions';
import Transaction from './Transaction';

export const instant = false;

export const metadata = {
  title: 'Budget'
}

async function Home() {

  // Put client object in supabase var
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const transactions = await grabTransactions()

  // Render activities if any
  return (
    <MainBody>
      <Navbar text='Budget' />
      <div className='divide-y divide-gray-200 rounded-lg shadow-sm overflow-hidden w-[90vw]'>
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
      <AddTransaction/>
    </MainBody>
  )
}

export default Home;
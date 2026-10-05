import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation'
import Navbar from '../Navbar';
import { MainBody } from '../../Components';

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

  // Render activities if any
  return (
    <MainBody>
      <Navbar text='Budget' />
      <div>yo</div>
    </MainBody>
  )
}

export default Home;
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation'
import Navbar from '../Navbar';
import ActivitesBox from './Activities';
import { MainBody } from '../Components';

export const instant = false;

async function Home() {

  // Put client object in supabase var
  const supabase = await createClient();

  const { data: {user} } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Query supabase
  const { data: activities, error } = await supabase
    // Select all rows in activities table
    .from('activities')
    .select('*')
    .eq('user_id', user.id)
  
  if (error) {
    return <p>Error: {error.message}</p>
  }
  
  // Render activities if any
  return (
    <MainBody>
      <Navbar text='Productivity'/>
      <ActivitesBox>
      </ActivitesBox>
    </MainBody>
  )
}

export default Home;
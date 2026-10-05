'use client'

import { deleteRow, grabActivitiesByDate, updateSeconds } from './actions'
import { useRouter } from "next/navigation";
import { EllipsisVertical, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { IconBtn } from '../Buttons';
import AddActivity from './AddActivity';
import { formatSeconds, formatISO, formatDate } from '../helpers';

const ActivitesBox = () => {

  const [date, setCurDate] = useState(new Date)
  const [activities, setActivities] = useState<any[]>([])

  // const activities = grabActivitiesByDate(date.toISOString())

  useEffect(() => {
    const loadActivities = async () => {
      const data = await grabActivitiesByDate(formatISO(date))

      if (data) setActivities(data)
    }
    
    loadActivities()
  }, [date])

  const changeDate = (amount: number) => {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + amount)
    setCurDate(newDate)
  }

  return (
    <div className='p-4 space-y-3 w-full max-w-4xl'>
      <ActivityHeader date={date} changeDate={changeDate} />
      {activities.map((activity) => (
        <Activity key={activity.id} pkey={activity.id} name={activity.name} color={activity.color} seconds={activity.seconds_spent} date={date}/>
      ))}
      <AddActivity/>
    </div>
  )
}

const ActivityHeader = ({ date, changeDate } : { date: Date, changeDate: (amount: number) => void}) => {

  return(
    <>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Activities</h1>
        <div>
          <IconBtn onClick={() => changeDate(-1)}>
            <ChevronLeft size={24} strokeWidth={3}/>
          </IconBtn>
          <IconBtn onClick={() => changeDate(1)}>
            <ChevronRight size={24} strokeWidth={3}/>
          </IconBtn>
        </div>
      </div>
      <div>
        <h2>{formatDate(date)}</h2>
      </div>
    </>
  )
}

const Activity = ({ name, pkey, color, seconds, date } : { name: string, pkey: number, color: string, seconds: number, date: Date}) => {
  console.log(name, seconds, formatISO(date))

  const router = useRouter()
  const [menuOpen, setMenuOpen ] = useState(false)
  const [time, setTime] = useState(seconds)

  useEffect(() => {
    setTime(seconds)
  }, [seconds, date])

  const handleTimeClick =  async (amount: number) => {
    
    let newTime = time + amount

    if (newTime < 0) {
      newTime = 0
      setTime(newTime)
    }

    else if (newTime > 86400) {
      newTime = 86400
      setTime(newTime)
    }

    else setTime(newTime)

    await updateSeconds(pkey, newTime, formatISO(date))
  }

  const deleteActivity = async () => {
    await deleteRow(pkey)
    router.refresh()
  }

  return (
    <div 
      className='rounded-lg bg-white border border-gray-200 shadow-sm px-3 py-3 flex justify-between items-center text-sm'
    >
      <div className='flex items-center gap-2'>
        <div className='w-2 h-2 rounded-full' style={{ backgroundColor: color}}></div>
        <span>{name}</span>
      </div>
      <div className='relative flex items-center gap-2'>
        <span>{formatSeconds(time)}</span>
        <div>
          <IconBtn onClick={() => handleTimeClick(-1800)}>
            <ChevronLeft size={22}></ChevronLeft>
          </IconBtn>
          <IconBtn onClick={() => handleTimeClick(1800)}>
            <ChevronRight size={22}></ChevronRight>
          </IconBtn>
        </div>
        <IconBtn onClick={() => setMenuOpen(!menuOpen)}>
          <EllipsisVertical size={20}/>
        </IconBtn>
        {menuOpen && (
          <div
            className='
              flex flex-col absolute left-0 
              top-full border border-gray-300
              p-1 bg-white min-w-40'
          >
            <span>Edit</span>
            <span>Delete</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivitesBox;
'use client'

import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { monthAbvs } from '../shared';
import { useRouter } from 'next/navigation'

const MonthPicker = (props: { month: number, year: number}) => {

  const router = useRouter()

  // zero-based month numbers
  const [ monNumber, setMonNumber ] = useState(props.month)
  const [ year, setYear ] = useState(props.year)

  const handleMonthChange = (amount: number) => {
    let newMonth = monNumber + amount
    let newYear = year

    if (newMonth < 0) {
      newMonth = 11
      newYear--
    }

    if (newMonth > 11) {
      newMonth = 0
      newYear++
    }

    setYear(newYear)
    setMonNumber(newMonth)
    router.push(`/budget/categories?month=${newMonth}&year=${newYear}`)
  }

  return(
    <div className='bg-slate-200 p-1 rounded-lg text-xs font-semibold flex items-center'>
      <button 
        className='bg-white rounded-md p-1'
        onClick={() => handleMonthChange(-1)}
      >
        <ChevronLeft size={20}/>
      </button>
      <span className='w-20 flex justify-center'>
        {monthAbvs[monNumber]} {year}
      </span>
      <button
        className='bg-white rounded-md p-1'
        onClick={() => handleMonthChange(1)}
      >
        <ChevronRight size={20}/>
      </button>
    </div>
  )
}

export default MonthPicker ;
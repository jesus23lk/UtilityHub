import {
  CreditCardIcon, Utensils, ShoppingBasket, Fuel, Handbag,
  SoapDispenserDroplet, Tv, Plug2, House, Armchair, Gamepad2,
  BookText, CarFront, Package
} from 'lucide-react'
import { formatMoney } from '../helpers'

const Other = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-gray-200 p-2 rounded-lg'>
      <CreditCardIcon size={size} className='text-gray-600'/>
    </div>
  )
}

const Dining = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-orange-100 p-2 rounded-lg'>
      <Utensils size={size} className='text-orange-600'/>
    </div>
  )
}

const Household = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-orange-100 p-2 rounded-lg'>
      <Armchair size={size} className='text-orange-600'/>
    </div>
  )
}

const Groceries = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-green-100 p-2 rounded-lg'>
      <ShoppingBasket size={size} className='text-green-600'/>
    </div>
  )
}

const Gas = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-red-100 p-2 rounded-lg'>
      <Fuel size={size} className='text-red-600'/>
    </div>
  )
}

const Shopping = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-pink-100 p-2 rounded-lg'>
      <Handbag size={size} className='text-pink-500'/>
    </div>
  )
}

const Books = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-green-100 p-2 rounded-lg'>
      <BookText size={size} className='text-green-600'/>
    </div>
  )
}

const PersonalCare = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg'>
      <SoapDispenserDroplet size={size} className='text-blue-500'/>
    </div>
  )
}

const Subscriptions = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg'>
      <Tv size={size} className='text-blue-500'/>
    </div>
  )
}

const Utilities = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-yellow-100 p-2 rounded-lg'>
      <Plug2 size={size} className='text-yellow-600'/>
    </div>
  )
}

const VideoGames = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-yellow-100 p-2 rounded-lg'>
      <Gamepad2 size={size} className='text-yellow-600'/>
    </div>
  )
}

const Rent = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-red-100 p-2 rounded-lg'>
      <House size={size} className='text-red-600'/>
    </div>
  )
}

const Car = ({ size }: { size: number }) => {
  return (
    <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg'>
      <CarFront size={size} className='text-blue-500'/>
    </div>
  )
}

const Moving = ({ size }: { size: number}) => {
  return(
    <div className='flex justify-center items-center bg-red-100 p-2 rounded-lg'>
      <Package size={size} className='text-red-600'/>
    </div>
  )
}

export const categories = [
  { name: 'Other', icon: Other },
  { name: 'Dining', icon: Dining },
  { name: 'Groceries', icon: Groceries },
  { name: 'Gas', icon: Gas },
  { name: 'Shopping', icon: Shopping },
  { name: 'Personal Care', icon: PersonalCare },
  { name: 'Subscriptions', icon: Subscriptions },
  { name: 'Utilities', icon: Utilities },
  { name: 'Rent', icon: Rent },
  { name: 'Household', icon: Household },
  { name: 'Video Games', icon: VideoGames },
  { name: 'Books', icon: Books },
  { name: 'Moving', icon: Moving },
  { name: 'Car', icon: Car }
]

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const monthAbvs = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

// General use components
export const TotalBox = ({total}: {total: number}) => {
  return(
    <div className='flex flex-col bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-3 px-4 rounded-lg'>
      <span className='text-xs text-gray-600'>
        Total Spent
      </span>
      <span className='text-lg font-bold'>
        {formatMoney(total)}
      </span>
    </div>
  )
}
import {
  CreditCardIcon, Utensils, ShoppingBasket, Fuel, Handbag,
  SoapDispenserDroplet, Tv, Plug2, House, Armchair, Gamepad2,
  BookText, CarFront
} from 'lucide-react'

const Other = () => {
  return (
    <div className='flex justify-center items-center bg-gray-200 p-2 rounded-lg'>
      <CreditCardIcon size={20} className='text-gray-600'/>
    </div>
  )
}

const Dining = () => {
  return (
    <div className='flex justify-center items-center bg-orange-100 p-2 rounded-lg'>
      <Utensils size={20} className='text-orange-600'/>
    </div>
  )
}

const Household = () => {
  return (
    <div className='flex justify-center items-center bg-orange-100 p-2 rounded-lg'>
      <Armchair size={20} className='text-orange-600'/>
    </div>
  )
}

const Groceries = () => {
  return (
    <div className='flex justify-center items-center bg-green-100 p-2 rounded-lg'>
      <ShoppingBasket size={20} className='text-green-600'/>
    </div>
  )
}

const Gas = () => {
  return(
    <div className='flex justify-center items-center bg-red-100 p-2 rounded-lg'>
      <Fuel size={20} className='text-red-600'/>
    </div>
  )
}

const Shopping = () => {
  return(
    <div className='flex justify-center items-center bg-pink-100 p-2 rounded-lg'>
      <Handbag size={20} className='text-pink-500'/>
    </div>
  )
}

const Books = () => {
  return(
    <div className='flex justify-center items-center bg-green-100 p-2 rounded-lg'>
      <BookText size={20} className='text-green-600'/>
    </div>
  )
}

const PersonalCare = () => {
  return(
    <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg'>
      <SoapDispenserDroplet size={20} className='text-blue-500'/>
    </div>
  )
}

const Subscriptions = () => {
  return(
    <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg'>
      <Tv size={20} className='text-blue-500'/>
    </div>
  )
}

const Utilities = () => {
  return(
    <div className='flex justify-center items-center bg-yellow-100 p-2 rounded-lg'>
      <Plug2 size={20} className='text-yellow-600'/>
    </div>
  )
}

const VideoGames = () => {
  return(
    <div className='flex justify-center items-center bg-yellow-100 p-2 rounded-lg'>
      <Gamepad2 size={20} className='text-yellow-600'/>
    </div>
  )
}

const Rent = () => {
  return(
    <div className='flex justify-center items-center bg-red-100 p-2 rounded-lg'>
      <House size={20} className='text-red-600'/>
    </div>
  )
}

const Car = () => {
  return(
    <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg'>
      <CarFront size={20} className='text-blue-500'/>
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
  { name: 'Car', icon: Car }
]
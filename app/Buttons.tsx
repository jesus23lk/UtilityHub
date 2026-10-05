import { ReactNode } from "react"
import { Trash } from "lucide-react"

type ButtonProps = {
  children?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({children, onClick, type}: ButtonProps) => {
  return(
    <button className='bg-blue-500 text-white py-2 px-4 rounded-md' onClick={onClick} type={type}>
      {children}
    </button>
  )
}

type IconBtnProps = {
  children: ReactNode        // children must be the lucide icon
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' 
}

export const IconBtn = ({children, onClick, type}: IconBtnProps) => {
  return(
    <button
      onClick={onClick}
      type={type}
      className="text-gray-500 hover:bg-gray-100 p-1 rounded-full"
    >
      {children}
    </button>
  )
}

export const DelButton = ({children, onClick, type}: ButtonProps) => {
  return(
    <button 
      className='bg-red-100 text-red-600 py-2 px-4 rounded-md flex items-center gap-1'
      onClick={onClick}
      type={type}
    >
      {children}
      <Trash size={16}/>
      <span>Delete</span>
    </button>
  )
}
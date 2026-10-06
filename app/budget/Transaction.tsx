'use client'

import { useState } from "react"
import { FormModal, TextInput } from "../Components"
import { decimalPlaces, formatMonthAbv, formatMoney } from "../helpers"
import { categories } from "./shared"
import { Button, DeleteButton, DeleteButton2, CancelButton } from "../Buttons"
import { ChevronRight, CircleX } from "lucide-react"
import { updateTransaction, deleteTransaction } from "./actions"
import { useRouter } from "next/navigation";

const EditTransaction = (props: {
  name: string
  amount: number
  date: string
  id: number
  category: string
  onClose: () => void
}) =>  {

  const router = useRouter()   
  const [name, setName] = useState(props.name)
  const [amount, setAmount] = useState(String(props.amount))
  const [ amountError, setAmountError ] = useState(false)
  const [date, setDate] = useState(props.date)
  const [ dateError, setDateError ] = useState(false)
  const [category, setCategory] = useState(props.category)
  const [ deleteOpen, setDeleteOpen ] = useState(false)

  const validateAmount = (amount: string) =>{
    const numPlaces = decimalPlaces(amount)

    if (numPlaces > 2) {
      setAmountError(true)
      return
    }

    setAmountError(false)
    setAmount(amount)
  }

  const validateDate = (date: string) => {
    setDate(date)

    if (date === '') {
      setDateError(true)
      return
    }

    setDateError(false)
  }

  const confirmEdits = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (amountError || dateError) return

    await updateTransaction(
      name,
      Number(amount),
      date,
      category,
      props.id
    )

    props.onClose()
    router.refresh()
  }

  const processDeletion = async(e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    await deleteTransaction(props.id)
    props.onClose()
    router.refresh()
  }

  return (
    <div className='flex justify-center gap-2'>
      <FormModal onClose={props.onClose} submitAction={confirmEdits}>
        <label className="flex flex-col gap-1">
          Name
          <TextInput onChange={setName} value={name}/>
        </label>
        <label className="flex flex-col gap-1">
          Amount $
          <input 
            type="number"
            min={0}   
            step='0.01'
            className="border border-gray-300 p-2 rounded bg-slate-50"
            value={amount}
            onKeyDown={(e) => {
              if (['-', '+', 'e', 'E'].includes(e.key)) {
                e.preventDefault()
              }
            }}
            onChange={(e) => validateAmount(e.target.value)}
          />
          {amountError && <p className="text-red-600">Enter a valid amount.</p>}
        </label>
        <label className="flex flex-col gap-1">
          Date
          <input
            type='date'
            className="border border-gray-300 p-2 rounded bg-slate-50"
            value={date}
            onChange={(e) => validateDate(e.target.value)}
          />
          {dateError && <p className="text-red-600">You must enter a date</p>}
        </label>
        <label className="flex flex-col gap-1">
          Category
          <select 
            className="border border-gray-300 p-2 rounded bg-slate-50"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {categories.map(({name}) =>
              <option key={name} value={name}>{name}</option>)}
          </select>
        </label>
        <div className="flex justify-around">
          <DeleteButton type='button' onClick={() => setDeleteOpen(true)}/>
          <Button type='submit'>Submit</Button>
        </div>
      </FormModal>
      {deleteOpen && <DeleteModal onConfirm={processDeletion} onClose={() => setDeleteOpen(false)}/>}
    </div>
  )
}

const DeleteModal = ({ onConfirm, onClose }: 
{ onConfirm: (e: React.SubmitEvent<HTMLFormElement>) =>  Promise<void>, onClose: () => void}) => {

  return(
    <FormModal 
      onClose={onClose} 
      submitAction={(e) => {
        onClose()
        onConfirm(e)
    }}>
      <div className="flex flex-col items-center gap-3">
        <CircleX className='text-red-500'size={40}/>
        <div className="flex flex-col items-center">
          <span className="text-lg">Delete Transaction?</span>
          <span className="text-gray-500 text-sm">This action cannot be undone</span>
        </div>
      </div>
      <div className="flex justify-center gap-3">
        <CancelButton onClick={onClose}/>
        <DeleteButton2 type="submit"/>
      </div>
    </FormModal>
  )
}

const Transaction = ({name, amount, date, id, category}: 
{name: string, amount: number, date: string, id: number, category: string}) => {

  const Icon = categories.find((item) => item.name === category)!.icon
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <div 
        onClick={() => setModalOpen(true)}
        className='bg-white p-3 flex justify-between items-center cursor-pointer'
      >
        <div className='flex gap-3'>
          <Icon/>
          <div className='flex flex-col'>
            <span className='text-sm'>
              {name}
            </span>
            <span className='text-xs text-gray-500'>
              { formatMonthAbv(date)}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-1'>
          <span className='text-[#ff0000] text-sm'>
            -{formatMoney(amount)}
          </span>
          <ChevronRight strokeWidth={2} size={20} className='text-gray-400'/>
        </div>
      </div>
      {modalOpen && <EditTransaction name={name} amount={amount} date={date} id={id} category={category} onClose={() => setModalOpen(false)}/>}
    </>
  )
}

export default Transaction;
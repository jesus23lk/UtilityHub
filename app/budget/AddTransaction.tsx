'use client';
import { useState } from "react";
import { Button } from "../Buttons";
import { FormModal, TextInput } from "../Components";
import { useRouter } from "next/navigation";
import { todayISO, decimalPlaces } from "../helpers";
import { insertTransaction } from "./actions";
import { categories } from "./shared";

const AddTransaction = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className='flex justify-center gap-2'>
      <Button onClick={() => setModalOpen(true)}>Add New</Button>
      {modalOpen && <AddTransModal onClose={() => setModalOpen(false)} />}
    </div>
  )
}

const AddTransModal = ({ onClose }: {onClose: () => void}) => {
  const router = useRouter()    

  const [ name, setName ] = useState('')
  const [ amount, setAmount ] = useState('0.00')
  const [ amountError, setAmountError ] = useState(false)
  const [ date, setDate ] = useState(todayISO())
  const [ dateError, setDateError ] = useState(false)
  const [ category, setCategory ] = useState('Other')

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

  const addTransaction = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (amountError || dateError) return

    await insertTransaction(
      name,
      Number(amount),
      date,
      category
    )

    onClose()
    router.refresh()
  }

  return (
    <FormModal onClose={onClose} submitAction={addTransaction}>
      <label className="flex flex-col gap-1">
        Name
        <TextInput onChange={setName}/>
      </label>
      <label className="flex flex-col gap-1">
        Amount $
        <input 
          type="number"
          min={0}   
          step='0.01'
          className="border border-gray-300 p-2 rounded bg-slate-50"
          onKeyDown={(e) => {
            if (['-', '+', 'e', 'E'].includes(e.key)) {
              e.preventDefault()
            }
          }}
          placeholder={amount}
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
        <select className="border border-gray-300 p-2 rounded bg-slate-50" onChange={(e) => setCategory(e.target.value)}>
          {categories.map(({name}) =>
            <option key={name}>{name}</option>)}
        </select>
      </label>
      <Button type='submit'>Submit</Button>
    </FormModal>
  )
}

export default AddTransaction
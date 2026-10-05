'use client';

import { useState } from "react";
import { addNewActiviy } from "./actions";
import { useRouter } from "next/navigation";
import {Button} from "../Buttons";
import { FormModal, TextInput } from "../Components";

const COLORS = [
  'rgb(232, 93, 93)',    // Red
  'rgb(120, 195, 250)',  // Blue
  'rgb(94, 171, 94)',    // Green
  'rgb(255, 225, 31)',   // Yellow
  'rgb(189, 106, 252)',  // Lavender
  'rgb(250, 145, 248)',  // Pink
  'rgb(250, 164, 60)',   // Orange
  'rgb(140, 219, 200)',  // Turquoise
  'rgb(108, 104, 252)',  // Indigo
  'rgb(158, 212, 97)'    // Lime
]

const AddActivity = () => {

  const [ modalOpen, setModalOpen] = useState(false)
  
  return(
    <>
      <div className='flex justify-center gap-2'>
        <Button onClick={() => setModalOpen(true)}>Add New</Button>
        {modalOpen && <AddActivityModal onClose={() => setModalOpen(false)}/>}
      </div>
    </>
  )
}

const AddActivityModal = ({ onClose }: {onClose: () => void}) => {
  const router = useRouter()
  const [activityName, setActivityName] = useState('')
  const [color, setColor] = useState(COLORS[0])

  const addActivity = async (e: React.SubmitEvent<HTMLFormElement>) => {
    
    // prevents page from being reloaded by form
    e.preventDefault()
    
    await addNewActiviy(activityName, color)
    onClose()
    router.refresh()
  }

  return(

    <FormModal onClose={onClose} submitAction={addActivity}>
      <div className="flex flex-col">
        <span>Name</span>
        <TextInput placeholder='New activity' onChange={setActivityName}/>
      </div>
      <div className="flex flex-col">
        <span>Color</span>
        <ColorPicker color={color} setColor={setColor}/>
      </div>
      <Button type='submit'>Submit</Button>
    </FormModal>

  )
}

const ColorPicker = ({color, setColor}: {color: string, setColor: (item: string) => void}) => {

  return(
    <div className="grid grid-cols-5 gap-x-0 gap-y-3 border border-gray-300 p-3">
      {COLORS.map((item) => 
        <div 
          key={item}
          style={{ backgroundColor: item}}
          className={`w-5 h-5 cursor-pointer ${item === color ? 'outline outline-2 outline-gray-400 outline-offset-2' : ''}`}
          onClick={() => setColor(item)}
        >
        </div>
      )}
    </div>
  )
}

export default AddActivity;
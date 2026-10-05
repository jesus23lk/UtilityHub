export const MainBody = ({children}: { children: React.ReactNode}) => {
  return (
    <main className='flex flex-col items-center space-y-5 min-h-screen bg-slate-50 pb-5'>
      {children}
    </main>
  )
}

export const FormModal = ({
  children,
  onClose,
  submitAction
}: {
  children: React.ReactNode,
  onClose: () => void, 
  submitAction: React.SubmitEventHandler<HTMLFormElement>
}) => {
  return(
    <div onClick={(e) => {
        onClose()
        e.stopPropagation()
      }} 
      className='z-50 fixed inset-0 bg-black/50 flex items-center justify-center'
    >
      <form 
        className='bg-white rounded-lg p-6 flex flex-col gap-4' 
        onClick={(e) => e.stopPropagation()}
        onSubmit={submitAction}
      >
        {children}
      </form>
    </div>
  )
}

export const TextInput = ({
  placeholder,
  value,
  onChange
}: {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}) => {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      className='border border-gray-300 p-2 rounded bg-slate-50'
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}
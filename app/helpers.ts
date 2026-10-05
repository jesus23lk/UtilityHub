const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

export const formatSeconds = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)

  const remainingSeconds = seconds % 3600
  const minutes = Math.floor(remainingSeconds/ 60)

  const zeroPaddedHours = hours < 10 ? '0' + hours : hours
  const zeroPaddedMinutes = minutes < 10 ? '0' + minutes : minutes

  return `${zeroPaddedHours}h ${zeroPaddedMinutes}m`
}

export const formatISO = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const todayISO = () => {
  return new Date().toISOString().split('T')[0]
}

export const formatDate = (date: Date) => {

  let dateString = weekdays[date.getDay()] + ' '

  dateString += date.toLocaleDateString()
  return dateString
}

export const formatMonthAbv = (date: string) => {
  const [year, month, day] = date.split('-')

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]

  return `${months[Number(month) - 1]} ${Number(day)}, ${year}`
}

export const decimalPlaces = (amount: string) => {
  const decimal = amount.split('.')[1]
  return decimal ? decimal.length : 0
}

export const formatMoney = (amount: number) => {
  return `$${amount.toFixed(2)}`
}
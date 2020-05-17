export const currentDate = new Date()
export const isNonLeapYear = new Date(currentDate.getFullYear(), 1, 29).getMonth() !== 1

export const getLongFormat = (dateStr: string): string => {
  const date = new Date(dateStr)

  return `${ date.toLocaleString('en', { month: 'long' }) } ${ date.getDate() }`
}

export const getDigitFormat = (date: Date): string => {
  const month: string = date.toLocaleString('en', { month: '2-digit' })
  const day: string = date.toLocaleString('en', { day: '2-digit' })
  return (`${ month }.${ day }`)
}

export const getDates = (interval: timeIntervalType): rangeType => {
  const today = getDigitFormat(currentDate)

  switch (interval) {
    case 'today':
      return {
        fromDate: today,
        toDate: isNonLeapYear && today === '02.28' ? '02.29' : today
      }

    case 'past':
      const minDate = new Date(currentDate)
      minDate.setDate(minDate.getDate() - 14)
      const yesterday = new Date(currentDate)
      yesterday.setDate(yesterday.getDate() - 1)
      return {
        fromDate: getDigitFormat(minDate),
        toDate: isNonLeapYear && getDigitFormat(yesterday) === '02.28' ? '02.29' : getDigitFormat(yesterday)
      }

    case 'upcoming':
      const maxDate = new Date(currentDate)
      maxDate.setDate(maxDate.getDate() + 14)
      const tomorrow = new Date(currentDate)
      tomorrow.setDate(tomorrow.getDate() + 1)
      return {
        fromDate: getDigitFormat(tomorrow),
        toDate: isNonLeapYear && getDigitFormat(maxDate) === '02.28' ? '02.29' : getDigitFormat(maxDate)
      }

    default:
      return {
        fromDate: today,
        toDate: isNonLeapYear && today === '02.28' ? '02.29' : today
      }
  }
}

export type timeIntervalType = 'past' | 'today' | 'upcoming'
export type rangeType = {fromDate: string, toDate: string}

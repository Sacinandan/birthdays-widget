import IUser from '../models/user-model'
import { timeIntervalType } from './dates-formatter'

const getDateTime = (date: string): number =>
  new Date(date.replace(/^\d{4}/, '1972')).getTime()

const sortUsersList = (arr: IUser[], interval: timeIntervalType): IUser[] =>
  arr.sort((a, b) => {
      if (interval === 'past') {
        if (getDateTime(a.birthday) === getDateTime(b.birthday)) {
          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        } else {
          return getDateTime(b.birthday) - getDateTime(a.birthday)
        }
      }

      if (interval === 'upcoming') {
        if (getDateTime(a.birthday) === getDateTime(b.birthday)) {
          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        } else {
          return getDateTime(a.birthday) - getDateTime(b.birthday)
        }
      }

      return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
    }
  )

export default sortUsersList

import axios from 'axios'
import apiUrl from './constants'
import IUser from '../models/user-model'
import { getDates, timeIntervalType } from '../utils/dates-formatter'

const getData = async (interval: timeIntervalType): Promise<responseType> => {
  const { fromDate, toDate } = getDates(interval)
  const url = `${ apiUrl }/api/birthdays?dateFrom=${ fromDate }&dateTo=${ toDate }`

  return await axios.get(url, {
    headers: { Pragma: 'no-cache', Expires: new Date('01.01.2000') }
  })
    .then(res => res.data.users)
    .catch(err => err.response)
}

export type responseType = IUser[] | []
export default getData
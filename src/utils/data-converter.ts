import { getLongFormat, isNonLeapYear, timeIntervalType } from './dates-formatter'
import IUser from '../models/user-model'
import sortUsersList from './users-list-sorter'
import getData, { responseType } from '../api/requests'

const getCheckAndChangeUsersDataForView = async (interval: timeIntervalType): Promise<responseType> => {
  const users: responseType = await getData(interval)
  let usersVsChangedDate: responseType = []
  if (users.length) {
    if (isNonLeapYear) {
      usersVsChangedDate = (users as IUser[]).map((user) => {
        const regex = /02-29$/
        if (regex.test(user.birthday)) return {
          ...user,
          birthday: user.birthday.replace(regex, '02-28')
        }
        else return user
      })

      return sortUsersList(usersVsChangedDate, interval)
        .map((user) => ({ ...user, birthday: getLongFormat(user.birthday) }))

    } else return sortUsersList(users, interval)
      .map((user) => ({ ...user, birthday: getLongFormat(user.birthday) }))
  }

  return users
}

export default getCheckAndChangeUsersDataForView

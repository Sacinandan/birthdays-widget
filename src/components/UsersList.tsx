import React, { FC, useEffect, useState } from 'react'
import IUser from '../models/user-model'
import { responseType } from '../api/requests'
import { timeIntervalType } from '../utils/dates-formatter'
import getCheckAndChangeUsersDataForView from '../utils/data-converter'

import chevron from '../assets/images/chevron-right.svg'

import UserCard from './UserCard'
import Button from './Button'

type userListsType = {
  past: responseType,
  today: responseType,
  upcoming: responseType
}

const initialState: userListsType = {
  past: [],
  today: [],
  upcoming: []
}

type Props = {
  interval: timeIntervalType,
  listLength: number,
  changeListLength: (num: number) => void
}

const UsersList: FC<Props> = ({ interval, listLength, changeListLength }) => {
  const [ usersLists, setUsersLists ] = useState<userListsType>(initialState)
  const [ isLoading, setLoading ] = useState<boolean>(true)

  useEffect(() => {
    const getUsers = async () => {
      const data = await getCheckAndChangeUsersDataForView(interval)

      data.length && setUsersLists({
        ...usersLists,
        [interval]: data
      })

      changeListLength(10)
      setLoading(false)
    }

    if (!usersLists[interval].length) {
      setLoading(true)
      getUsers().catch(err => err.response)
    }
  }, [ interval, usersLists, changeListLength ])

  const handleClick = (): void => {
    changeListLength(listLength + 10)
  }

  return (
    <>
      <div className="users-list">
        { isLoading
          ? <p className="users-list__status-message">Loading...</p>
          : usersLists[interval].length
            ? (usersLists[interval] as IUser[]).map((user: IUser, idx: number) =>
              idx < listLength && <UserCard key={ user.id } userProfile={ user } />)
            : <p className="users-list__status-message">Unfortunately there is no users with birthdays on these
              dates</p>
        }
      </div>
      { usersLists[interval].length > listLength &&
      <Button
        className="button card__show-more-button"
        onClick={ () => handleClick() }
      >
        Show more
        <img
          className="show-more-button__chevron"
          src={ chevron } alt="chevron-right" />
      </Button> }
    </>
  )
}

export default UsersList

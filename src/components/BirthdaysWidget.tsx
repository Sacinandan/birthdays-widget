import React, { FC, useState } from 'react'
import { timeIntervalType } from '../utils/dates-formatter'

import '../styles/index.scss'
import giftIcon from '../assets/images/gift.png'

import Nav from './Nav'
import UsersList from './UsersList'

const BirthdaysWidget: FC = () => {
  const [ interval, setInterval ] = useState<timeIntervalType>('today')
  const [ listLength, setListLength ] = useState<number>(10)

  const switchInterval = (value: timeIntervalType): void => {
    setInterval(value)
    changeListLength(10)
  }

  const changeListLength = (num: number): void => {
    setListLength(num)
  }

  return (
    <div className="birthdays-widget">
      <img src={ giftIcon } alt="birthdays-gift" className="birthdays-widget__icon" />
      <div className="birthdays-widget__card">
        <h2 className="card__title">BIRTHDAYS</h2>
        <Nav
          active={ interval }
          switchInterval={ switchInterval }
        />
        <UsersList
          interval={ interval }
          listLength={ listLength }
          changeListLength={ changeListLength }
        />
      </div>
    </div>
  )
}

export default BirthdaysWidget

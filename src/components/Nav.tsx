import React, { FC } from 'react'
import { timeIntervalType } from '../utils/dates-formatter'

import Button from './Button'

type Props = {
  active: timeIntervalType,
  switchInterval: (value: timeIntervalType) => void
}

const Nav: FC<Props> = ({ active, switchInterval }) => {

  const activateButton = (status: timeIntervalType): string =>
    status === active ? ' nav__button--active' : ''

  const handleClick = (value: timeIntervalType): void => {
    switchInterval(value)
  }

  return (
    <div className="card__nav">
      <Button
        className={ `button nav__button nav__button--past${ activateButton('past') }` }
        onClick={ () => handleClick('past') }
      >
        PAST dates
      </Button>

      <Button
        className={ `button nav__button${ activateButton('today') }` }
        onClick={ () => handleClick('today') }
      >
        TODAY
      </Button>

      <Button
        className={ `button nav__button${ activateButton('upcoming') }` }
        onClick={ () => handleClick('upcoming') }
      >
        UPCOMING dates
      </Button>
    </div>
  )
}

export default Nav

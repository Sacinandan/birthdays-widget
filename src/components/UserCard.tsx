import React, { FC } from 'react'
import IUser from '../models/user-model'
import apiUrl from '../api/constants'

type Props = {
  userProfile: IUser
}

const UserCard: FC<Props> = ({ userProfile }) => {
  const {
    avatarUrl,
    name,
    jobTitle,
    birthday
  } = userProfile

  return (
    <div className="user-card">
      <img src={ apiUrl + avatarUrl } alt="user-avatar" className="user-card__avatar" />

      <div className="user-card__user-info">
        <p className="user-info__name">{ name }</p>
        <p className="user-info__job">{ jobTitle }</p>
        <p className="user-info__birthday">{ birthday }</p>
      </div>
    </div>
  )
}

export default UserCard

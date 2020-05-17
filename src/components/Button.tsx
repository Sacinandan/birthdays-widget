import React, { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode,
  onClick?: ((e: MouseEvent<HTMLButtonElement>) => void)
}

const Button: FC<Props> = ({ children, ...ownProps }) => (
  <button { ...ownProps }>
    { children }
  </button>
)

export default Button

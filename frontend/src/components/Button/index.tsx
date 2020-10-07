import React, { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  variant?: 'primary' | 'empty'
}

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  variant,
  ...props
}) => {
  return (
    <Container variant={variant} type="button" {...props}>
      {loading ? 'Carregando...' : children}
    </Container>
  )
}

export default Button

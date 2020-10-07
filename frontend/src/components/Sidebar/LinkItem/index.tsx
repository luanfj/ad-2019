import React from 'react'
import { IconBaseProps } from 'react-icons'

import { Container } from './styles'

interface Props {
  to: string
  text: string
  icon?: React.ComponentType<IconBaseProps>
}

const LinkItem: React.FC<Props> = ({ to, text, icon: Icon }) => {
  return (
    <Container to={to}>
      {Icon && <Icon size={18} />}

      <span>{text}</span>
    </Container>
  )
}

export default LinkItem

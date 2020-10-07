import React from 'react'

import { Container, Wrapper, Box } from './styles'

interface ModalProps {
  width?: number
  renderContent: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ width, renderContent }) => {
  return (
    <Container>
      <Wrapper>
        <Box width={width}>{renderContent}</Box>
      </Wrapper>
    </Container>
  )
}

export default Modal

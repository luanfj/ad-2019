import React from 'react'
import { FiPlus } from 'react-icons/fi'
import { useRouteMatch } from 'react-router-dom'

import LinkItem from './LinkItem'

import { Container, Wrapper } from './styles'

const Sidebar: React.FC = () => {
  const match = useRouteMatch()

  return (
    <>
      <Container>
        <Wrapper>
          <h3>Amigo secreto</h3>

          <LinkItem
            to={`${match.path}/create`}
            text="Criar amigo"
            icon={FiPlus}
          />
        </Wrapper>
      </Container>
    </>
  )
}

export default Sidebar

import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, Route, useRouteMatch, Link } from 'react-router-dom'
import { FiPenTool, FiX } from 'react-icons/fi'

import Sidebar from '../../components/Sidebar'

import { Container, Title, BoxWrapper, BoxContent, Box, Icons } from './styles'
import api from '../../services/api'
import Button from '../../components/Button'
import { useToast } from '../../hooks/toast'
import Modal from '../../components/Modal'
import EditFriendModal from '../../components/EditFriendModal'
import CreateFriendModal from '../../components/CreateFriendModal'

interface Friend {
  id: string
  name: string
  email: string
}

const Home: React.FC = () => {
  const [availableFriends, setAvailableFriends] = useState<Friend[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const match = useRouteMatch()

  const { addToast } = useToast()
  const history = useHistory()

  const handleAvailableFriends = useCallback(() => {
    api.get('/friends').then(response => setAvailableFriends(response.data))
  }, [])

  useEffect(() => {
    handleAvailableFriends()
  }, [handleAvailableFriends])

  const shuffleSecretFriends = useCallback(async () => {
    try {
      setIsLoading(true)

      const shuffledArray = availableFriends
        .map(a => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)

      for (let i = 0; i < shuffledArray.length; i++) {
        if (shuffledArray[i + 1]) {
          await api.post('/friends/secret', {
            friend_id: shuffledArray[i].id,
            secret_friend_id: shuffledArray[i + 1].id
          })
        } else {
          await api.post('/friends/secret', {
            friend_id: shuffledArray[i].id,
            secret_friend_id: shuffledArray[0].id
          })
        }
      }

      addToast({
        type: 'success',
        title: 'Sorteio concluido!',
        description:
          'Cada participante recebeu um e-mail contendo seu amigo secreto!'
      })

      history.push('/friend')
    } catch {
      addToast({
        type: 'error',
        title: 'Occoreu um erro!',
        description:
          'Ocorreu um erro ao tentar sortear os amigos secretos. Tente novamente ou resete a lista.'
      })
    } finally {
      setIsLoading(false)
    }
  }, [availableFriends, addToast, history])

  const handleClearSecretFriendsList = useCallback(async () => {
    try {
      setIsLoading(true)

      await api.delete('/friends/secret')

      addToast({
        type: 'success',
        title: 'Limpeza concluida!',
        description: 'A lista de amigos secretos foi limpa!'
      })

      history.push('/friend')
    } catch {
      addToast({
        type: 'error',
        title: 'Occoreu um erro!',
        description:
          'Ocorreu um erro ao tentar limpar a lista e amigos secretos, tente novamente.'
      })
    } finally {
      setIsLoading(false)
    }
  }, [addToast, history])

  const handleDeleteFriend = useCallback(
    async friend_id => {
      try {
        setIsLoading(true)

        await api.delete(`/profile/${friend_id}`)

        await addToast({
          type: 'success',
          title: 'Limpeza concluida!',
          description: 'O amigo foi deletado!'
        })

        handleAvailableFriends()

        history.push('/friend')
      } catch {
        addToast({
          type: 'error',
          title: 'Occoreu um erro!',
          description:
            'Ocorreu um erro ao tentar apagar o amigo, tente novamente.'
        })
      } finally {
        setIsLoading(false)
      }
    },
    [addToast, history, handleAvailableFriends]
  )

  return (
    <Container>
      <Sidebar />

      <Title>
        Lista de amigos disponíveis -{' '}
        <Button
          type="button"
          variant="empty"
          disabled={availableFriends.length % 2 !== 0}
          onClick={shuffleSecretFriends}
        >
          Sortear amigo secreto
        </Button>
        <Button
          type="button"
          variant="empty"
          onClick={handleClearSecretFriendsList}
        >
          Limpar a lista de amigos secretos
        </Button>
        {availableFriends.length % 2 !== 0 && (
          <span>
            Só será possível sortear quando o número de amigos cadastrado for
            par
          </span>
        )}
      </Title>

      <BoxWrapper>
        {isLoading && <span>Aguarde um momento...</span>}

        {availableFriends.length === 0 && <span>Não há amigos no momento</span>}

        {!isLoading &&
          availableFriends.map((friend, i) => (
            <BoxContent key={friend.id}>
              <span>{i + 1}</span>

              <Box>
                <span>
                  {friend.name} - <span>{friend.email}</span>
                </span>
                <Icons>
                  <Link to={`${match.path}/edit/${friend.id}`}>
                    <FiPenTool />
                  </Link>
                  <FiX
                    onClick={() => {
                      handleDeleteFriend(friend.id)
                    }}
                  />
                </Icons>
              </Box>
            </BoxContent>
          ))}
      </BoxWrapper>

      <Route
        path={`${match.path}/edit/:friendId`}
        render={routeProps => (
          <Modal
            width={800}
            renderContent={
              <EditFriendModal
                handleAvailableFriends={handleAvailableFriends}
                friendId={routeProps.match.params.friendId}
              />
            }
          />
        )}
      />

      <Route
        path={`${match.path}/create`}
        render={() => (
          <Modal
            width={800}
            renderContent={
              <CreateFriendModal
                handleAvailableFriends={handleAvailableFriends}
              />
            }
          />
        )}
      />
    </Container>
  )
}

export default Home

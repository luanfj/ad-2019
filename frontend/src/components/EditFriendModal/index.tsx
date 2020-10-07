import React, { useCallback, useRef, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import { Container, Actions } from './styles'

import Button from '../Button'
import Input from '../Input'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'

interface EditFriendFormData {
  name: string
  email: string
}

interface EditFriendModalProps {
  friendId: string
  handleAvailableFriends: () => void
}

const EditFriendModal: React.FC<EditFriendModalProps> = ({
  friendId,
  handleAvailableFriends
}) => {
  const [userData, setUserData] = useState<EditFriendFormData>()
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()

  const { addToast } = useToast()

  useEffect(() => {
    api
      .get(`/profile/${friendId}`)
      .then(response => setUserData(response.data))
      .catch(_ => history.push('/friend'))
  }, [friendId, history])

  const handleSubmit = useCallback(
    async (data: EditFriendFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Este campo é obrigatório'),
          email: Yup.string()
            .required('Este campo é obrigatório')
            .email('Digite um e-mail válido')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await api.put(`/profile/${friendId}`, data)

        history.push('/friend')

        handleAvailableFriends()

        addToast({
          type: 'success',
          title: 'Cadastro editado!'
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na edição',
          description:
            'Ocorreu um erro ao tentar editar o cadastro, tente novamente.'
        })
      }
    },
    [addToast, history, friendId, handleAvailableFriends]
  )

  return (
    <Container
      ref={formRef}
      initialData={{
        name: userData?.name,
        email: userData?.email
      }}
      onSubmit={handleSubmit}
    >
      <h1>Editar amigo</h1>

      <Input
        name="name"
        label="Nome"
        tip="Não altere caso deseja que este dado permaneça"
      />

      <Input
        name="email"
        label="E-mail"
        tip="Não altere caso deseja que este dado permaneça"
      />

      <Actions>
        <Button type="submit" variant="primary">
          Editar amigo
        </Button>

        <Link to="/">
          <Button type="button" variant="empty">
            Cancelar
          </Button>
        </Link>
      </Actions>
    </Container>
  )
}

export default EditFriendModal

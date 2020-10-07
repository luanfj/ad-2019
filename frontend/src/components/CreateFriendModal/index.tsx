import React, { useCallback, useRef } from 'react'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import { Container, Actions } from './styles'

import Button from '../Button'
import Input from '../Input'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationErrors'

interface CreateFriendFormData {
  name: string
  email: string
}

interface CreateFriendModalProps {
  handleAvailableFriends: () => void
}

const CreateFriendModal: React.FC<CreateFriendModalProps> = ({
  handleAvailableFriends
}) => {
  const formRef = useRef<FormHandles>(null)

  const history = useHistory()

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: CreateFriendFormData) => {
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

        await api.post('/friends', data)

        history.push('/friend')

        handleAvailableFriends()

        addToast({
          type: 'success',
          title: 'Cadastro realizado!'
        })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description:
            'Ocorreu um erro ao tentar fazer o cadastro, tente novamente.'
        })
      }
    },
    [addToast, history, handleAvailableFriends]
  )

  return (
    <Container ref={formRef} onSubmit={handleSubmit}>
      <h1>Cadastrar amigo</h1>

      <Input
        name="name"
        label="Nome"
        tip="Escreva o nome do amigo que deseja cadastrar"
      />

      <Input
        name="email"
        label="E-mail"
        tip="Escreva o e-mail do amigo que deseja cadastrar"
      />

      <Actions>
        <Button type="submit" variant="primary">
          Cadastrar amigo
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

export default CreateFriendModal

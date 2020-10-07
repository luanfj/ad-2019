import styled from 'styled-components'
import { Form } from '@unform/web'

export const Container = styled(Form)`
  padding: 25px 40px 35px;

  h1 {
    font-size: 20px;
    padding-bottom: 15px;
  }
`

export const Actions = styled.div`
  button + a {
    margin-left: 10px;
    text-decoration: none;
  }
`

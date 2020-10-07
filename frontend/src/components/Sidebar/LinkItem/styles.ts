import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled(Link)`
  display: flex;
  padding: 8px 12px;
  border-radius: 3px;
  text-decoration: none;

  & + a {
    margin-top: 8px;
  }

  svg {
    margin-right: 15px;
    color: rgb(23, 43, 77);
  }

  span {
    font-size: 13px;
    color: rgb(23, 43, 77);
  }

  &.active {
    color: #0052cc;
    background: #ebecf0;
  }

  &:hover {
    background: #ebecf0;
  }
`

import styled, { css } from 'styled-components'

interface Props {
  isErrored: boolean
}

export const Container = styled.div<Props>`
  & + div {
    margin-top: 20px;
  }

  label {
    padding-bottom: 5px;
    color: #5e6c84;
    font-size: 13px;
    font-weight: 500;
    display: flex;
  }

  input {
    width: 100%;
    height: 32px;
    padding: 0 7px;
    border-radius: 3px;
    border: 1px solid #dfe1e6;
    color: #172b4d;
    background: #f4f5f7;
    font-size: 15px;
    transition: background 0.1s;

    &:hover {
      background: #ebecf0;
    }

    &:focus {
      background: #fff;
      border: 1px solid #4c9aff;
      box-shadow: 0 0 0 1px #4c9aff;
    }

    ${props =>
      props.isErrored &&
      css`
        &,
        &:focus {
          border: 1px solid #e13c3c;
          box-shadow: none;
        }
      `}
  }

  span {
    padding-top: 6px;
    color: #5e6c84;
    font-size: 11.5px;
    cursor: default;
  }
`

export const Error = styled.div`
  font-size: 11px;
  color: rgb(225, 60, 60);
  padding: 1px 0 0 5px;
`

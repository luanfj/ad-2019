import styled, { css } from 'styled-components'
import { shade } from 'polished'

export interface Props {
  variant?: 'primary' | 'empty'
}

const buttonVariants = {
  primary: css`
    background: #0052cc;
    color: #fff;
    &:not(:disabled) {
      &:hover {
        background: ${shade(0.15, '#0052cc')};
      }
    }
  `,
  empty: css`
    background: #fff;
    color: #42526e;

    &:not(:disabled) {
      &:hover {
        background: #ebecf0;
      }
    }
  `
}

export const Container = styled.button<Props>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 12px;
  white-space: nowrap;
  border-radius: 3px;
  transition: all 0.1s;
  border: none;
  font-size: 13px;

  ${props => buttonVariants[props.variant || 'empty']}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

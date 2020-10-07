import styled, { css } from 'styled-components'

export const Container = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  background: rgba(9, 30, 66, 0.54);

  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  height: 100%;
`

interface BoxProps {
  width?: number
}

export const Box = styled.div<BoxProps>`
  background: #fff;
  display: inline-block;
  position: relative;
  width: 100%;

  ${props =>
    props.width &&
    css`
      max-width: ${props.width}px;
    `}

  border-radius: 3px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
`

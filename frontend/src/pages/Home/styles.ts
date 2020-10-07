import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  padding: 25px 25px 0 250px;
`

export const Title = styled.div`
  font-size: 20px;
  font-weight: 500;

  span {
    font-weight: 400;
    font-size: 11.5px;
    color: #5e6c84;
    cursor: default;

    display: flex;
  }
`

export const BoxWrapper = styled.div`
  background: rgb(244, 245, 247);
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`

export const BoxContent = styled.div`
  display: flex;

  > span {
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 14px;
  }

  & + div {
    margin-top: 10px;
  }
`

export const Box = styled.div`
  width: 100%;
  background: #fff;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 2px 0px;
  border-radius: 3px;
  padding: 10px;
  cursor: default;
  display: flex;

  > span {
    display: flex;
    flex: 1;
  }

  &:hover {
    background: rgb(235, 236, 240);
  }
`

export const Icons = styled.div`
  a {
    color: rgb(23, 43, 77);
  }

  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`

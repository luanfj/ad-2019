import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 230px;
  background: #f4f5f7;
  border-right: 1px solid rgb(223, 225, 230);
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 4px;

  h3 {
    color: #42526e;
    font-size: 15px;
    width: 100%;
    text-align: center;
    margin-bottom: 15px;
  }
`

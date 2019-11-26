import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-family: 'BMDOHYEON';
  width: 20em;
  border: #ffae6a solid 1px;
  box-sizing:border-box;
`

const ListContainer = styled.div`
  width:100%;
  height:20em;
  overflow-x:hidden;
  overflow-y:auto;
  box-sizing:border-box;
  margin-top:0.2em;
  background-color:white;
`

const Components = props => {

  const { title, list } = props

  return (
    <Container>
      {title}
      <ListContainer>
        { list !== undefined ? list.map(value => value) : undefined }
      </ListContainer>
    </Container>
  )
}

export default Components
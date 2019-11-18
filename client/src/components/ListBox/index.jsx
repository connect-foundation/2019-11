import React from 'react'
import styled from 'styled-components'
import ListHeader from './ListHeader'
import ListItem from './ListItem'

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

  const { title, list, selected, onItemClick } = props

  const handleSelected = (idx) => { onItemClick(idx) }

  return (
    <Container>
      <ListHeader text={title} />
      <ListContainer>
        {
          list !== undefined ?
          list.map((value, idx) => <ListItem text={value} selected={selected === idx} onClick={() => handleSelected(idx)} />) :
          list
        }
      </ListContainer>
    </Container>
  )
}

export default Components
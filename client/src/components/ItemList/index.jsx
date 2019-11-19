import React, { useState }from 'react'
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

  const { title, list } = props

  const [selectedIdx, setSelectedIdx] = useState(-1);
  const handleSelected = (idx) =>{
    setSelectedIdx(idx)
    props.callback(idx)
  }

  return (
    <Container>
      <ListHeader text={title}/>
      <ListContainer>
        {
          list.map((value, idx) => <ListItem text={value} selected={selectedIdx === idx} event={() => handleSelected(idx)}/>)
        }
      </ListContainer>
    </Container>
  )
}

export default Components
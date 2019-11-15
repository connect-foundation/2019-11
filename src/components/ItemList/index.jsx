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
  height:30em;
  overflow-x:hidden;
  overflow-y:auto;
  box-sizing:border-box;
  margin-top:0.2em;
  background-color:whitesmoke;
`

const Components = props => {

  const [title, setTitle] = useState('선택해주세요')
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const handleSelected = (idx) =>{
    setSelectedIdx(idx)
    setTitle(props.list[idx])
    props.callback(idx)
  }

  return (
    <Container>
      <ListHeader text={title}/>
      <ListContainer>
        {
          props.list.map((value, idx) => <ListItem text={value} selected={selectedIdx === idx} event={() => handleSelected(idx)}/>)
        }
      </ListContainer>
    </Container>
  )
}

export default Components
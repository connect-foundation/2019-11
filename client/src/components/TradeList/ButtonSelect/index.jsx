import styled from 'styled-components';
import React, { useState , useEffect} from 'react';

const ButtonSB = styled.button`
all:unset;
background-color: ${props => props.state ? "#FEAA6E":"#FEF2C7"};
text-align:center;
width:3rem;
height:2rem;
margin:0 0.1rem 0 0.1rem;
border-radius:0.5rem;
&:hover{
  cursor:pointer;
}
`

function ButtonSelect(props) {
    const [select,setSelect] = useState(true);
    function clckbutton(){
        props.select()
        if(select) setSelect(false);
        else setSelect(true);
        
    }
    return (
        <ButtonSB onClick={clckbutton} state={select}>
        {props.name}
        </ButtonSB>
    );
  }
  
  export default ButtonSelect;
import styled from 'styled-components';
import React, { useState } from 'react';
const Ul= styled.ul` 
list-style: none;
padding:0 0 0 0;
margin:0 0 0 0;
height:2rem;
`;
const Li = styled.li`
display: list-item;
list-style: none;
margin:0 0 0 0;
padding:0 0 0 0;
border:0;
float:right;
`;

const ButtonDay = styled.button`
all:unset;
background-color: ${props => props.state ? "#FEAA6E":"#FEF2C7"};
text-align:center;
width:3rem;
height:2rem;
margin:0 0.1rem 0 0.1rem;
&:hover{
  cursor:pointer;
}
&:active{
    background-color: #FEAA6E;
}
`

function ButtonDays(props) {
    const [day,setDay] = useState(true);
    const [week,setWeek] = useState(false);
    const [year,setYear] = useState(false);
    const [year3,setYear3] = useState(false);

    function checkday(){
        props.select_1d()
        setDay(true);
        setWeek(false);
        setYear(false);
        setYear3(false);
    }

    function checkweek(){
        props.select_1w();
        setDay(false);
        setWeek(true);
        setYear(false);
        setYear3(false);
    }

    function checkyear(){
        props.select_1y();
        setDay(false);
        setWeek(false);
        setYear(true);
        setYear3(false);
    }

    function checkyear3(){
        props.select_3y();
        setDay(false);
        setWeek(false);
        setYear(false);
        setYear3(true);
    }

    return (       
        <Ul>
            <Li>
                <ButtonDay onClick={checkyear3} state={year3}>
                    3년
                </ButtonDay>
            </Li>
            <Li>
                <ButtonDay onClick={checkyear} state={year}>
                    1년
                </ButtonDay>
            </Li>
            <Li>
                <ButtonDay onClick={checkweek} state={week}>
                    1주일
                </ButtonDay>
            </Li>
            <Li>
                <ButtonDay onClick={checkday} state={day}>
                    1일
                </ButtonDay>
            </Li>
        </Ul>
    );
  }
  
  export default ButtonDays;
import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    all:unset;

    border-color:#FEAA6E;
    border:solid 0.1rem;
    text-align:center;
    color:#FEAA6E;
    width:10rem;
    height:3rem;
    border-radius:0.5rem;

    &:hover{
        cursor:pointer;
    }

    &:active{
        background-color:#FEAA6E;
        color:white;
    }
`

const CreateButton = (props) => {
    return (
        <Button>
            판매자와 대화나누기
        </Button>
    )
}

export default CreateButton



import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    all:unset;

    border-color:var(--color-primary);
    border:solid 0.1rem;
    text-align:center;
    color:var(--color-primary);
    width:10rem;
    height:3rem;
    border-radius:0.5rem;

    &:hover{
        cursor:pointer;
    }

    &:active{
        background-color:var(--color-primary);
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



import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 20rem;
    height: 20rem;
    display:flex;
    justify-content:center;
    align-items:center;
    text-align: center;
    flex-direction: column;
    background-color: white;
`

const Button = styled.input`
    display: inline-block;
    width: 15rem;
    height: 15rem;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 15rem 0 0 0;
    background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpIjkbjiYaOXrIsSOnHx_JNsnKywIPgOmNrE3YSGIQmAtD6bkM&s') no-repeat center center;
    background-size:cover;
    border:none;
    outline: none;

    transition: background .5s ease-in-out;

    &:hover{
        background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPUnl4fCTUsfUSlMwG6ulPrs7OJZSlpa6hSoRdDPAKId81_BGw&s');
    }
`

const Span = styled.span`
    font-family: 'BMJUA';
    width: 100%;
    word-break: keep-all;
`

const Component = (props) => {

    const { trigger } = props;
    const handleFile = ev => {
        const files = ev.target.files;
        trigger(files)
    }

    return (
        <Container>
            <Button type={'file'} onChange={handleFile}/>
            <Span>이미지를 끌어다 놓거나 클릭해주세요</Span>
        </Container>
    )
}

export default Component
import React, { useState } from 'react';
import styled from 'styled-components'
import ImgIcon from './ImageIcon'
import TextIcon from './TextIcon'

const Wrapper = styled.li`
    position: relative;
    width: 100%;
    height: 4em;
    margin-bottom: 0.1em;
`

const Components = (props) => {
    
    return (
        <Wrapper>
            <ImgIcon src={props.img}></ImgIcon>
            <TextIcon active={props.active} onClick={props.onClick}>{props.text}</TextIcon>
        </Wrapper>
    )
}

export default Components
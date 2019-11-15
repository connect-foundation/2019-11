import React from 'react';
import styled from 'styled-components';

const ImgIconStyle = styled.div`
    position: absolute;
    display: flex;

    top:0;
    left:0;
    bottom:0;
    right:0;
    z-index: 0;
    justify-content: center;
    align-items: center;
    img {
        width: 70%;
        height: 70%;
    }
`;

const ImgIcon = (props) => {
    return (
        <ImgIconStyle>
            <img src={props.img}/>
        </ImgIconStyle>
    );
}

export default ImgIcon
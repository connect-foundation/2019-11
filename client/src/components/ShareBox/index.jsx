import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styled from 'styled-components'
import KakaoLogo from '../../assets/kakaotalk.png'
import FacebookLogo from '../../assets/facebook.png'
import TwitterLogo from '../../assets/twitter.svg'
import URLLogo from '../../assets/url_icon.svg'

const Container = styled.div`
    position: relative;
    display:flex;
    width: fit-content;
    height: 80px;
    border: #cccccc solid 1px;
    background: #f3f3f3;
    padding: 5px 10px;
    justify-content: space-between;
`

const Wrapper = styled.div`
    display: flex;
    width: 70px;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    text-align:center;
    cursor:pointer;

    &:hover{
        background: rgba(192,192,192,0.6)
    }
`

const Logo = styled.img`
    width:40px;
    height: 40px;
    object-fit: cover;
`

const Title = styled.span`
    width: 100%;
    font-size:12px;
    font-weight: 700;
    margin: 3px 5px;
`

const ContainerTitle = styled.span`
    position:absolute;
    left: 10px;
    top: -9px;
    font-size: 14px;
    font-weight:bold;
`

const Component = props => {

    const { url } = props

    const [ copy, setCopy ] = useState(false)

    const handleFacebook = () => {}
    const handleTwitter = () => {}
    const handleKakao = () => {}

    return (
        <Container>
            <ContainerTitle>공유하기</ContainerTitle>
            <Wrapper>
                <Logo src={FacebookLogo} />
                <Title>Facebook</Title>
            </Wrapper>
            <Wrapper>
                <Logo src={TwitterLogo} />
                <Title>Twitter</Title>
            </Wrapper>
            <Wrapper>
                <Logo src={KakaoLogo} />
                <Title>Kakao Talk</Title>
            </Wrapper>
            <CopyToClipboard text={url}>
                <Wrapper>
                    <Logo src={URLLogo} />
                    <Title>URL</Title>
                </Wrapper>
            </CopyToClipboard>
        </Container>
    )
}

export default Component
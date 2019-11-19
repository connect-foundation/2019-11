import React, { useState, useEffect } from 'react'
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

const LinkWrapper = styled.a`
    outline:none;
    border:none;
    text-decoration: none;
    color: black;
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
export const componentDidMount = () => {
    console.log("Test");
}

const handleKakao = (object) => {

    //const { id , title, description, image } = object

    window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '잘돌아가는건',
          description: '히오스 로고뿐',
          imageUrl: 'https://t1.daumcdn.net/cfile/tistory/99916A3359C745F42E',
          link: {
            webUrl: 'http://www.palda.shop'
          }
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              webUrl: 'http://www.palda.shop'
            }
          },
        ]
      });
}


const Component = props => {

    const { url } = props

    useEffect(() => {
        window.Kakao.init('3e60e52d3ff296f46273d8da0462dc40')
    }, [])

    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse`
    const twitterUrl = `https://twitter.com/intent/tweet?text=지금 경매에 참여하세요%0A${url}`

    const [copy, setCopy] = useState(false)

    return (
        <Container>
            <ContainerTitle>공유하기</ContainerTitle>
            <Wrapper>
                <LinkWrapper target="_blank" href={facebookUrl}>
                    <Logo src={FacebookLogo} />
                    <Title>Facebook</Title>
                </LinkWrapper>
            </Wrapper>
            <Wrapper>
                <LinkWrapper target="_blank" href={twitterUrl}>
                    <Logo src={TwitterLogo} />
                    <Title>Twitter</Title>
                </LinkWrapper>
            </Wrapper>
            <Wrapper onClick={ev => { handleKakao() }}>
                <Logo id={'#kakaoLink'} src={KakaoLogo} />
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
import React, { useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import styled from "styled-components";
import KakaoLogo from "../../../assets/kakaoShareIcon.svg";
import FacebookLogo from "../../../assets/fbShareIcon.svg";
import TwitterLogo from "../../../assets/twitterShareIcon.svg";
import URLLogo from "../../../assets/urlShareIcon.svg";

import apiConfig from "../../../config/api";

const Container = styled.div`
  position: relative;
  display: flex;
  width: ${props => props.width}rem;
  min-width: fit-content;
  height: 80px;
  background: var(--color-gary-lighter);
  padding: 5px 10px;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  width: 70px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  color: var(--color-darkgray-lighter);

  &:hover {
    color: var(--color-primary);
  }
`;

const LinkWrapper = styled.a`
  outline: none;
  border: none;
  text-decoration: none;
  color: inherit;
`;

const Logo = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const Title = styled.span`
  width: 100%;
  font-size: 12px;
  font-weight: 700;
  margin: 3px 5px;
`;

const handleKakao = (url, object) => {
  window.Kakao.Link.sendDefault({
    objectType: "feed",
    content: {
      title: object.title,
      description: object.contents,
      imageUrl: object.thumbnailUrl || object.thumbnail,
      link: {
        webUrl: url
      }
    },
    buttons: [
      {
        title: "웹으로 보기",
        link: {
          webUrl: url
        }
      }
    ]
  });
};

const Component = ({ url, object, width }) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) window.Kakao.init(apiConfig.kakaoKey);
  }, []);

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&amp;src=sdkpreparse`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=지금 경매에 참여하세요%0A${url}`;

  return (
    <Container width={width}>
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
      <Wrapper
        onClick={ev => {
          handleKakao(url, object);
        }}
      >
        <Logo id={"#kakaoLink"} src={KakaoLogo} />
        <Title>Kakao Talk</Title>
      </Wrapper>
      <CopyToClipboard text={url}>
        <Wrapper>
          <Logo src={URLLogo} />
          <Title>URL</Title>
        </Wrapper>
      </CopyToClipboard>
    </Container>
  );
};

export default Component;

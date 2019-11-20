import React from "react";
import styled from "styled-components";

import FbShareIcon from "../../assets/fbShareIcon.svg";
import KaKaoShareIcon from "../../assets/kakaoShareIcon.svg";
import TwitterShareIcon from "../../assets/twitterShareIcon.svg";
import UrlShareIcon from "../../assets/urlShareIcon.svg";

const ShareCollectionStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconList = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: var(--padding-sm);
  margin-right: var(--margin-sm);
  cursor: pointer;
`;

const IconImage = styled.img`
  ${IconBox}:hover & {
    border: 1px solid var(--color-gray);
    border-radius: 50%;
  }
`;

const IconTitle = styled.div`
  margin-top: var(--margin-sm);
  text-align: center;
  color: var(--color-darkgray-lighter);
  font-size: 0.7rem;
`;

const ShareCollection = () => {
  return (
    <ShareCollectionStyle>
      <IconList>
        <IconBox>
          <IconImage src={FbShareIcon} />
          <IconTitle>facebook</IconTitle>
        </IconBox>
        <IconBox>
          <IconImage src={KaKaoShareIcon} />
          <IconTitle>kakao</IconTitle>
        </IconBox>
        <IconBox>
          <IconImage src={TwitterShareIcon} />
          <IconTitle>twitter</IconTitle>
        </IconBox>
        <IconBox>
          <IconImage src={UrlShareIcon} />
          <IconTitle>url</IconTitle>
        </IconBox>
      </IconList>
    </ShareCollectionStyle>
  );
};

export default ShareCollection;

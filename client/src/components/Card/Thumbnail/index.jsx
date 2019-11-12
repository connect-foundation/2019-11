import React from 'react';
import styled from 'styled-components';

const ThumbnailStyle = styled.div`
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  padding: 0.2rem;
  border-radius: 0.5rem;
  img {
    height: 100%;
  }
`;

const Thumbnail = (props) => {
  return(
    <ThumbnailStyle>
      <img src={props.thumbnail}/>
    </ThumbnailStyle>
  )
}

export default Thumbnail;
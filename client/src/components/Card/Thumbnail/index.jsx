import React from 'react';
import styled from 'styled-components';

const ThumbnailStyle = styled.div`
  display: block;
  height: 10rem;
  border-radius: 1rem 1rem 0 0;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
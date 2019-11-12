import React from 'react';
import styled from 'styled-components';

const ThumbnailStyle = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
  overflow: hidden;
  img {
    border-radius: 1rem;
    width: 10rem;
    height: 10rem;
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
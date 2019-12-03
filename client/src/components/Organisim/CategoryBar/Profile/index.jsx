import React, { useState } from "react";
import styled from "styled-components";
import DefaultProfileIcon from "../../../../assets/default-profile.svg";

const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  height: 3em;
  overflow: hidden;
  background: white;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    margin-top: 0.5em;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Profile = ({ onClick }) => {
  const [picture, setPicture] = useState(null);
  return (
    <ProfileContainer>
      <img
        src={picture === null ? DefaultProfileIcon : null}
        onClick={onClick}
        data-idx={0}
      />
    </ProfileContainer>
  );
};

export default Profile;

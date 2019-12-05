import React, { useState, useContext } from "react";
import styled from "styled-components";
import DefaultProfileIcon from "../../../../assets/default-profile.svg";
import userContext from "../../../../context/UserContext";

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
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Profile = ({ onClick }) => {
  const [user] = useContext(userContext);
  return (
    <ProfileContainer>
      <img
        src={
          user.profileUrl === (undefined || null)
            ? DefaultProfileIcon
            : user.profileUrl
        }
        onClick={onClick}
        data-idx={0}
      />
    </ProfileContainer>
  );
};

export default Profile;

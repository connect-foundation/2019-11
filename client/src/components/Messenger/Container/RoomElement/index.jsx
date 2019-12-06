import styled from "styled-components"
import React, { useState, useEffect } from "react"
import DefaultProfileIcon from "../../../../assets/default-profile.svg"

import apiConfig from "../../../../config/api"
import pathConfig from "../../../../config/path"

const { apiUrl } = apiConfig
const { users } = pathConfig

const Wrap = styled.div`
  width: 19.5rem;
  height: 3rem;

  display: flex;
  flex-direction: row;
  padding: 0.25rem 0.25rem;
  margin-bottom: 0.5rem;
`

const Img = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  background-color: white;
  overflow: hidden;
  text-align: center;
  margin: 0 0.5rem 0 0;
  img {
    margin-top: 0.5em;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const RoomContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`
const HostName = styled.div`
  color: #6e6e6e;
  font-size: 0.8rem;
  text-align: left;
  margin-bottom: 0.1rem;
`
const HostRecentMsg = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 15rem;
  text-align: left;
`

function RoomElement(props) {
  const [name, setName] = useState("unknown")
  const [profile, setProfile] = useState(null)
  //userId
  useEffect(() => {
    fetch(`${apiUrl}${users.find}${props.userLoginId}`)
      .then(result => {
        return result.json()
      })
      .then(result => {
        setName(result.name)
        setProfile(result.profileUrl)
      })
  }, [])
  return (
    <Wrap onClick={() => props.clickroom()}>
      <Img>
        <img src={profile === null ? DefaultProfileIcon : profile} />
      </Img>
      <RoomContent>
        <HostName>{name}</HostName>
        <div>
          <HostRecentMsg>{props.RecentMsg}</HostRecentMsg>
        </div>
      </RoomContent>
    </Wrap>
  )
}

export default RoomElement

import styled from 'styled-components';
import React from 'react';

const Wrap= styled.div`
width:19.5rem;
height:3rem;


display:flex;
flex-direction:row;
padding:0.25rem 0.25rem;
margin-bottom : 0.5rem;

`;

const Img= styled.div`
width:3rem;
height:3rem;
color:white;
border-radius:3rem;
background-color:black;
text-align:center;
margin:0 0.5rem 0 0;
`;
const RoomContent= styled.div`
    display:flex;
    flex-direction:column;
    padding: 0.5rem 0;
`;
const HostName= styled.div`
    color:#6E6E6E;
    font-size:0.8rem;
    text-align:left;
    margin-bottom:0.1rem;
`;
const HostRecentMsg= styled.span`
display:inline-block;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
width: 15rem;
text-align:left;
`;

function MessengerRoom(props) {

    return (
      <Wrap>
        <Img>{props.Img}</Img>
        <RoomContent>
            <HostName>
                {props.Name}
            </HostName>
            <div>
                <HostRecentMsg>
                    {props.RecentMsg}
                </HostRecentMsg>
            </div>
        </RoomContent>
      </Wrap>
    );
  }
  
  export default MessengerRoom;
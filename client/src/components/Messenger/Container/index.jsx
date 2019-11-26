import styled from 'styled-components';
import React, {useState,useEffect}from 'react';
import RoomElement from './RoomElement';
import ChatCotainer from './ChatCotainer';

const MessengerDiv= styled.div` 
    position:fixed;
    bottom:7rem;
    right:1rem;
    width:20rem;
    height:25rem;
    border:solid 0.1rem;
    border-color:var(--color-primary);
    background-color:white;

    z-index:10000;

    &::after{
        content: '';
        position: absolute;
        border-top: 1rem solid var(--color-primary);
        border-right: 0.5rem solid transparent;
        border-left: 0.5rem solid transparent;
        bottom: -1rem;
        right: 1.5rem;
    } 
`;

const MessengerScroll = styled.div`
width:100%;
height:100%;
overflow-x:hidden;
overflow-y:auto;
`;
function Container(props) {

    const [RoomList,setRoomList] = useState([]);
    const [ChatHistory,setChatHistory] = useState([]);
    const [isRoomList,setIsRoomList] = useState(true);

    function initRoomList(){
        setRoomList([]);
    }
    function initChat(){
        setChatHistory([]);
    }
    function clickRoomList(flag){
        setIsRoomList(flag);
    }
    
    let initMessenger = () =>{
        return isRoomList ? 
        <MessengerScroll>
    <RoomElement clickroom={()=>{clickRoomList(false)}} Img={"A"} Name={"과장님"} RecentMsg={"ㅇ야ㅑ야야야야ㅑ야야야야ㅑ야야야ㅑ야야야야ㅑ양"}/>
    <RoomElement Img={"B"} Name={"주임님"} RecentMsg={"부재중 전화 112통"}/>
    <RoomElement Img={"E"} Name={"거래처"} RecentMsg={"부재중 전화 2통"}/>
    <RoomElement Img={"A"} Name={"과장님"} RecentMsg={"부재중 전화 21통"}/>
    <RoomElement Img={"B"} Name={"주임님"} RecentMsg={"부재중 전화 11통"}/>
    <RoomElement Img={"E"} Name={"거래처"} RecentMsg={"부재중 전화 2통"}/>
    <RoomElement Img={"A"} Name={"과장님"} RecentMsg={"부재중 전화 21통"}/>
    <RoomElement Img={"B"} Name={"주임님"} RecentMsg={"부재중 전화 11통"}/>
    <RoomElement Img={"E"} Name={"거래처"} RecentMsg={"부재중 전화 2통"}/>
        </MessengerScroll>
        :<ChatCotainer clickback={()=>{clickRoomList(true)}} ></ChatCotainer>
    }

    useEffect(()=>{
        initMessenger();
    },[isRoomList])

    return (
        <MessengerDiv>
                {initMessenger()}
        </MessengerDiv>
    );
  }
  
  export default Container;
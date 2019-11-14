import styled from 'styled-components';
import React, { useState , useEffect} from 'react';
import MessengerButton from './MessengerButton';
import MessengerWrap from './MessengerWrap';

function Messenger(props) {
    const [show,setShow] = useState(false);

    function ChangeState(){
      if(show){
        setShow(false);
      }else{
        setShow(true);
      }
    }

    let MessengerContent = null;
    if(show){
      MessengerContent = <MessengerWrap/>
    }
    return (
      <>
        {MessengerContent}
        <MessengerButton select={()=>ChangeState()}/>
      </>
    );
  }
  
  export default Messenger;
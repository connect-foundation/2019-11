import React, { useState } from 'react';
import MainButton from './MainButton';
import Container from './Container';

function Messenger(props) {
    const [show,setShow] = useState(false);

    function ChangeState(){
      setShow(!show);
    }

    let MessengerContent = null;
    if(show){
      MessengerContent = <Container/>
    }
    return (
      <>
        {MessengerContent}
        <MainButton select={()=>ChangeState()}/>
      </>
    );
  }
  
  export default Messenger;
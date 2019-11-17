import React, { useState } from 'react';
import MessengerButton from './MessengerButton';
import MessengerWrap from './MessengerWrap';

function Messenger(props) {
    const [show,setShow] = useState(false);

    function ChangeState(){
      setShow(!show);
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
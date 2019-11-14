import React from 'react';
import MessengerButton from '../components/Messenger/MessengerButton';
import MessengerWrap from '../components/Messenger/MessengerWrap';

export default {
  title: 'Messenger',
};



export const MainButton = () => {
  return(
      <>
      <MessengerButton>
      </MessengerButton>
      </>
  )
}

export const MessengerContents = () => {
  return(
      <>
      <MessengerWrap>
      </MessengerWrap>
      </>
  )
}
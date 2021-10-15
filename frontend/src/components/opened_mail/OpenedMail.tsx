import React from 'react'
import { MailContextContainer } from './Styled';
import { Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons';

import { FetchedMail } from '../types/FetchedMail';


// -------------------- Declaring types and interfaces -------------------- 
type Props  = {
  openedMail: FetchedMail;
  setIsNewMail: Function;
  setSendTo: Function;
}

// -------------------- The component itself -------------------- 
const OpenedMail = (
  {
    openedMail, 
    setIsNewMail, 
    setSendTo
  }: Props) => {
  
  function handleClick() {
    setIsNewMail(true);
    setSendTo(openedMail.fromEmailAddress)
  }

	return (
		<MailContextContainer>
      <h1>Subject: {openedMail?.subject}</h1>
      <h2>
        From: <span className="from">{openedMail?.from}</span>
        <span className="email-address">{`<${openedMail?.fromEmailAddress}>`}</span>
      </h2>
      <div>
        <span className="message">{openedMail?.message}</span>
      </div>
      <Button onClick={handleClick} className="reply-button" icon={<RollbackOutlined />}>Reply</Button>
		</MailContextContainer>
	)
}

export default OpenedMail

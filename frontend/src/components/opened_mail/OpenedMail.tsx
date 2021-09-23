import React from 'react'
import { MailContextContainer } from './Styled';
import { Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons';

import FetchedMail from '../interfaces/FetchedMail.js'

// -------------------- Declaring types and interfaces -------------------- 
type Props  = {
  openedMail: FetchedMail;
  setIsNewMail: Function;
  setSendTo: Function;
}

// -------------------- The component itself -------------------- 
const OpenedMail: React.FC<Props> = props => {
  
  function handleClick() {
    props.setIsNewMail(true);
    props.setSendTo(props.openedMail.fromEmailAddress)
  }

	return (
		<MailContextContainer>
      <h1>Subject: {props.openedMail?.subject}</h1>
      <h2>From: <span className="from">{props.openedMail?.from}</span><span className="email-address">{`<${props.openedMail?.fromEmailAddress}>`}</span></h2>
      <div>
        <span className="message">{props.openedMail?.message}</span>
      </div>
      {/* <Button onClick={() => props.setIsNewMail(true)} className="reply-button" icon={<RollbackOutlined />}>Reply</Button> */}
      <Button onClick={handleClick} className="reply-button" icon={<RollbackOutlined />}>Reply</Button>
		</MailContextContainer>
	)
}

export default OpenedMail

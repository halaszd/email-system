import React from 'react'
import { useState } from 'react';
import styled from '@emotion/styled'

import { Button } from 'antd'
import { RollbackOutlined } from '@ant-design/icons';

import NewMail from '../new_mail/NewMail';

import FetchedMail from '../interfaces/FetchedMail.js'

// -------------------- Style -------------------- 
const MailContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;

  .reply-button {
    width: 100px;
  }
    h1 {
    font-size: 1.375rem;
    color: #202124;
    font-weight: 400;
    }

    h2 {
    font-size: .875rem;
    letter-spacing: .2px;
    color: #202124;
    line-height: 20px;

    .from {
      font-weight: bold;
    }

    .email-address {
      font-size:  medium;
      white-space: nowrap;
      font-size: .75rem;
      letter-spacing: .3px;
      color: #5f6368;
    }
   }

  .message {
    color: #222;
  }
`;

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

import React from 'react'
import styled from '@emotion/styled'
import { Checkbox } from 'antd';

const MailContainer = styled.div`
  display: flex;
  gap: 10px;
  background-color: #f4f7f7;
  border-top: 1px solid #eceff1;

  .message-infos {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;

    .from-subject, .message {
       overflow-x: hidden;
       text-overflow: ellipsis;
    }

    .message {
      color: #5f6368;
    }
  }
`;

// -------------------- Declaring types and interfaces -------------------- 
type Props = {
	from: string;
	subject: string;
	message: string;
	id: number;
	isOpenedMail: boolean;
	setIsOpenedMail: Function;
}

// -------------------- The component itself -------------------- 
const Mail = ({from, subject, message, id, isOpenedMail, setIsOpenedMail}: Props) => {
	return (
		<MailContainer>
      <div>
		    <Checkbox></Checkbox>
      </div>
      <div className= "message-infos">
        <span className="from-subject">From: {from}</span>	
        <span className="from-subject">Subject: {subject}</span>	
        <span className="message">Message: {message}</span>
      </div>
		</MailContainer>
	)
}

export default Mail

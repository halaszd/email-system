import React from 'react'
import styled from '@emotion/styled'
import { Checkbox } from 'antd';

const MailContainer = styled.form`
  display: flex;
  gap: 10px;
  background-color: #f4f7f7;
  border-top: 1px solid #eceff1;
  padding: 10px 10px 5px 20px;

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
  typeOfMail: "inbox" | "sent" | "trash" | "";
	from: string;
  fromEmailAddress: string;
	to: string;
  toEmailAddress: string;
	subject: string;
	message: string;
	id: number;
	setIsOpenedMail: Function;
  setOpenedMailID: Function;
}

// -------------------- The component itself -------------------- 
// const Mail = ({subject, message, id, isOpenedMail, setIsOpenedMail}: Props) => {
const Mail: React.FC<Props> = props => {
	return (
		<MailContainer onClick={() => {props.setIsOpenedMail(true); props.setOpenedMailID(props.id)}}>
      <div>
		    <Checkbox></Checkbox>
      </div>
      <div className= "message-infos">
        {console.log(props.typeOfMail)}
        { props.typeOfMail === 'inbox' || props.typeOfMail === 'trash'
          ? <span className="from-subject">From: {props.from}</span>	
          : <span className="from-subject">To: {props.to}</span>	
        }
        <span className="from-subject">Subject: {props.subject}</span>	
        <span className="message">Message: {props.message}</span>
      </div>
		</MailContainer>
	)
}

export default Mail

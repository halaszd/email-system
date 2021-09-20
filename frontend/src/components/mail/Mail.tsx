import React from 'react'
import styled from '@emotion/styled'
import { Checkbox } from 'antd';

const MailContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
      <div>
        <span className="from-subject">{from}</span>	
        <span className="from-subject">{subject}</span>	
        <span className="message">{message}</span>
      </div>
		</MailContainer>
	)
}

export default Mail

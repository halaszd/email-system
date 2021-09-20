import React from 'react'
import styled from '@emotion/styled'

import { useState, useEffect } from 'react';

import Mail from '../mail/Mail';
import OpenedMail from '../opened_mail/OpenedMail';

// -------------------- Style -------------------- 
const Mails = styled.div`
  width: calc(100vw - 220px);
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  
  h1 {
    text-align: center;
  }
`;

// -------------------- Declaring types and interfaces -------------------- 
interface FetchedMail {
  from: string;
  to: string;
  subject: string;
  message: string;
  id: number;
}

// -------------------- The component itself -------------------- 
const Inbox = () => {
  const [mails, setMails] = useState<FetchedMail[]>();
  const [isOpenedMail, setIsOpenedMail] = useState(false);

  useEffect(() => {
    fetchMails();
  }, [])

  const fetchMails = async () => {
    const response = await fetch('http://localhost:3001/api/mails');
    const respJSON = await response.json();
    setMails(respJSON["mails"]);
  }

  
	return (
		<Mails>
			<h1>Inbox</h1>
      {mails && mails.map((mail, index) => {
        return (
        <Mail from={mail.from} subject={mail.subject} message={mail.message} id={mail.id} isOpenedMail={isOpenedMail} setIsOpenedMail={setIsOpenedMail}/>
        )
      })}
		</Mails>
	)
}

export default Inbox

import styled from '@emotion/styled'
import FetchedMail from '../interfaces/FetchedMail';

import { useState, useEffect } from 'react';

import Mail from '../mail/Mail';
import OpenedMail from '../opened_mail/OpenedMail';

// -------------------- Style -------------------- 
const MailsContainer = styled.div`
  width: calc(100vw - 220px);
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  
  h1 {
    text-align: center;
  }
`;

// -------------------- Declaring types and interfaces -------------------- 
type Props = {
  boxType: "inbox" | "sent" | "trash";
  isOpenedMail: boolean;
  setIsOpenedMail: Function;
}

type openedMailId = number | null;

// -------------------- The component itself -------------------- 
const Mails: React.FC<Props> = props => {
  const [mails, setMails] = useState<FetchedMail[]>([]);
  const [openedMailID, setOpenedMailID] = useState<openedMailId>(null);
  const [openedMail, setOpenedMail] = useState<FetchedMail> ({from: "", to: "", subject: "", message: "", id:0});
  // const [openedMail, setOpenedMail] = useState<object> ();

  useEffect(() => {
    fetchMails();
  }, [])

  useEffect(() => {
    if(props.isOpenedMail) {
      for(const mail of mails) {
        if(openedMailID === mail.id) {
          console.log(mail)
          setOpenedMail(mail)
        }
      }
    }
  }, [props.isOpenedMail])

  const fetchMails = async () => {
    const response = await fetch('http://localhost:3001/api/mails');
    const respJSON = await response.json();
    setMails(respJSON["mails"]);
  }

	return (
    <>
    { !props.isOpenedMail 
      ?
      <MailsContainer>
        <h1>Inbox</h1>
        {mails && mails.map((mail, index) => {
          return (
            props.boxType === 'inbox'
              ? <Mail from={mail.from} subject={mail.subject} message={mail.message} id={mail.id} setIsOpenedMail={props.setIsOpenedMail} setOpenedMailID={setOpenedMailID} />
              :<Mail to={mail.to} subject={mail.subject} message={mail.message} id={mail.id} setIsOpenedMail={props.setIsOpenedMail} setOpenedMailID={setOpenedMailID} />
          )
        })}
      </MailsContainer>

      : <OpenedMail openedMail={openedMail}/>
    }
    </>
	)
}

export default Mails

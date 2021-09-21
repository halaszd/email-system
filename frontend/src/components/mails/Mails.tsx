import styled from '@emotion/styled'
import {DeleteOutlined} from '@ant-design/icons'

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

  .delete-all {
    color: grey;
    align-self: flex-start;
    font-size: 20px;
    padding-bottom: 20px;
    padding-left: 20px;

    &:hover{
      cursor: pointer;
    }

    &.ready-to-delete {
      color: '#08c';
    }
  }
`;

// -------------------- Declaring types and interfaces -------------------- 
type Props = {
  typeOf: "inbox" | "sent" | "trash";
  typeOfMail: string | null;
  setTypeOfMail: Function;
  isOpenedMail: boolean;
  setIsOpenedMail: Function;
  setIsNewMail: Function;
  setSendTo: Function;
}

type openedMailId = number | null;

type FetchedMails = FetchedMail[] | null;

// -------------------- The component itself -------------------- 
const Mails: React.FC<Props> = props => {
  const [mails, setMails] = useState<FetchedMails>(null);
  const [openedMailID, setOpenedMailID] = useState<openedMailId>(null);
  const [openedMail, setOpenedMail] = useState<FetchedMail> ({
    from: "",
    fromEmailAddress: "",
    to: "", 
    toEmailAddress: "",
    subject: "", 
    message: "", 
    id: 0
  });
  const[checkedMailIDs, setCheckedMailIDs] = useState<number[]>([]);

  props.setTypeOfMail(props.typeOf);

  useEffect(() => {
    console.log("Inside")
    setMails(null);
    fetchMails();
  }, [props.typeOfMail] )

  useEffect(() => {
    if(mails !== null && props.isOpenedMail) {
      for(const mail of mails) {
        if(openedMailID === mail.id) {
          console.log(mail)
          setOpenedMail(mail)
        }
      }
    }
  }, [props.isOpenedMail])

  async function fetchMails() {
    const response = await fetch(`http://localhost:3001/api/mails/${props.typeOf}`);
    const respJSON = await response.json();
    setMails(respJSON["mails"]);
  }

	return (
    <>
    { !props.isOpenedMail 
      ?
      <MailsContainer>
        <h1>Inbox</h1>
        <DeleteOutlined className="delete-all" />
        <form onSubmit={() => console.log(1)}>
        {mails && mails.map((mail, index) => {
          return (
            <>
              <Mail 
              typeOf={props.typeOf} from={mail.from} fromEmailAddress={mail.fromEmailAddress} 
              to={mail.to} toEmailAddress={mail.fromEmailAddress} subject={mail.subject} message={mail.message} 
              id={mail.id} setIsOpenedMail={props.setIsOpenedMail} setOpenedMailID={setOpenedMailID} 
              checkedMailIDs={checkedMailIDs} setCheckedMailIDs={setCheckedMailIDs}/>
            </>
        )})}
        </form>
      </MailsContainer>

      : <OpenedMail openedMail={openedMail} setIsNewMail={props.setIsNewMail} setSendTo={props.setSendTo} />
    } 
    </>
	)
}

export default Mails
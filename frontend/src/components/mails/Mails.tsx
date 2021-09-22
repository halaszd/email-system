import styled from '@emotion/styled'
import {DeleteFilled} from '@ant-design/icons'

import FetchedMail from '../interfaces/FetchedMail';

import { useState, useEffect } from 'react';

import Mail from '../mail/Mail';
import OpenedMail from '../opened_mail/OpenedMail';

// -------------------- Style --------------------
const Header = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 30px;

  .trash-icon-container {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    left: 8px;

    &:hover{
      cursor: pointer;
      background-color: #eceff1;
      border-radius: 20px;

      &::after {
        content: "Delete";
        color: white;
        font-size: 10px;
        font-weight: bold;
        letter-spacing: 0.08rem;
        position: absolute;
        top: 41px;
        padding: 3px;
        background-color: grey;
        border-radius: 3px;
      }

      .delete-all {
        color: black;
      }
    }

    .delete-all {
      color: grey;
      font-size: 20px;
      transition: 0.3s;

      /* &.ready-to-delete {
        color: '#08c';
      } */
    }
  }

  h1 {
    font-weight: 600;
    margin-bottom: 0px;
    margin: auto;
  }
`;

const MailsContainer = styled.div`
  width: calc(100vw - 220px);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
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
  // To collect checked mails 
  const[checkedMailIDs, setCheckedMailIDs] = useState<number[]>([]);

  props.setTypeOfMail(props.typeOf);

  useEffect(() => {
    setMails(null);
    fetchMails();
  }, [props.typeOfMail] )

  useEffect(() => {
    if(mails !== null && props.isOpenedMail) {
      // Picks the clicked email to open
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

  function deleteCheckedMails() {
    // Deleting the checked mails and collecting them in another array
    const deletedMails: FetchedMail[] = [];
    const newMails: FetchedMail[] = [];

    if(mails === null) {
      return;
    }

    for(const mail of mails) {
      let isFoundMail = false;

      for(const id of checkedMailIDs) {
        if(mail.id === id) {
          // cCollecting deleted mails for further purpuses
          deletedMails.push(mail)
          isFoundMail = true;
          break;
        }
      }

      if(!isFoundMail) {
        newMails.push(mail)
      }
    }
    // Gives back only the not deleted emails
    setMails(newMails)
    // To clear the IDs of formerly checked emails
    setCheckedMailIDs([]);
  }

	return (
    <>
    { !props.isOpenedMail 
      ?
      <>
      <Header>
        <div className="trash-icon-container">
          <DeleteFilled className="delete-all" onClick={deleteCheckedMails}/>
        </div>
        {/* Making the first letter uppercase of props.typeOf */}
        <h1>{`${props.typeOf.charAt(0).toUpperCase()}${props.typeOf.slice(1)}`}</h1>
      </Header>
      <MailsContainer>
        {mails && mails.map((mail, index) => {
          return (
            <>
              <Mail 
              key={`${index}_${mail.id}`} typeOf={props.typeOf} from={mail.from} fromEmailAddress={mail.fromEmailAddress} 
              to={mail.to} toEmailAddress={mail.fromEmailAddress} subject={mail.subject} message={mail.message} 
              id={mail.id} setIsOpenedMail={props.setIsOpenedMail} setOpenedMailID={setOpenedMailID} 
              checkedMailIDs={checkedMailIDs} setCheckedMailIDs={setCheckedMailIDs}/>
            </>
        )})}
      </MailsContainer>
      </>

      : <OpenedMail openedMail={openedMail} setIsNewMail={props.setIsNewMail} setSendTo={props.setSendTo} />
    } 
    </>
	)
}

export default Mails

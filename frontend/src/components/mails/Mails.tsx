import {Header, MailsContainer } from './Styled';
import {DeleteFilled} from '@ant-design/icons'

import { useState, useEffect } from 'react';
  

import FetchedMail from '../interfaces/FetchedMail';

import Mail from '../mail/Mail';

// -------------------- Declaring types and interfaces -------------------- 
type FetchedMails = FetchedMail[] | null;

type Props = {
  mails: FetchedMails;
  setMails: Function;
  typeOf: "inbox" | "sent" | "trash";
  typeOfMail: string | null;
  setTypeOfMail: Function;
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
}

// -------------------- The component itself -------------------- 
const Mails: React.FC<Props> = props => {
  // To collect checked mails 
  const[checkedMailIDs, setCheckedMailIDs] = useState<number[]>([]);

  props.setTypeOfMail(props.typeOf);

  useEffect(() => {
    props.setMails(null);
    fetchMails()
  }, [props.typeOfMail] )

  async function fetchMails() {
    const response = await fetch(`http://localhost:3001/api/mails/${props.typeOf}`);
    const respJSON = await response.json();
    props.setMails(respJSON["mails"]);
  }

  function deleteCheckedMails() {
    // Deleting the checked mails and collecting them in another array
    const deletedMails: FetchedMail[] = [];
    const newMails: FetchedMail[] = [];

    if(props.mails === null) {
      return;
    }

    for(const mail of props.mails) {
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
    props.setMails(newMails)
    // To clear the IDs of formerly checked emails
    setCheckedMailIDs([]);
  }

	return (
    <>
      <Header>
        <div className="trash-icon-container">
          <DeleteFilled className="delete-all" onClick={deleteCheckedMails}/>
        </div>
        {/* Making the first letter uppercase of props.typeOf */}
        <h1>{`${props.typeOf.charAt(0).toUpperCase()}${props.typeOf.slice(1)}`}</h1>
      </Header>
      <MailsContainer>
        {props.mails && props.mails.map((mail, index) => {
          return (
            <>
              <Mail 
              key={`${index}_${mail.id}`} typeOf={props.typeOf} from={mail.from} fromEmailAddress={mail.fromEmailAddress} 
              to={mail.to} toEmailAddress={mail.fromEmailAddress} subject={mail.subject} message={mail.message} 
              id={mail.id} setIsOpenedMail={props.setIsOpenedMail} setOpenedMailID={props.setOpenedMailID} 
              checkedMailIDs={checkedMailIDs} setCheckedMailIDs={setCheckedMailIDs}/>
            </>
        )})}
      </MailsContainer>
    </>
	)
}

export default Mails

import React, { useContext } from 'react';
import {Header, MailsContainer } from './Styled';
import {DeleteFilled} from '@ant-design/icons'

import { useState, useEffect } from 'react';
import { MailContext } from '../useContexts/MailContext';

import FetchedMail from '../interfaces/FetchedMail';

import Mail from '../mail/Mail';

// -------------------- The component itself -------------------- 
const Mails = () => {
  const { mails, setMails, typeOfMail, setIsOpenedMail, setOpenedMailID } = useContext(MailContext);
   // To collect checked mails 
  const[checkedMailIDs, setCheckedMailIDs] = useState<number[]>([]);

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
          // Collecting deleted mails for further purpuses
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
      <Header>
        <div className="trash-icon-container">
          <DeleteFilled className="delete-all" onClick={deleteCheckedMails}/>
        </div>
        <h1>{`${typeOfMail.charAt(0).toUpperCase()}${typeOfMail.slice(1)}`}</h1>
      </Header>
      <MailsContainer>
        {mails && mails.map((mail, index) => {
          return (
            <>
              <Mail 
              key={`${index}_${mail.id}`} typeOf={typeOfMail} from={mail.from} fromEmailAddress={mail.fromEmailAddress} 
              to={mail.to} toEmailAddress={mail.fromEmailAddress} subject={mail.subject} message={mail.message} 
              id={mail.id} setIsOpenedMail={setIsOpenedMail} setOpenedMailID={setOpenedMailID} 
              checkedMailIDs={checkedMailIDs} setCheckedMailIDs={setCheckedMailIDs}/>
            </>
        )})}
      </MailsContainer>
    </>
	)
}

export default Mails

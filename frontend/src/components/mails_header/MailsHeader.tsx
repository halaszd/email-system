import React from 'react'
import { useContext } from 'react';
import { MailContext } from '../useContexts/MailContext';
import { FetchedMail } from '../types/FetchedMail';
import { Header, TrashIconContainer } from "./Styled";
import {DeleteFilled} from '@ant-design/icons'

const MailsHeader = () => {
	const {
    mails, 
    setCheckedMailIDs, 
    checkedMailIDs, 
    setMails, 
    typeOfMail
  } = useContext(MailContext);

	function deleteCheckedMails() {
		// Deleting the checked mails and collecting them in another array
		const deletedMails: FetchedMail[] = [];
		const newMails: FetchedMail[] = [];

		if(mails === []) {
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
		<div>
      <Header>
        <TrashIconContainer>
          <DeleteFilled className="delete-all" onClick={deleteCheckedMails}/>
        </TrashIconContainer>
        <h1>{`${typeOfMail.charAt(0).toUpperCase()}${typeOfMail.slice(1)}`}</h1>
      </Header>
			
		</div>
	)
}

export default MailsHeader

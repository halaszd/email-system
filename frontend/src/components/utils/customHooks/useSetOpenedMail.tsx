import { useState, useEffect } from 'react';
import { FetchedMails, FetchedMail } from '../types/FetchedMail';

const emptyMail: FetchedMail = 
{
	fromUser: {
		id: "",
		email: "",
		name: null
	}, 
	toUser: {
		id: "",
		email: "",
		name: null
	}, 
	email: {
		subject: "", 
		message: "", 
	},
	id: ""
}
 
export function useSetOpenedMail(
	mails: FetchedMails, 
	isOpenedMail: boolean,
	openedMailID: string | null) {

	const [openedMail, setOpenedMail] = useState<FetchedMail> (emptyMail);
	// console.log("inside useOpenMail", isOpenedMail)

	useEffect(() => {
		if(!mails.userMails || !openedMailID) {
			setOpenedMail(emptyMail);
			return;
		};
		
		// Picks the clicked email to open
		for(const mail of mails["userMails"]) {
			console.log(typeof openedMailID, typeof mail.id)
			if(openedMailID === mail.id) {
				// console.log(mail)
				setOpenedMail(mail)
				break;
			}
		}
	}, [isOpenedMail, openedMailID])

	return [ openedMail ];
}


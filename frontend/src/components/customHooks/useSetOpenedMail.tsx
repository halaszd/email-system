import { useState, useEffect } from 'react';
import { FetchedMails, FetchedMail } from '../types/FetchedMail';

const emptyMail: FetchedMail = 
{
	from: "",
	fromEmailAddress: "",
	to: "", 
	toEmailAddress: "",
	subject: "", 
	message: "", 
	id: 0
}
 
export function useSetOpenedMail(
	mails: FetchedMails, 
	isOpenedMail: boolean,
	openedMailID: number | null) {

	const [openedMail, setOpenedMail] = useState<FetchedMail> (emptyMail);

	useEffect(() => {
		if(!mails.mails || !openedMailID) {
			setOpenedMail(emptyMail);
			return;
		};
		
		// Picks the clicked email to open
		for(const mail of mails["mails"]) {
			if(openedMailID === mail.id) {
				// console.log(mail)
				setOpenedMail(mail)
			}
		}
	}, [isOpenedMail, openedMailID])

	return [ openedMail ];
}


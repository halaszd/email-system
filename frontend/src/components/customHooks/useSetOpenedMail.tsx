import { useState, useEffect } from 'react';
import { FetchedMail } from '../types/FetchedMail';

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
	mails: FetchedMail[], 
	isOpenedMail: boolean,
	openedMailID: number | null) {

	const [openedMail, setOpenedMail] = useState<FetchedMail> (emptyMail);

	useEffect(() => {
		// if(mails === null || isOpenedMail) {
		if(mails === null || !openedMailID) {
			setOpenedMail(emptyMail);
			console.log("NINCS OPENED MAIL ID NULL")
			return;
		};
		
		// Picks the clicked email to open
		for(const mail of mails) {
			if(openedMailID === mail.id) {
				console.log(mail)
				setOpenedMail(mail)
			}
		}
	}, [isOpenedMail, openedMailID])

	return [ openedMail ];
}


import { useState, useEffect } from 'react';
import { FetchedMail } from '../types/FetchedMail';

 
export function useSetOpenedMail(
	mails: FetchedMail[] | null, 
	isOpenedMail: boolean,
	openedMailID: number | null) {

	const [openedMail, setOpenedMail] = useState<FetchedMail> ({
		from: "",
		fromEmailAddress: "",
		to: "", 
		toEmailAddress: "",
		subject: "", 
		message: "", 
		id: 0
	});

	useEffect(() => {
		if(mails !== null && isOpenedMail) {

		// Picks the clicked email to open
		for(const mail of mails) {
			if(openedMailID === mail.id) {
			console.log(mail)
			setOpenedMail(mail)
			}
		}
		}
	}, [isOpenedMail, openedMailID])

	return [ openedMail ];
}


import React, { createContext } from 'react';
import { FetchedMail, FetchedMails } from '../types/FetchedMail';

type MailContextType = {
  isSideBarClicked?: boolean;
  mails: FetchedMails;
  setMails: Function;
  typeOfMail: "inbox" | "sent" | "trash";
  openedMail?: FetchedMail;
  isOpenedMail?: boolean;
  setIsOpenedMail: Function;
  openedMailID?: number | null;
  setOpenedMailID: Function;
  checkedMailIDs: number[];
  setCheckedMailIDs: Function;
}

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

const fetchedMails: FetchedMail[] = [];

export const MailContext = createContext<MailContextType>(
  {
    isSideBarClicked: false,
    mails: {totalNumOfMails: 0, mailsPerPage: 20, mails: fetchedMails},
    setMails: () => {},
    typeOfMail: "inbox",
    openedMail: emptyMail,
    isOpenedMail: false,
    setIsOpenedMail: () => {},
    openedMailID: null,
    setOpenedMailID: () => {},
    checkedMailIDs: [],
    setCheckedMailIDs: () => {}
  }
);

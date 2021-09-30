import React, { createContext } from 'react';
import { FetchedMail, FetchedMails } from '../types/FetchedMail';

type MailContextType = {
  mails: FetchedMails;
  setMails: Function;
  typeOfMail: "inbox" | "sent" | "trash";
  isOpenedMail?: boolean;
  setIsOpenedMail: Function;
  openedMailID?: number | null;
  setOpenedMailID: Function;
  checkedMailIDs: number[];
  setCheckedMailIDs: Function;
}

const fetchedMails: FetchedMail[] = [];

export const MailContext = createContext<MailContextType>(
  {
    mails: {totalNumOfMails: 0, mails: fetchedMails},
    setMails: () => {},
    typeOfMail: "inbox",
    isOpenedMail: false,
    setIsOpenedMail: () => {},
    openedMailID: null,
    setOpenedMailID: () => {},
    checkedMailIDs: [],
    setCheckedMailIDs: () => {}
  }
);

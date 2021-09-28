import React, { createContext } from 'react';
import { FetchedMail } from '../types/FetchedMail';

type MailContextType = {
  mails: FetchedMail[];
  setMails: Function;
  typeOfMail: "inbox" | "sent" | "trash";
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
}

const mails: FetchedMail[] = [];

export const MailContext = createContext<MailContextType>(
  {
    mails: mails,
    setMails: () => {},
    typeOfMail: "inbox",
    setIsOpenedMail: () => {},
    setOpenedMailID: () => {}
  }
);

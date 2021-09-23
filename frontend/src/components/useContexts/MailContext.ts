import React, { createContext } from 'react';
import FetchedMail from '../interfaces/FetchedMail';

interface MailContextType  {
  mails: FetchedMail[] | null;
  setMails: Function;
  typeOfMail: "inbox" | "sent" | "trash";
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
}

export const MailContext = createContext<MailContextType>(
   {
  mails: null,
  setMails: () => {}, 
  typeOfMail: "inbox",
  setIsOpenedMail: () => {},
  setOpenedMailID: () => {}
  }
);

import React, {createContext, useContext } from 'react';
import FetchedMail from '../interfaces/FetchedMail';

interface MailContextType  {
  mails: FetchedMail[] | null;
  setMails: Function;
  typeOfMail: string | null;
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
}

export const MailContext = createContext<MailContextType>(
   {
  mails: null,
  setMails: () => {}, 
  typeOfMail: null,
  setIsOpenedMail: () => {},
  setOpenedMailID: () => {}
  }
);

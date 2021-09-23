import React, {createContext, useContext } from 'react';
import FetchedMail from '../interfaces/FetchedMail';
type MailContextType = {
  mails: FetchedMail[] | null;
  setMails: Function;
  typeOfMail: string | null;
  setTypeOfMail: Function;
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
}

export const MailContext = createContext<MailContextType | null>(null);

import React, { createContext } from 'react';
import FetchedMail from '../interfaces/FetchedMail';

interface MailContextType  {
  typeOfMail: "inbox" | "sent" | "trash";
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
}

export const MailContext = createContext<MailContextType>(
   {
  typeOfMail: "inbox",
  setIsOpenedMail: () => {},
  setOpenedMailID: () => {}
  }
);

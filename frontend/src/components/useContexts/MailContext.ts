import React, { createContext } from 'react';

type MailContextType = {
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

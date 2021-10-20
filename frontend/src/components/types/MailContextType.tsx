import { FetchedMail, FetchedMails } from '../types/FetchedMail';

export type MailContextType = {
  // isSideBarClicked?: boolean;
  isSideBarClicked: boolean;
  setIsSideBarClicked: Function
  mails: FetchedMails;
  setMails: Function;
  // typeOfMail: "inbox" | "sent" | "trash";
  // openedMail?: FetchedMail;
  openedMail: FetchedMail;
  // isOpenedMail?: boolean;
  isOpenedMail: boolean;
  setIsOpenedMail: Function;
  // openedMailID?: number | null;
  openedMailID: number | null;
  setOpenedMailID: Function;
  checkedMailIDs: number[];
  setCheckedMailIDs: Function;
}
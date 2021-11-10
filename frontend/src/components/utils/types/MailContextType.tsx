import { FetchedMail, FetchedMails } from './FetchedMail';

export type MailContextType = {
  isToFetch: boolean;
  setIsToFetch: Function;
  isSideBarClicked: boolean;
  setIsSideBarClicked: Function;
  userEmail: string;
  setUserEmail: Function;
  mails: FetchedMails;
  setMails: Function;
  openedMail: FetchedMail;
  isOpenedMail: boolean;
  setIsOpenedMail: Function;
  openedMailID: string | null;
  setOpenedMailID: Function;
  checkedMailIDs: string[];
  setCheckedMailIDs: Function;
}
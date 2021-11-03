import { FetchedMail, FetchedMails } from './FetchedMail';

export type MailContextType = {
  // isSideBarClicked?: boolean;
  isSearchingResult: boolean;
  setIsSearchingResult: Function;
  isSideBarClicked: boolean;
  setIsSideBarClicked: Function;
  userEmail: string;
  setUserEmail: Function;
  mails: FetchedMails;
  setMails: Function;
  // typeOfMail: "inbox" | "sent" | "trash";
  // openedMail?: FetchedMail;
  openedMail: FetchedMail;
  // isOpenedMail?: boolean;
  isOpenedMail: boolean;
  setIsOpenedMail: Function;
  // openedMailID?: number | null;
  openedMailID: string | null;
  setOpenedMailID: Function;
  checkedMailIDs: string[];
  setCheckedMailIDs: Function;
}
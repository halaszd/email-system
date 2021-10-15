
export type FetchedMail = {
  from: string;
  fromEmailAddress: string;
  to: string;
  toEmailAddress: string;
  subject: string;
  message: string;
  id: number;
}

export type FetchedMails = {
  totalNumOfMails: number;
  mails: FetchedMail[];
}
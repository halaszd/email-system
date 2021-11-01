
export type FetchedMail = {
  __typename?: string;
  id: string;
  email: {
    subject: string;
    message: string;
    __typename?: string;
  }
  possessedBy?: {
    id: string;
    __typename?: string;
  }
  fromUser: {
    id: string;
    email: string;
    name: string | null;
    __typename?: string;
  }
  toUser: {
    id: string;
    email: string;
    name: string | null;
    __typename?: string;
  }
}

export type FetchedMails = {
  allInBoxtypeCount: number;
  mailsPerPage: number;
	typeOfMail: "inbox" | "sent" | "trash" | "all",
  userMails: FetchedMail[];
}
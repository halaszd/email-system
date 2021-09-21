
export default interface FetchedMail {
  typeOfMail: "inbox" | "sent" | "trash" | "";
  from: string;
  fromEmailAddress: string;
  to: string;
  toEmailAddress: string;
  subject: string;
  message: string;
  id: number;
}
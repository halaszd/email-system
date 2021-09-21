
export default interface FetchedMail {
  from: string;
  fromEmailAddress: string;
  to: string;
  toEmailAddress: string;
  subject: string;
  message: string;
  id: number;
}
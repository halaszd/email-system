import { MailsContainer } from './Styled';
import { useMail } from '../../utils/useContexts/MailContextProvider';
import { MAIL_QUERY } from '../../../queries_mutations';
import Mail from './mail/Mail';  
import OpenedMail from './opened_mail/OpenedMail';
import { useQuery } from '@apollo/client';

// -------------------- The component -------------------- 
type Props = {
  box : "inbox" | "sent" | "trash" | "all"
  setIsNewMail: Function;
  setSendTo: Function;
}
const Mails = ({
  box,
  setIsNewMail, 
  setSendTo
}: Props) => {
  
  const { userEmail, mails, isOpenedMail, setMails } = useMail();
  const { data, loading } = useQuery(MAIL_QUERY, {
    variables: {
      typeOfBox: box,
      userEmail: userEmail,
      orderBy: { createdAt: 'desc' }
    }
  });
  if(data) {
    setMails(data["emails"])
    console.log("mails: ", mails)
  } else{
    console.log("useremail: ", userEmail)
  }
  // console.log('mails in MAILS:', mails)
  console.log('data in MAILS: ', data)

	return (
    <>
    {!isOpenedMail
      ?
    <MailsContainer>
                      
      {/* {mails && mails["userMails"].map((mail, index) => { */}
      {data && data["emails"]["userMails"].map((mail: any, index: any) => {
        return (
            <Mail key={`${index}_${mail.id}`} mail={mail} />
      )})}
      {data && (
         <>
         {console.log(data)} 
         </> 
       ) } 
    </MailsContainer>

    :
    <OpenedMail setIsNewMail={setIsNewMail} setSendTo={setSendTo} />
    }
    </>
	)
}

export default Mails

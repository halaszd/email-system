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
  
  const {
    isToFetch,
    // setToFetch,
    userEmail, 
    mails: { 
      userMails 
    }, 
    isOpenedMail, 
    setMails 
  } = useMail();

  const { data, loading } = useQuery(MAIL_QUERY, {
    variables: {
      typeOfBox: box,
      userEmail: userEmail,
      orderBy: { createdAt: 'desc' }
    },
    fetchPolicy: 'network-only'
  });

  if(isToFetch && data) {
    setMails(data["emails"])
    // console.log("isToFetch is: ", isToFetch)
  }
  //  else {
    // console.log("isToFetch is: ", isToFetch)
    // setToFetch(true)
  // }
  console.log(userMails)
	return (
    <>
    {!isOpenedMail
      ?
    <MailsContainer>
      { userMails && userMails.map((mail: any, index: any) => {
        return (
            <Mail key={`${index}_${mail.id}`} mail={mail} />
      )})}
    </MailsContainer>

    :
    <OpenedMail setIsNewMail={setIsNewMail} setSendTo={setSendTo} />
    }
    </>
	)
}

export default Mails

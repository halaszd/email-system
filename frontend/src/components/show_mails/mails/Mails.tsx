import { MailsContainer } from './Styled';
import { useMail } from '../../utils/useContexts/MailContextProvider';
import { useQueryMails } from '../../utils/customHooks/useQueryMails';
import Mail from './mail/Mail';  
import OpenedMail from './opened_mail/OpenedMail';

// -------------------- The component -------------------- 
type Props = {
  setIsNewMail: Function;
  setSendTo: Function;
}
const Mails = ({setIsNewMail, setSendTo}: Props) => {
  
  const { setMails, isOpenedMail } = useMail();
  const mails = useQueryMails("inbox", 1, 20);
  console.log(mails)
  mails && setMails(mails)

	return (
    <>
    {!isOpenedMail
      ?
    <MailsContainer>
                      
      {mails && mails["userMails"].map((mail, index) => {
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

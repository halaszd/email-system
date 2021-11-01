import { useMail } from '../../../utils/useContexts/MailContextProvider';
import { FetchedMail } from '../../../utils/types/FetchedMail';
import { MailContainer, ContentContainer, CheckboxContainer, MessageInfos } from './Styled';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

// -------------------- Declaring types and interfaces -------------------- 
type Props = {
  mail: FetchedMail
}

// -------------------- Component -------------------- 
const Mail = (
  {
    mail: 
    { 
      fromUser, 
      toUser, 
      email: {  subject, message  }, 
      id
    }, 
  }: Props
  ) => {

  const { 
    mails: {typeOfMail}, 
    setIsOpenedMail,
    setOpenedMailID,
    checkedMailIDs, 
    setCheckedMailIDs 
  } = useMail();

  function handleCheckMail(e:CheckboxChangeEvent) {
    if(e.target.checked) {
      setCheckedMailIDs([...checkedMailIDs, id]);
    } else {
        const newCheckedMailIDs = [...checkedMailIDs];
        const index = newCheckedMailIDs.indexOf(Number(id));
        newCheckedMailIDs.splice(index, 1);
        setCheckedMailIDs(newCheckedMailIDs);
    }
  }

	return (
		<MailContainer>
      <ContentContainer>
        <CheckboxContainer>
          <Checkbox className="checkbox" onChange={(e) => handleCheckMail(e)}></Checkbox>
        </CheckboxContainer>
        <MessageInfos onClick={() => {setIsOpenedMail(true); setOpenedMailID(id)}}>
          { typeOfMail === 'inbox' || typeOfMail === 'trash'
            ? <span className="from-subject">From: {fromUser.email}</span>	
            : <span className="from-subject">To: {toUser.email}</span>	
          }
          <span className="from-subject">Subject: {subject}</span>	
          <span className="message">Message: {message}</span>
        </MessageInfos>
      </ContentContainer>
		</MailContainer>
	)
}

export default Mail

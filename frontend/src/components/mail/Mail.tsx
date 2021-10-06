import React, { useContext } from 'react';
import { FetchedMail } from '../types/FetchedMail';
import { MailContext } from '../useContexts/MailContext';
import { MailContainer, ContentContainer, CheckboxContainer, MessageInfos } from './Styled';
import { Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

// -------------------- Declaring types and interfaces -------------------- 
type Props = {
  mail: FetchedMail
  checkedMailIDs: number[];
  setCheckedMailIDs: Function;
}

// -------------------- Component -------------------- 
const Mail = (
  {
    mail: 
    { 
      from, 
      fromEmailAddress, 
      to, 
      toEmailAddress, 
      subject, 
      message, 
      id
    }, 
    checkedMailIDs, 
    setCheckedMailIDs 
  }: Props
  ) => {

  const { mails: {typeOfMail}, setIsOpenedMail, setOpenedMailID } = useContext(MailContext);

  function handleCheckMail(e:CheckboxChangeEvent) {
    if(e.target.checked) {
      setCheckedMailIDs([...checkedMailIDs, id]);
    } else {
        const newCheckedMailIDs = [...checkedMailIDs];
        const index = newCheckedMailIDs.indexOf(id);
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
            ? <span className="from-subject">From: {from}</span>	
            : <span className="from-subject">To: {to}</span>	
          }
          <span className="from-subject">Subject: {subject}</span>	
          <span className="message">Message: {message}</span>
        </MessageInfos>
      </ContentContainer>
		</MailContainer>
	)
}

export default Mail

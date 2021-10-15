import React, { useContext } from 'react';
import { MailsContainer } from './Styled';
import { MailContext } from '../useContexts/MailContext';
import Mail from '../mail/Mail';  

// -------------------- The component -------------------- 
const Mails = () => {
  
  const {
     mails, 
     checkedMailIDs, 
     setCheckedMailIDs 
    } = useContext(MailContext);

	return (
    <MailsContainer>
      {mails["mails"] && mails["mails"].map((mail, index) => {
        return (
          <>
            <Mail 
            key={`${index}_${mail.id}`} mail={mail} checkedMailIDs={checkedMailIDs} setCheckedMailIDs={setCheckedMailIDs}/>
          </>
      )})}
    </MailsContainer>
	)
}

export default Mails

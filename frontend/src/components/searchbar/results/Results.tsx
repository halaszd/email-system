import React from 'react';
import { useMail } from '../../utils/useContexts/MailContextProvider';
import { ResultsContainer, ResultContainer, ContentContainer, MessageInfos } from './Styled';
import { FetchedMail } from '../../utils/types/FetchedMail';

type Props = {
	resultMails: FetchedMail[];
  setResultMails: Function;
}

// -------------------- Component -------------------- 
const Results = (
  {
    resultMails, 
    setResultMails
  }: Props) => {

    const {setIsOpenedMail, setOpenedMailID} = useMail();

  function handleClick(id: number) {
    setIsOpenedMail(true); 
    setOpenedMailID(id); 
    setResultMails([]);
  }
  
	return (
		<ResultsContainer>
			{resultMails && resultMails.map((mail, index) => {
        return(
          <ResultContainer key={`${mail.id}_${index}`}>
            <ContentContainer>
              <MessageInfos onClick={() => handleClick(mail.id)}>
                {/* { props.typeOf === 'inbox' || props.typeOf === 'trash' */}
                  {/* ? <span className="from-subject">From: {props.from}</span>	
                  : <span className="from-subject">To: {props.to}</span>	
                } */}
                <span className="from-subject">From: {mail.from}</span>	
                <span className="from-subject">Subject: {mail.subject}</span>	
              </MessageInfos>
            </ContentContainer>
        </ResultContainer>
        )
      })}
		</ResultsContainer>
	)
}

export default Results
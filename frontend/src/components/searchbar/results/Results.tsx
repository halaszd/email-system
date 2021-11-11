import React from 'react';
import { useMail } from '../../utils/useContexts/MailContextProvider';
import { ResultsContainer, ResultContainer, ContentContainer, MessageInfos } from './Styled';
import { FetchedMail } from '../../utils/types/FetchedMail';

type Props = {
	filteredMails: FetchedMail[];
  setShowResultMails: Function;
}

const Results = (
  {
    filteredMails, 
    setShowResultMails
  }: Props) => {

    const {setIsOpenedMail, setOpenedMailID} = useMail();

  function handleClick(id: string) {
    setIsOpenedMail(true); 
    setOpenedMailID(id); 
    setShowResultMails(false)
  }
  
	return (
		<ResultsContainer>
			{filteredMails && filteredMails.map((mail, index) => {
        const {fromUser, toUser, id, email: {subject}} = mail;
        return(
          <ResultContainer key={`${mail.id}_${index}`}>
            <ContentContainer>
              <MessageInfos onClick={() => handleClick(id)}>
                {/* { props.typeOf === 'inbox' || props.typeOf === 'trash' */}
                  {/* ? <span className="from-subject">From: {props.from}</span>	
                  : <span className="from-subject">To: {props.to}</span>	
                } */}
                <span className="from-subject">From: {fromUser.email}</span>	
                <span className="from-subject">Subject: {subject}</span>	
              </MessageInfos>
            </ContentContainer>
        </ResultContainer>
        )
      })}
		</ResultsContainer>
	)
}

export default Results

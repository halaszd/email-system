import React from 'react';
import { useContext } from 'react';
import { SearchBarContext } from '../useContexts/SearchBarContext';
import { ResultsContainer, ContentContainer, MessageInfos } from './Styled';
import { FetchedMail } from '../types/FetchedMail';

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

    const {setIsOpenedMail, setOpenedMailID} = useContext(SearchBarContext);

  function handleClick(id: number) {
    setIsOpenedMail(true); 
    setOpenedMailID(id); 
    setResultMails([]);
  }
  
	return (
		<div>
			{resultMails && resultMails.map((mail, index) => {
        return(
          <ResultsContainer key={`${mail.id}_${index}`}>
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
        </ResultsContainer>
        )
      })}
		</div>
	)
}

export default Results

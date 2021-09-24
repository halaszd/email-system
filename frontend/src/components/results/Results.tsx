import React from 'react';
import { ResultsContainer } from './Styled';
import FetchedMail from '../interfaces/FetchedMail';

type Props = {
	resultMails: FetchedMail[];
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
  setResultMails: Function;
}

// -------------------- Component -------------------- 
const Results = (
  {
    resultMails, 
    setIsOpenedMail, 
    setOpenedMailID, 
    setResultMails
  }: Props) => {

  function handleClick(id: number) {
    setIsOpenedMail(true); 
    setOpenedMailID(id); 
    console.log(id)
    setResultMails(null);
  }
	return (
		<div>
			{resultMails && resultMails.map((mail, index) => {
        return(
          <ResultsContainer key={`${mail.id}_${index}`}>
            <div className="content-container">
              <div className= "message-infos" 
              onClick={() => handleClick(mail.id)}>
                {/* { props.typeOf === 'inbox' || props.typeOf === 'trash' */}
                  {/* ? <span className="from-subject">From: {props.from}</span>	
                  : <span className="from-subject">To: {props.to}</span>	
                } */}
                <span className="from-subject">From: {mail.from}</span>	
                <span className="from-subject">Subject: {mail.subject}</span>	
              </div>
            </div>
        </ResultsContainer>
        )
      })}
		</div>
	)
}

export default Results

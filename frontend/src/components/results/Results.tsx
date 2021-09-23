import React from 'react';
import { ResultsContainer } from './Styled';
import FetchedMail from '../interfaces/FetchedMail';

type Props = {
	resultMails: FetchedMail[];
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
  setResultMails: Function;
}

const Results: React.FC<Props> = props => {

  function handleClick(id: number) {
    props.setIsOpenedMail(true); 
    props.setOpenedMailID(id); 
    console.log(id)
    props.setResultMails(null);
  }
	return (
		<div>
			{props.resultMails && props.resultMails.map((mail, index) => {
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

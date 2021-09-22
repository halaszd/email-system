import React from 'react';
import styled from '@emotion/styled'

import { useEffect } from 'react';

import FetchedMail from '../interfaces/FetchedMail';

// -------------------- Style -------------------- 
const ResultsContainer = styled.div`
  &:hover {
    background-color: #e7f0f0;
    z-index: 10;
  }

  .content-container {
    width: 80%;
    display: flex;
    gap: 10px;
    border-top: 1px solid #eceff1;
    padding: 10px 10px 5px 20px;
    
    &:hover {
      cursor: pointer;
    }
  }

    .message-infos {
      display: flex;
      flex-direction: column;
      overflow-x: hidden;

      .from-subject, .message {
        white-space: nowrap;
        overflow-x: hidden;
        text-overflow: ellipsis;
      }
    }
`;

type Props = {
	resultMails: FetchedMail[];
  setIsOpenedMail: Function;
  setOpenedMailID: Function;
  setResultMails: Function;
}

const Results: React.FC<Props> = props => {
  props.setIsOpenedMail("do nothing");

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

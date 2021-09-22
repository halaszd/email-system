import { Result } from 'antd';
import React from 'react';
import styled from '@emotion/styled'
import FetchedMail from '../interfaces/FetchedMail';

// -------------------- Style -------------------- 
const MailContainer = styled.div`
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
}

const Results: React.FC<Props> = props => {
	return (
		<div>
			{props.resultMails && props.resultMails.map((mail, index) => {
        return(
          <MailContainer key={`${mail.id}_${index}`}>
            <div className="content-container">
              <div className="checkbox-container">
              </div>
              {/* <div className= "message-infos" onClick={() => {props.setIsOpenedMail(true); props.setOpenedMailID(props.id)}}> */}
              <div className= "message-infos" >
                {/* { props.typeOf === 'inbox' || props.typeOf === 'trash' */}
                  {/* ? <span className="from-subject">From: {props.from}</span>	
                  : <span className="from-subject">To: {props.to}</span>	
                } */}
                <span className="from-subject">From: {mail.from}</span>	
                <span className="from-subject">Subject: {mail.subject}</span>	
              </div>
            </div>
        </MailContainer>
        )
      })}
		</div>
	)
}

export default Results

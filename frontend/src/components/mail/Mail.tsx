import React from 'react'
import { useEffect } from 'react';
import styled from '@emotion/styled'
import { Checkbox } from 'antd';
import FetchedMail from '../interfaces/FetchedMail';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

// -------------------- Style -------------------- 
const MailContainer = styled.div`
  &:hover {
    box-shadow: 1px 1px 3px #5f6368;
    z-index: 10;
  }
  form {
    display: flex;
    gap: 10px;
    background-color: #f4f7f7;
    border-top: 1px solid #eceff1;
    padding: 10px 10px 5px 20px;
    
    &:hover {
      cursor: pointer;
    }

    .checkbox-container {
      min-width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      &:hover{
        cursor: pointer;
        background-color: #eceff1;
        border-radius: 20px;

        &::after {
          content: "Select";
          color: white;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 0.08rem;
          position: absolute;
          top: 41px;
          padding: 3px;
          background-color: grey;
          border-radius: 3px;
        }
      }
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

      .message {
        color: #5f6368;
      }
    }
  }
`;

// -------------------- Declaring types and interfaces -------------------- 
interface Props extends FetchedMail {
  typeOf: "inbox" | "sent" | "trash";
	setIsOpenedMail: Function;
  setOpenedMailID: Function;
  checkedMailIDs: number[];
  setCheckedMailIDs: Function;
}

// -------------------- The component itself -------------------- 
const Mail: React.FC<Props> = props => {

  function handleCheckMail(e:CheckboxChangeEvent) {
    // Collecting the checked mailsi
    if(e.target.checked) {
      props.setCheckedMailIDs([...props.checkedMailIDs, props.id]);
    } else {
        const newCheckedMailIDs = [...props.checkedMailIDs];
        const index = newCheckedMailIDs.indexOf(props.id);
        newCheckedMailIDs.splice(index, 1);
        props.setCheckedMailIDs(newCheckedMailIDs);
    }
  }

	return (
		<MailContainer>
      <form>
        <div className="checkbox-container">
          <Checkbox className="checkbox" onChange={(e) => handleCheckMail(e)}></Checkbox>
        </div>
        <div className= "message-infos" onClick={() => {props.setIsOpenedMail(true); props.setOpenedMailID(props.id)}}>
          {console.log(props.typeOf)}
          { props.typeOf === 'inbox' || props.typeOf === 'trash'
            ? <span className="from-subject">From: {props.from}</span>	
            : <span className="from-subject">To: {props.to}</span>	
          }
          <span className="from-subject">Subject: {props.subject}</span>	
          <span className="message">Message: {props.message}</span>
        </div>
      </form>
		</MailContainer>
	)
}

export default Mail

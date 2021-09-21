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

    .message-infos {
      display: flex;
      flex-direction: column;
      overflow-x: hidden;

      .from-subject, .message {
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

  // useEffect(() => {
  //   console.log(props.checkedMailIDs)
  // }, [props.checkedMailIDs])

  function handleCheckMail(e:CheckboxChangeEvent) {
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
        <div>
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

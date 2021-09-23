import React from 'react'
import { MailContainer } from './Styled';
import { Checkbox } from 'antd';
import FetchedMail from '../interfaces/FetchedMail';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

// -------------------- Declaring types and interfaces -------------------- 
interface Props extends FetchedMail {
  typeOf: "inbox" | "sent" | "trash" | ""; 
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
      <div className="content-container">
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
      </div>
		</MailContainer>
	)
}

export default Mail

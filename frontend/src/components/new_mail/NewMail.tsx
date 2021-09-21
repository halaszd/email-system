import React from 'react'
import { useState } from 'react';
import styled from '@emotion/styled'
import { Input, Button, Spin } from 'antd';
import { CloseOutlined, MinusOutlined, BorderOuterOutlined } from '@ant-design/icons';

const { TextArea } = Input;

// -------------------- Style -------------------- 
const NewMailContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 30px;
  min-width: 500px;
  height: 400px;
  border-radius: 5px 5px 0 0;
  border: 1px solid #d9d9d9;
  display: flex;
  z-index: 10;

  &.minimized {
    height: 40px;

    form {
      display: none;
    }
  }

  .content-container {
    header {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #202124;
      color: white;
      border-radius: 5px 5px 0 0;

      span {
        padding-left: 10px;
        font-weight: bold;
      }

      .header-icons {
        justify-self: flex-end;
        padding-right: 10px;
      }
    }

    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;

    form {
      height: calc(100% - 40px);
      display: flex;
      flex-direction: column;

      .message {
        height: 100%;
      }

      .button {
        width: 100px;
        font-weight: bold;
      }
    }

    .spinner {
      position: absolute;
      z-index: 10;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

    background-color: white;
`;

// -------------------- Declaring types and interfaces -------------------- 
type Props = {
  isNewMail: boolean;
  setIsNewMail: Function;
  sendTo: string;
  setSendTo: Function;
};

interface DataToSend {
  // from
  to: string;
  subject: string;
  message: string;
  id?: string; // to be generated
}

interface FormElements extends HTMLFormControlsCollection {
  formInput: HTMLInputElement
};

interface FormElement extends HTMLFormElement {
 readonly elements: FormElements
};

// -------------------- The component itself -------------------- 
const NewMail = ({isNewMail, setIsNewMail, sendTo, setSendTo}: Props) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  function minimize() {
    const form = document.querySelector(".new-mail-container")!;
    form.classList.toggle("minimized");
  }

  function handleSubmit(e: React.FormEvent<FormElement>) {
    e.preventDefault();

    const inputs =  e.currentTarget.querySelectorAll(".input");
    let values: DataToSend = { to: "", subject: "", message: "", id: "" };

    for(const elem of inputs) {
      const modElem = (elem as HTMLInputElement);
      const key = modElem.name as keyof DataToSend;
      values[key] = modElem.value;
    }

    // setTimout
    setIsloading(true);
    setTimeout(() => {setIsloading(false); setIsNewMail(!isNewMail); setSendTo("")}, 2000);
    console.log(values)
    ;
}

	return (
		<NewMailContainer className="new-mail-container">
      <div className="content-container">
        <header>
          <span>New Message</span>
          <div className="header-icons">
            { !isMinimized 
              ? <MinusOutlined onClick={() => {minimize(); setIsMinimized(!isMinimized)}}/> 
              : <BorderOuterOutlined onClick={() => {minimize(); setIsMinimized(!isMinimized)}}/>}
            <CloseOutlined  onClick={() => {setIsNewMail(!isNewMail); setSendTo("")}}/>
          </div>
        </header>
        { isLoading && <Spin className="spinner" tip="Sending" /> }
        <form onSubmit={handleSubmit}>
          <Input className="input" name="to" placeholder="To" value={sendTo}/>
          <Input className="input" name="subject" placeholder="Subject" />
          <TextArea className="input message" name="message" placeholder="Message" />
          <Button className="button" type="primary" htmlType="submit">Send</Button>
        </form>
      </div>
		</NewMailContainer>
	)
}

export default NewMail
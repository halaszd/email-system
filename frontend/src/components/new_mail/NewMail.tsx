import React from 'react'
import { useState } from 'react';
import styled from '@emotion/styled'
import { Input, Button } from 'antd';
import { CloseOutlined, MinusOutlined, BorderOuterOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const NewMailContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 30px;
  min-width: 500px;
  height: 400px;
  border-radius: 5px 5px 0 0;

  &.minimized {
    height: 40px;

    form {
      display: none;
    }
  }

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

  form {
    width: 100%;
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
    background-color: white;
`;

type Props = {
  isNewMail: boolean;
  setIsNewMail: Function;
};

interface DataToSend {
  to: string;
  subject: string;
  message: string;
  id?: string;
}

interface FormElements extends HTMLFormControlsCollection {
  formInput: HTMLInputElement
};

interface FormElement extends HTMLFormElement {
 readonly elements: FormElements
};

const NewMail = ({isNewMail, setIsNewMail}: Props) => {
  const [isMinimized, setIsMinimized] = useState(false)

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
    console.log(values)
}

	return (
		<NewMailContainer className="new-mail-container">
      <header>
        <span>New Message</span>
        <div className="header-icons">
          {!isMinimized 
            ? <MinusOutlined onClick={() => {minimize(); setIsMinimized(!isMinimized)}}/> 
            : <BorderOuterOutlined onClick={() => {minimize(); setIsMinimized(!isMinimized)}}/>}
          <CloseOutlined  onClick={() => setIsNewMail(!isNewMail)}/>
        </div>
        </header>
      <form onSubmit={handleSubmit}>
        <Input className="input" name="to" placeholder="To" />
        <Input className="input" name="subject" placeholder="Subject" />
        <TextArea className="input message" name="message" placeholder="Message" />
        <Button className="button" type="primary" htmlType="submit">Send</Button>
      </form>
		</NewMailContainer>
	)
}

export default NewMail
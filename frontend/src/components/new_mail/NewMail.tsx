import React from 'react'
import { NewMailContainer, ContentContainer, Header, Form } from './Styled';
import { useState } from 'react';
import { Input, Button, Spin } from 'antd';
import { CloseOutlined, MinusOutlined, BorderOuterOutlined } from '@ant-design/icons';

const { TextArea } = Input;

// -------------------- Declaring types and interfaces -------------------- 
interface DataToSend {
  // date
  from: string;
  fromEmailAddress: string;
  to: string;
  toEmailAddress: string;
  subject: string;
  message: string;
  id: number | string;
}

interface FormElements extends HTMLFormControlsCollection {
  formInput: HTMLInputElement
};

interface FormElement extends HTMLFormElement {
 readonly elements: FormElements
};

type Props = {
  isNewMail: boolean;
  setIsNewMail: Function;
  sendTo: string;
  setSendTo: Function;
};

// -------------------- Component -------------------- 
const NewMail = (
  {
    isNewMail, 
    setIsNewMail, 
    sendTo, 
    setSendTo
  }: Props) => {
    
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  function minimize() {
    const newMailContainer = document.querySelector(".new-mail-container")!;
    newMailContainer.classList.toggle("minimized");
    const form = document.querySelector(".form")!;
    form.classList.toggle("minimized");
  }

  function handleSubmit(e: React.FormEvent<FormElement>) {
    e.preventDefault();

    const inputs =  e.currentTarget.querySelectorAll(".input");
    const mailID = new Date().valueOf() + Math.random();
    let values: DataToSend = {
      from: "",
      fromEmailAddress: "",
      to: "", // most possibly it's (the name) not needed 
      toEmailAddress: "",
      subject: "", 
      message: "", 
      id: mailID};
    console.log(mailID)

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
      <ContentContainer>
        <Header>
          <span>New Message</span>
          <div className="header-icons">
            { !isMinimized 
              ? <MinusOutlined onClick={() => {minimize(); setIsMinimized(!isMinimized)}}/> 
              : <BorderOuterOutlined onClick={() => {minimize(); setIsMinimized(!isMinimized)}}/>}
            <CloseOutlined  onClick={() => {setIsNewMail(!isNewMail); setSendTo("")}}/>
          </div>
        </Header>
        { isLoading && <Spin className="spinner" tip="Sending" /> }
        <Form className="form" onSubmit={handleSubmit}>
          <Input className="input" name="to" placeholder="To" defaultValue={sendTo} required/>
          <Input className="input" name="subject" placeholder="Subject" required/>
          <TextArea className="input message" name="message" placeholder="Message" />
          <Button className="button" type="primary" htmlType="submit">Send</Button>
        </Form>
      </ContentContainer>
		</NewMailContainer>
	)
}

export default NewMail
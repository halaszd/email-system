import React from 'react'
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { MAIL_QUERY } from '../../../queries_mutations';
import { useMail } from '../../utils/useContexts/MailContextProvider';
import { useHistory } from 'react-router';
import { Input, Button, Spin } from 'antd';
import { CloseOutlined, MinusOutlined, BorderOuterOutlined } from '@ant-design/icons';
import { NewMailContainer, ContentContainer, Header, Form } from './Styled';

const SEND_MAIL_MUTATION = gql`
  mutation sendMutation(
    $from: String!
    $to: String!
    $subject: String
    $message: String
  ) {
    send(
      from: $from,
      to: $to,
      subject: $subject,
      message: $message
    )
    {
      fromUser {
        email
      }
      toUser {
        email
      }
    }
  }
`;

const { TextArea } = Input;

// -------------------- Declaring types and interfaces -------------------- 
interface DataToSend {
  // date
  from: string;
  to: string;
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
    
  const {userEmail, mails} = useMail();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const history = useHistory();

  const [mailToSend, setMailToSend] = useState({
    from: userEmail,
    to: sendTo,
    subject: '',
    message: ''
  })

  // emails(typeOfBox: String!, skip: Int, take: Int, orderBy: MailOrderByInut): ResultMails!
  const [sendEmail] = useMutation(SEND_MAIL_MUTATION, {
    variables: {
      from: mailToSend.from,
      to: mailToSend.to,
      subject: mailToSend.subject,
      message: mailToSend.message
    },
    update(cache, { data: { send }}) {
      // should add take, skip and order by
      const typeOfBox = mails.typeOfBox;

      // check data's structure in ex.json then write
      const data = cache.readQuery({
        query: MAIL_QUERY,
        variables: {
          typeOfBox
        }
      });
      console.log(data)

      // cache.writeQuery({
      //   query: MAIL_QUERY,
      //   data: {
      //     emails: {
      //       emails: [send, ...data.emails]
      //     }
      //   },
      //   variables: {

      //   }
      // })
    }
  });

  function minimize() {
    const newMailContainer = document.querySelector(".new-mail-container")!;
    newMailContainer.classList.toggle("minimized");
    const form = document.querySelector(".form")!;
    form.classList.toggle("minimized");
  }

  function handleSubmit(e: React.FormEvent<FormElement>) {
    e.preventDefault();
    sendEmail();
    // const inputs =  e.currentTarget.querySelectorAll(".input");
    // const mailID = new Date().valueOf() + Math.random();
    // let values: DataToSend = {
    //   from: "",
    //   to: "", // most possibly it's (the name) not needed 
    //   subject: "", 
    //   message: "", 
    //   id: mailID};
    // console.log(mailID)

    // for(const elem of inputs) {
    //   const modElem = (elem as HTMLInputElement);
    //   const key = modElem.name as keyof DataToSend;
    //   values[key] = modElem.value;
    // }

    // // setTimout
    setIsloading(true);
    setTimeout(() => {setIsloading(false); setIsNewMail(!isNewMail); setSendTo("")}, 2000);
    // console.log(values)
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
          {/* <Input className="input" name="to" placeholder="To" defaultValue={sendTo} required/>
          <Input className="input" name="subject" placeholder="Subject" required/>
          <TextArea className="input message" name="message" placeholder="Message" /> */}
          <Input 
            className="input" 
            placeholder="To" 
            defaultValue={sendTo} 
            onChange={(e) => setMailToSend({
              ...mailToSend,
              to: e.target.value
            })}
            required/>
          <Input 
            className="input" 
            placeholder="Subject" 
            onChange={(e) => setMailToSend({
              ...mailToSend,
              subject: e.target.value
            })}
            required/>
          <TextArea 
            className="input message" 
            placeholder="Message" 
            onChange={(e) => setMailToSend({
              ...mailToSend,
              message: e.target.value
            })}
            />
          <Button className="button" type="primary" htmlType="submit">Send</Button>
        </Form>
      </ContentContainer>
		</NewMailContainer>
	)
}

export default NewMail
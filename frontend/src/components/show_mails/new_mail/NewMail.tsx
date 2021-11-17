import React from 'react'
import { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { MAIL_QUERY, SEND_MAIL_MUTATION } from '../../../queries_mutations';
import { useMail } from '../../utils/useContexts/MailContextProvider';
import { Input, Button, Spin, Modal } from 'antd';
import { CloseOutlined, MinusOutlined, BorderOuterOutlined } from '@ant-design/icons';
import { NewMailContainer, ContentContainer, Header, Form } from './Styled';

const { TextArea } = Input;

// -------------------- Declaring types and interfaces -------------------- 

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

const NewMail = (
  {
    isNewMail,
    setIsNewMail,
    sendTo,
    setSendTo
  }: Props) => {

  const { userEmail, mails: { typeOfBox }, setIsToFetch, setMails } = useMail();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const [mailToSend, setMailToSend] = useState({
    from: userEmail,
    to: sendTo,
    subject: '',
    message: ''
  })

  const [executeMailQuery, { data, loading }] = useLazyQuery(
    MAIL_QUERY,
    {
      variables: {
        typeOfBox,
        orderBy: { createdAt: 'desc' }
      },
      onCompleted: mails => { setMails(mails["emails"]); setIsToFetch(false) },
      fetchPolicy: 'network-only'
    }
  )
  const [sendEmail, { error }] = useMutation(SEND_MAIL_MUTATION, {
    variables: {
      from: mailToSend.from,
      to: mailToSend.to,
      subject: mailToSend.subject,
      message: mailToSend.message
    },
    errorPolicy: 'all',
    onCompleted: () => executeMailQuery()
    // update(cache, { data }) {
    //   const typeOfBox = mails.typeOfBox;
    //   console.log(typeOfBox)
    //   const emails = cache.readQuery({
    //     query: MAIL_QUERY,
    //     variables: {
    //       typeOfBox
    //     }
    //   });
    //   console.log("DATA: ", emails, data, cache)

    //   // store.writeQuery({
    //   //   query: MAIL_QUERY,
    //   //   variables: {
    //   //     typeOfBox: mails.typeOfBox,
    //   //   },
    //   //   data: {
    //   //     userMails: [...mails["userMails"], data.send]
    //   //   }
    //   // })
    //   console.log(data)
    // }
  }
  );

   function handleOk() {
    setIsModalVisible(false)
    };

   function handleCancel() {
    setIsModalVisible(false)
    };

  function minimize() {
    const newMailContainer = document.querySelector(".new-mail-container")!;
    newMailContainer.classList.toggle("minimized");
    const form = document.querySelector(".form")!;
    form.classList.toggle("minimized");
  }

  async function handleSubmit(e: React.FormEvent<FormElement>) {
    e.preventDefault();

    const result = await sendEmail();

    setIsloading(true);

    setTimeout(() => {
      if(result.errors) {
        setIsModalVisible(true)
      } else {
        setIsNewMail(!isNewMail);
        setSendTo("");
      }
      setIsloading(false);
    },
      2000
    );
  }

  return (
    <>
    <NewMailContainer className="new-mail-container">
      <ContentContainer>
        <Header>
          <span>New Message</span>
          <div className="header-icons">
            {!isMinimized
              ? <MinusOutlined onClick={() => { minimize(); setIsMinimized(!isMinimized) }} />
              : <BorderOuterOutlined onClick={() => { minimize(); setIsMinimized(!isMinimized) }} />}
            <CloseOutlined onClick={() => { setIsNewMail(!isNewMail); setSendTo("") }} />
          </div>
        </Header>
        {isLoading && <Spin className="spinner" tip="Sending" />}
        <Form className="form" onSubmit={handleSubmit}>
          <Input
            className="input"
            placeholder="To"
            defaultValue={sendTo}
            onChange={(e) => setMailToSend({
              ...mailToSend,
              to: e.target.value
            })}
            required />
          <Input
            className="input"
            placeholder="Subject"
            onChange={(e) => setMailToSend({
              ...mailToSend,
              subject: e.target.value
            })}
            required />
          <TextArea
            className="input message"
            placeholder={error ? error.message : "Message"}
            // value={(e: React.ChangeEvent<HTMLInputElement>) => {return e.target.value;}}
            onChange={(e) => setMailToSend({
              ...mailToSend,
              message: e.target.value
            })}
          />
          <Button className="button" type="primary" htmlType="submit">Send</Button>
        </Form>
      </ContentContainer>
    </NewMailContainer>
      <Modal title="Non existent user" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>There is no user with the email address</p>
      </Modal>
    </>
  )
}

export default NewMail
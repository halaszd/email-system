import React from 'react'
import styled from '@emotion/styled'
import 'antd/dist/antd.css';
import { Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;


const NewMailContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 30px;
  min-width: 500px;
  height: 400px;
  /* height: 100%; */
  /* border-radius: 15px 15px 15px 15px; */

  header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    color: white;

    span {
      padding-left: 10px;
      font-weight: bold;
    }

    .close {
      padding-right: 10px;
    }

    .close:hover {
      cursor: pointer;
    }
  }

  form {
    width: 100%;
    height: calc(100% - 40px);
    display: flex;
    flex-direction: column;

    TextArea {
      height: 100%;
    }

    .button {
      width: 100px;
    }
  }
    background-color: white;
`;

type Props = {
  isNewMail: boolean;
  setIsNewMail: Function;
};

const NewMail = ({isNewMail, setIsNewMail}: Props) => {
	return (
		<NewMailContainer>
      <header>
        <span>New Message</span>
        <CloseOutlined className="close" onClick={() => setIsNewMail(!isNewMail)}/>
        </header>
      <form onSubmit={() => ("something")}>
        <Input className=".input" placeholder="To" />
        <Input className=".input" placeholder="Subject" />
        <TextArea className=".input" placeholder="Message" />
        <Button className="button" type="primary">Send</Button>
      </form>
		</NewMailContainer>
	)
}

export default NewMail
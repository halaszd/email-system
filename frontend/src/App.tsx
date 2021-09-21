import React from 'react';
import styled from '@emotion/styled'
import 'antd/dist/antd.css';
import './index.css';
import { Button } from 'antd'
import { SearchOutlined, FormOutlined, SendOutlined, DeleteOutlined} from '@ant-design/icons';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useState } from 'react';

import Mails from './components/mails/Mails';
import NewMail from './components/new_mail/NewMail';
import SearchBar from './components/searchbar/SearchBar';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';

// TODO:
// Frontend side
// 2: should use useContext 
// 2: interfaces in separated files
// 3: On a single mail page: delete button 
// 4: searchbar functionality
// 5: mandatory fields in New Mail component
// 6: register and login buttons are on the top right corner
// 7: in Mails.tsx render for trash as well
// x: read, unread

// Later on server side
// x: register page and login page sends data to server and receives the answer
// x: if isNewMail is false and the form inside is not empty --> save into the drafts
// x: spinner should spin for as long as it takes to post and receive sth from server
// x: read, unread
// x: email deletion on server side
// x: post new mail to server, receive answer with updated sent mails
// x: reply

const ContentDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 10px 0px 0 0;
  background-color:#ffffff;

  .login-registration {
    margin: auto;
  }
  
  button a {
    color: white;
  }
`;

const SideBar = styled.ul`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 150px; // danger!
`;

const SubSideBar = styled(SideBar)`
  padding-top: 0;
`;

const ModButton = styled(Button)`
  width: 150px;

  :hover {
    width: 155px;
  }
`
type TypeOfMail = "inbox" | "sent" | "tras" | null;

export default function App() {
  const [isNewMail, setIsNewMail] = useState(false);
  const [sendTo, setSendTo] = useState<string>("");
  const [isRegisterOrLoginClicked, setIsRegisterOrLoginClicked] = useState(false);
  const [isOpenedMail, setIsOpenedMail] = useState(false);
  const [typeOfMail, setTypeOfMail] = useState<TypeOfMail>(null);

  return (
    <Router>
      <ul>
        <li>
          <Link onClick={() => {setIsRegisterOrLoginClicked(true)}} to="registration">
            Register
          </Link>
        </li>
        <li>
          <Link onClick={() => {setIsRegisterOrLoginClicked(true)}} to="login">
            Login
          </Link>
        </li>
      </ul>
        <ContentDiv>
          {!isRegisterOrLoginClicked 
          ?
            <>
              <SideBar>
                <li>
                  <ModButton type="primary" icon={<FormOutlined />} onClick={() => setIsNewMail(!isNewMail)}>New Mail</ModButton>
                </li>
                <SubSideBar onClick={() => setIsOpenedMail(false)}>
                  <li>
                    <Link to="/">
                      <ModButton type="primary" icon={<SearchOutlined />}>Inbox</ModButton>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sent">
                      <ModButton type="primary" icon={<SendOutlined />}>Sent</ModButton>
                    </Link>
                  </li>
                  <li>
                    <Link to="/trash">
                      <ModButton type="primary" icon={<DeleteOutlined />}>Trash</ModButton>
                    </Link>
                  </li>
                </SubSideBar>
              </SideBar>
              <div>
                <SearchBar />
                <Switch>
                  <Route exact path="/">
                    <Mails typeOf="inbox" typeOfMail={typeOfMail} setTypeOfMail={setTypeOfMail}
                     isOpenedMail={isOpenedMail} setIsOpenedMail={setIsOpenedMail}
                     setIsNewMail={setIsNewMail} setSendTo={setSendTo} />
                  </Route>
                  <Route path="/sent">
                    <Mails typeOf="sent" typeOfMail={typeOfMail} setTypeOfMail={setTypeOfMail}
                     isOpenedMail={isOpenedMail} setIsOpenedMail={setIsOpenedMail} 
                     setIsNewMail={setIsNewMail} setSendTo={setSendTo} />
                  </Route>
                  <Route path="/trash">
                    <Mails typeOf="trash" typeOfMail={typeOfMail} setTypeOfMail={setTypeOfMail}
                     isOpenedMail={isOpenedMail} setIsOpenedMail={setIsOpenedMail}
                     setIsNewMail={setIsNewMail} setSendTo={setSendTo} />
                  </Route>
                </Switch>
              </div>
              { isNewMail && <NewMail isNewMail={isNewMail} setIsNewMail={setIsNewMail} sendTo={sendTo} setSendTo={setSendTo} />}
            </>
          :
          <div className="login-registration">
          <Switch>
            <Route exact path="/registration">
              <Registration />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
          </div>
          }
        </ContentDiv>

    </Router>
  );
}

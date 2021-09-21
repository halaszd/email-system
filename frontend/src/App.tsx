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
// 2: useContext használata
// 2: interface-eket külön fájlba rakni, importálni
// 3: if we click on a mail it should show us the whole mail
// 4: searchbar functionality
// 4: style the page a bit
// 5: post new mail to server, receive answer with updated sent mails
// 5: mandatory fields in New Mail component
// 5: generating random id for mails in New Mail component
// 6: register page and login page sends data to server and receives the answer
// 6: register and login buttons are on the top right corner
// 7: in Mails.tsx render for trash as well
// x: if isNewMail is false and the form inside is not empty --> save into the drafts
// x: spinner should spin for as long as it takes to post and receive sth from server
// x: read, unread

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
  padding-top: 80px; // danger!
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

export default function App() {
  const [isNewMail, setIsNewMail] = useState(false);
  const [isRegisterOrLoginClicked, setIsRegisterOrLoginClicked] = useState(false);
  const [isOpenedMail, setIsOpenedMail] = useState(false);

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
                    <Mails boxType="inbox" isOpenedMail={isOpenedMail} setIsOpenedMail={setIsOpenedMail} />
                  </Route>
                  <Route path="/sent">
                    <Mails boxType="sent" isOpenedMail={isOpenedMail} setIsOpenedMail={setIsOpenedMail} />
                  </Route>
                  <Route path="/trash">
                    <Mails boxType= "trash" isOpenedMail={isOpenedMail} setIsOpenedMail={setIsOpenedMail} />
                  </Route>
                </Switch>
              </div>
              { isNewMail && <NewMail isNewMail={isNewMail} setIsNewMail={setIsNewMail}/>}
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

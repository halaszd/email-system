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

import Inbox from './components/inbox/Inbox';
import NewMail from './components/new_mail/NewMail';
import SentMails from './components/sent_mails/SentMails';
import Trash from './components/trash/Trash';
import SearchBar from './components/searchbar/SearchBar';
// TODO:
// 1: fetch the inbox mails when we click on inbox
// 3: if we click on a mail it should show us the whole mail
// 4: searchbar functionality
// 4: style the page a bit
// 5: post new mail to server, receive answer with updated sent mails
// 6: register page
// 6: login page
// x: if isNewMail is false and the form inside is not empty --> save into the drafts
// x: read, unread

const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 10px 0px 0 0;
  background-color: aliceblue;
`;

const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 5px;
  
  a {
    color: white;
  }
`;

const SideBar = styled.ul`
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModButton = styled(Button)`
  width: 150px;

  :hover {
    width: 155px;
  }
`

export default function App() {
  const [isNewMail, setIsNewMail] = useState(false)

  return (
    <Router>
      <MainDiv>
        <SearchBar />
        <ContentDiv>
          <SideBar>
            <li>
              <ModButton type="primary" icon={<FormOutlined />} onClick={() => setIsNewMail(!isNewMail)}>New Mail</ModButton>
            </li>
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
          </SideBar>

          <Switch>
            <Route exact path="/">
              <Inbox />
            </Route>
            <Route path="/sent">
              <SentMails />
            </Route>
            <Route path="/trash">
              <Trash />
            </Route>
          </Switch>
          { isNewMail && <NewMail isNewMail={isNewMail} setIsNewMail={setIsNewMail}/>}
        </ContentDiv>
      </MainDiv>
    </Router>
  );
}

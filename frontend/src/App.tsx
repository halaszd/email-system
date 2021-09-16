import React from 'react';
import styled from '@emotion/styled'
import Inbox from './components/inbox/Inbox';
import NewMail from './components/new_mail/NewMail';
import SentMails from './components/sent_mails/SentMails';
import Trash from './components/trash/Trash';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  /* &.theme-black {
    background-color: aqua;
  } */
  
`;

const SideBar = styled.ul`
`;


export default function App() {
  return (
    <Router>
      <MainDiv>
        <SideBar>
          <li>
            <Link to="/new-mail">New Mail</Link>
          </li>
          <li>
            <Link to="/">Inbox</Link>
          </li>
          <li>
            <Link to="/sent">Sent</Link>
          </li>
          <li>
            <Link to="/trash">Trash</Link>
          </li>
        </SideBar>

        <Switch>
          <Route>
            <NewMail />
          </Route>
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
      </MainDiv>
    </Router>
  );
}


  // const testFetch = async () => {
  //   const response = await fetch('http://localhost:3000/api/mails');
  //   const respJSON = await response.json();
  //   console.log(respJSON)
  // }

  // testFetch();

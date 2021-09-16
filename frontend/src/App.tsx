import React from 'react';
import styled from '@emotion/styled'
import Inbox from './components/inbox/Inbox';
import NewMail from './components/new_mail/NewMail';
import SentMails from './components/sent_mails/SentMails';
import Trash from './components/trash/Trash';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// TODO:
// 1: fetch the inbox mails when we click on inbox
// 2: create buttons (a component) for sidebar
// 3: if we click on a mail it should show us the whole mail
// 4: searchbar
// 4: style the page a bit
// 5: by clicking on new mail it doesn't redirect us to another page
      // but it'll pop up a new window on the page. --With useState--

const MainDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 30px;
  /* &.theme-black {
    background-color: aqua;
  } */
`;

const SideBar = styled.ul`
background-color: aqua;
  display: flex;
  flex-direction: column;
  /* flex-grow: 0; */
  /* flex-wrap: wrap; */
  gap: 30px;
`;

export default function App() {
  const [isNewMail, setIsNewMail] = useState(false)

  return (
    <Router>
      <MainDiv>
        <SideBar>
          <li>
            <button onClick={() => setIsNewMail(!isNewMail)}>New Mail</button>
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
        { isNewMail && <NewMail />}
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

import React from 'react';
import 'antd/dist/antd.css';
import './index.css';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";

import { useState } from 'react';
import { UserContext } from './components/useContexts/UserContext';
import { MailContext } from './components/useContexts/MailContext';
import { SearchBarContext } from './components/useContexts/SearchBarContext';

import { useSetOpenedMail } from './components/customHooks/useSetOpenedMail';
import { FetchedMail } from './components/types/FetchedMail';

import MailsHeader from './components/mails_header/MailsHeader';
import Mails from './components/mails/Mails';
import SideBar from './components/sidebar/SideBar';
import NewMail from './components/new_mail/NewMail';
import OpenedMail from './components/opened_mail/OpenedMail';
import SearchBar from './components/searchbar/SearchBar';
import Login from './components/login/Login';

import { ModRegistration } from './Styled';
import {MainDiv, MainHeader, Menu, RegLogButton, ContentDiv, LoginRegistration} from './Styled';

// TODO:
// Frontend side

// 1: elements in style component
// 1: Dont use useEffect if you can avoid using it
// 3: On a single mail page: delete button
// 3: pagination
// 4: show only few results in onChange search. Other mails: scrolling?
// 6: loading animation for registration and login

// 6: logout button when logged in.
// 6: when we push log out we are logged out
// 6: when we logged in the users name is on the top of the page right side
// 6: when we logged in the users emails are present (fetched)
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

// -------------------- Declaring types -------------------- 
type TypeOfMail = "inbox" | "sent" | "trash"; 

// -------------------- Component -------------------- 
export default function App() {
  // To get if user is logged in
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // to get user if the user is logged in
  const [username, setUsername] = useState("");
  // To store fetched mails
  const [mails, setMails] = useState<FetchedMail[]>([]);
  const [typeOfMail, setTypeOfMail] = useState<TypeOfMail>("inbox");
  // For writing new mails modal window
  const [isNewMail, setIsNewMail] = useState(false);
  // When reply to a mail whom to reply
  const [sendTo, setSendTo] = useState<string>("");

  // To show only one mail which was clicked. It's needed here to close the opened mail if one clicks on a sidebar button
  const [isOpenedMail, setIsOpenedMail] = useState<boolean>(false);
  const [openedMailID, setOpenedMailID] = useState<number | null>(null);
  const[checkedMailIDs, setCheckedMailIDs] = useState<number[]>([]);

  // Custom hook for getting the parameters of clicked (opened mail)
  const [openedMail] = useSetOpenedMail(
    mails,
    isOpenedMail,
    openedMailID
  );

  return (
    <Router>
      <MainDiv>
        <MainHeader>
          <Menu>
            <li>
              <Link to="registration">
                <RegLogButton content="Register">Register</RegLogButton>
              </Link>
            </li>
            <li>
              <Link to="login">
                <RegLogButton content="Login">Login</RegLogButton>
              </Link>
            </li>
          </Menu>

          { isLoggedIn && 
            <SearchBarContext.Provider value={
              {
                setIsOpenedMail, 
                setOpenedMailID
              }}>
              <SearchBar mails={mails} setMails={setMails} />
            </SearchBarContext.Provider>
          }

        </MainHeader>

        <ContentDiv>
          { isLoggedIn
            ?
            <>
              <Redirect to="/" />

              <SideBar props={
                { 
                  setIsNewMail, 
                  isNewMail, 
                  setTypeOfMail, 
                  setMails, 
                  setIsOpenedMail 
                }} />
              
              <div>
                <MailContext.Provider value={
                  { 
                    mails, 
                    setMails, 
                    typeOfMail,
                    isOpenedMail,
                    setIsOpenedMail,
                    openedMailID,
                    setOpenedMailID, 
                    checkedMailIDs, 
                    setCheckedMailIDs,
                  }}>
                  <MailsHeader />
                </MailContext.Provider>

                {!isOpenedMail
                  ?
                  <MailContext.Provider value={
                    {
                      mails, 
                      setMails, 
                      typeOfMail, 
                      setIsOpenedMail, 
                      setOpenedMailID, 
                      checkedMailIDs, 
                      setCheckedMailIDs,
                    }}>

                    <Switch>
                        <Route exact path="/">
                          <Mails />
                        </Route>
                        <Route exact path="/sent">
                          <Mails />
                        </Route>
                        <Route exact path="/trash">
                          <Mails />
                        </Route>
                    </Switch>

                  </MailContext.Provider>
                  :
                  <OpenedMail openedMail={openedMail} setIsNewMail={setIsNewMail} setSendTo={setSendTo} />
                }

              </div>

              { isNewMail && <NewMail isNewMail={isNewMail} setIsNewMail={setIsNewMail} sendTo={sendTo} setSendTo={setSendTo} />}
            </>
          :
          <>
          <Redirect to="/login" />
          
            <LoginRegistration>

              <Switch>

                <Route exact path="/registration">
                  <ModRegistration />
                </Route>

                <UserContext.Provider value={
                  { 
                    setIsLoggedIn, 
                    setUsername, 
                    setMails
                  }} >
                  <Route exact path="/login">
                    <Login />
                  </Route>
                </UserContext.Provider>

              </Switch>

            </LoginRegistration>
          </>
          }

        </ContentDiv>
      </MainDiv>
    </Router>
  );
}
import 'antd/dist/antd.css';
import './index.css';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import { UserContext } from './components/utils/useContexts/UserContext';

import { MailProvider, useMail } from './components/utils/useContexts/MailContextProvider';
import { fetchMails } from './components/utils/functions/fetchMails';
import { useState, useEffect } from 'react';

import { Menu } from './components/menu/Menu';
import { Authentication } from './components/authentication/Authentication';
import { ShowMails } from './components/show_mails/ShowMails';
import SearchBar from './components/searchbar/SearchBar';

import { MainDiv, MainHeader, ContentDiv } from './Styled';

// TODO:
// Frontend side
// 1: refactoring the usage of useContext

// 2: search should send a fetch and search results should coome from the server
// 2: date in mails
// 6: loading animation for registration and login

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


// -------------------- Component -------------------- 
export default function App() {
  // To get if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(true);
  // to get user if the user is logged in
  const [username, setUsername] = useState("");
  const {setMails} = useMail();

  useEffect(() => {
    console.log("inuse 50 isloggedin: ", isLoggedIn)
  }, [isLoggedIn])
  return (
    <Router>
      <MainDiv>
        <MailProvider>
          <MainHeader>
            <Menu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username}/> 
            { isLoggedIn && <SearchBar/> }
            </MainHeader>
            <ContentDiv>
            { !isLoggedIn
              ?
                    <UserContext.Provider value={
                    { 
                        isLoggedIn,
                        setIsLoggedIn, 
                        setUsername,
                        setMails 
                    }} > 
                <Authentication />
                </UserContext.Provider>
              :
                <ShowMails />
            }
          </ContentDiv>
        </MailProvider>
      </MainDiv>
    </Router>
  );
}
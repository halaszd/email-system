import 'antd/dist/antd.css';
import '../../index.css';

import { AUTH_TOKEN } from '../../constants';

import { UserContext } from '../utils/useContexts/UserContext';
import { MailProvider, useMail } from '../utils/useContexts/MailContextProvider';
// import { fetchMails } from '../utils/functions/fetchMails';
import { useState } from 'react';

import { Menu } from '../menu/Menu';
import { Authentication } from '../authentication/Authentication';
import { ShowMails } from '../show_mails/ShowMails';
import SearchBar from '../searchbar/SearchBar';

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
  const [auth, setAuth] = useState(localStorage.getItem(AUTH_TOKEN));
  // to get user if the user is logged in
  const [username, setUsername] = useState("");
  const {setMails} = useMail();

  return (
    <MainDiv>
      <MailProvider>
        <MainHeader>
          <Menu auth={auth} setAuth={setAuth} username={username}/> 
          { auth && <SearchBar/> }
          </MainHeader>
          <ContentDiv>
          { auth === null
            ?
                  <UserContext.Provider value={
                  { 
                      auth,
                      setAuth, 
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
  );
}
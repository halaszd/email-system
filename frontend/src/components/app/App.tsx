import 'antd/dist/antd.css';
import '../../index.css';

import { AUTH_TOKEN, USER_NAME } from '../../constants';

import { UserContext } from '../utils/useContexts/UserContext';
import { useMail } from '../utils/useContexts/MailContextProvider';
import { useState } from 'react';

import { Menu } from '../menu/Menu';
import { Authentication } from '../authentication/Authentication';
import { ShowMails } from '../show_mails/ShowMails';
import SearchBar from '../searchbar/SearchBar';

import { MainDiv, MainHeader, ContentDiv } from './Styled';
import { queryUserMails } from '../..';

// TODO:
// new mail and reply
// searching
// mails header: and single and bulk deletion and pagination
// registration
// server: settings: user should have mailsPerPage settings


// Frontend side
// 1: refactoring the usage of useContext

// 2: date in mails
// 6: loading animation for registration and login

// Later on server side
// x: if isNewMail is false and the form inside is not empty --> save into the drafts
// x: spinner should spin for as long as it takes to post and receive sth from server
// x: read, unread


// -------------------- Component -------------------- 
export default function App() {
  // To get if user is logged in
  const [auth, setAuth] = useState(localStorage.getItem(AUTH_TOKEN));
  // to get user if the user is logged in
  const [username, setUsername] = useState(localStorage.getItem(USER_NAME));
  const { mails, setMails } = useMail();
  
  if(mails.typeOfBox === "nobox") {
    queryUserMails("inbox", 1, 20, setMails)
  }

  return (
    <MainDiv>
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
    </MainDiv>
  );
}
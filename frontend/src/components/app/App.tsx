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

// TODO:
// deletion when its moved to trash should overwrite usermails date in database

// exeption handlings in frontend: errorpolicy: 'all'
// debug: finish declaration of update in NewMails.tsx
// use loading when making a query or mutation: const [{data, loading}] = useQuery...
// when registering: check real time if email exist
// when registering: check at least 6 chars whith special chars
// try to use subscription for refreshing mailboxes


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
  const { setUserEmail, setMails } = useMail();

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
                      setUserEmail,
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

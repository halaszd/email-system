import React from 'react';
import { ContentDiv } from './Styled';
import 'antd/dist/antd.css';
import './index.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useState, useEffect } from 'react';
import { MailContext } from './components/useContexts/MailContext';
import { SearchBarContext } from './components/useContexts/SearchBarContext';
import { fetchMails } from './components/functions/fetchMails';
import useSetOpenedMail from './components/customHooks/useSetOpenedMail';
import FetchedMail from './components/interfaces/FetchedMail';

import Mails from './components/mails/Mails';
import SideBar from './components/sidebar/SideBar';
import NewMail from './components/new_mail/NewMail';
import OpenedMail from './components/opened_mail/OpenedMail';
import SearchBar from './components/searchbar/SearchBar';
import Registration from './components/registration/Registration';
import Login from './components/login/Login';

// TODO:
// Frontend side

// 1: elements in style component
// 1: Dont use useEffect if you can evade using it
// 3: On a single mail page: delete button
// 3: pagination
// 4: show only few results in onChange search. Other mails: scrolling?
// 6: register and login buttons are on the top right corner
// 6: register and login on frontend side (get to know ant form,  values)
// 7: in Mails.tsx render for trash as well
// 7: sidebar in a separate component
// x: read, unread

// Later on server side
// x: register page and login page sends data to server and receives the answer
// x: if isNewMail is false and the form inside is not empty --> save into the drafts
// x: spinner should spin for as long as it takes to post and receive sth from server
// x: read, unread
// x: email deletion on server side
// x: post new mail to server, receive answer with updated sent mails
// x: reply

// -------------------- Declaring types and interfaces -------------------- 
type TypeOfMail = "inbox" | "sent" | "trash"; 

// -------------------- Component -------------------- 
export default function App() {
  // To store fetched mails
  const [mails, setMails] = useState<FetchedMail[]>([]);
  const [typeOfMail, setTypeOfMail] = useState<TypeOfMail>("inbox");
  // For writing new mails modal window
  const [isNewMail, setIsNewMail] = useState(false);
  // When reply to a mail whom to reply
  const [sendTo, setSendTo] = useState<string>("");
  const [isRegisterOrLoginClicked, setIsRegisterOrLoginClicked] = useState(false);
  // To show only one mail which was clicked. It's needed here to close the opened mail if one clicks on a sidebar button
  const [isOpenedMail, setIsOpenedMail] = useState<boolean>(false);
  const [openedMailID, setOpenedMailID] = useState<number | null>(null);

  // Custom hook for getting the parameters of clicked (opened mail)
  const openedMail = useSetOpenedMail(
    mails,
    isOpenedMail,
    openedMailID
  );

  useEffect(() => {
    fetchMails(typeOfMail, setMails);
  }, [])

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
            <SideBar setIsNewMail={setIsNewMail} isNewMail={isNewMail} 
            setTypeOfMail={setTypeOfMail} setMails={setMails} setIsOpenedMail={setIsOpenedMail}/>
              <div>

                <SearchBarContext.Provider value={{setIsOpenedMail, setOpenedMailID}}>
                  <SearchBar mails={mails} setMails={setMails} />
                </SearchBarContext.Provider>

                  {isOpenedMail === false
                    ?
                    <MailContext.Provider value={{ typeOfMail, setIsOpenedMail, setOpenedMailID }}>
                      <Switch>
                          <Route exact path="/">
                            <Mails mails={mails} setMails={setMails} />
                          </Route>
                          <Route exact path="/sent">
                            <Mails mails={mails} setMails={setMails} />
                          </Route>
                          <Route exact path="/trash">
                            <Mails mails={mails} setMails={setMails} />
                          </Route>
                      </Switch>
                    </ MailContext.Provider>
                    :
                    <OpenedMail openedMail={openedMail} setIsNewMail={setIsNewMail} setSendTo={setSendTo} />
                  }
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

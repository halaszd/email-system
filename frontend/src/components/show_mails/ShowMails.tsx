import { useState } from "react";
import MailsHeader from './mails_header/MailsHeader';
import Mails from './mails/Mails';
import SideBar from './sidebar/SideBar';
import NewMail from './new_mail/NewMail';
import {
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

export function ShowMails() {
  // For writing new mails modal window
  const [isNewMail, setIsNewMail] = useState(false);
  // When reply to a mail whom to reply
  const [sendTo, setSendTo] = useState<string>("");

    return (
            <>
            <Redirect to="/" />
            <SideBar setIsNewMail={setIsNewMail} isNewMail={isNewMail} />
            <div>
                <MailsHeader />
                <>
                <Switch>
                    <Route exact path="/">
                        <Mails box={"inbox"} setIsNewMail={setIsNewMail} setSendTo={setSendTo}/>
                    </Route>
                    <Route exact path="/sent">
                        <Mails box={"sent"} setIsNewMail={setIsNewMail} setSendTo={setSendTo}/>
                    </Route>
                    <Route exact path="/trash">
                        <Mails box={"trash"} setIsNewMail={setIsNewMail} setSendTo={setSendTo}/>
                    </Route>
                </Switch>
                </>
            </div>

            { isNewMail && <NewMail isNewMail={isNewMail} setIsNewMail={setIsNewMail} sendTo={sendTo} setSendTo={setSendTo} />}
            </>
    )
}

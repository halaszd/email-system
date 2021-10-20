import { useState } from "react";
import MailsHeader from '../mails_header/MailsHeader';
import Mails from '../mails/Mails';
import SideBar from '../sidebar/SideBar';
import NewMail from '../new_mail/NewMail';
import {
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

export function ShowMails() {
  const [isNewMail, setIsNewMail] = useState(false);
  const [sendTo, setSendTo] = useState<string>("");
    return (
            <>
            <Redirect to="/" />
            <SideBar setIsNewMail={setIsNewMail} isNewMail={isNewMail} />
            <div>
                <MailsHeader />
                {/* {!isOpenedMail */}
                {/* ? */}
                <>
                <Switch>
                    <Route exact path="/">
                        <Mails setIsNewMail={setIsNewMail} setSendTo={setSendTo}/>
                    </Route>
                    <Route exact path="/sent">
                        <Mails setIsNewMail={setIsNewMail} setSendTo={setSendTo}/>
                    </Route>
                    <Route exact path="/trash">
                        <Mails setIsNewMail={setIsNewMail} setSendTo={setSendTo}/>
                    </Route>
                </Switch>
                </>
                {/* // : */}
                {/* // <OpenedMail setIsNewMail={setIsNewMail} setSendTo={setSendTo} /> */}
                {/* } */}
            </div>

            { isNewMail && <NewMail isNewMail={isNewMail} setIsNewMail={setIsNewMail} sendTo={sendTo} setSendTo={setSendTo} />}
            </>
    )
}

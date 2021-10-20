import { UserContext } from '../utils/useContexts/UserContext';
import { StatusSetter } from '../utils/render_props/StatusSetter';
import Login from './login/Login';import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { LoginRegistration, ModRegistration } from './Styled';

type Props = {
    setIsLoggedIn: Function;
    setUsername: Function;
}

export function Authentication({ setIsLoggedIn, setUsername }: Props) {
    return (
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
                    }} >
                    <Route exact path="/login">
                        <StatusSetter 
                            render={(status, setStatus) => (
                            <Login status={status} setStatus={setStatus}/>
                            )} 
                        />
                    </Route>
                    </UserContext.Provider>
                </Switch>
            </LoginRegistration>  
        </>
    )
}

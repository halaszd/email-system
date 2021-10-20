import { StatusSetter } from '../utils/render_props/StatusSetter';
import Login from './login/Login';import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { LoginRegistration, ModRegistration } from './Styled';

export function Authentication() {
    return (
        <>
            <Redirect to="/login" />
            <LoginRegistration>
                <Switch>
                    <Route exact path="/registration">
                        <ModRegistration />
                    </Route>
                    <Route exact path="/login">
                        <StatusSetter 
                            render={(status, setStatus) => (
                            <Login status={status} setStatus={setStatus}/>
                            )} 
                        />
                    </Route>
                </Switch>
            </LoginRegistration>  
        </>
    )
}

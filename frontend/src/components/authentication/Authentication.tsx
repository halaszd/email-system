import { StatusSetter } from '../utils/render_props/StatusSetter';
import Login from './login/Login';import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { LoginRegistration, ModRegistration } from './Styled';

import { ApolloProvider as ApolloProvider2 } from 'react-apollo';
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: httpLink,
  cache: new InMemoryCache()
});

export function Authentication() {
    return (
        <>
            <Redirect to="/login" />
            <ApolloProvider2 client={client}>
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
            </ApolloProvider2>
        </>
    )
}

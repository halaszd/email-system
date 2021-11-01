import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import { setContext } from '@apollo/client/link/context';
import { MailProvider } from './components/utils/useContexts/MailContextProvider';
import { AUTH_TOKEN } from './constants';
import { MAIL_QUERY } from './queries_mutations';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <ApolloProvider client={client}>
          <MailProvider>
            <App />
          </MailProvider>
        </ApolloProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// Exportable function which calls apollo client query
export async function queryUserMails(
    typeOfBox: "inbox" | "sent" | "trash" | "all",
    pageNum: number,
    mailsPerPage: number,
    setMails?: Function
) {
    const result = await client.query({
        query: MAIL_QUERY,
        variables: {
            typeOfBox: typeOfBox
        }
    })
    console.log("result in index: ", result["data"]["emails"])
    setMails && setMails(result["data"]["emails"])
    return result["data"]["emails"]
}
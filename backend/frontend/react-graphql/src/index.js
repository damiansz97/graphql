import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLinkReactApollo = createHttpLink({
  uri: 'http://localhost:4000'
});
const clientReactApollo = new ApolloClient({
  link: httpLinkReactApollo,
  cache: new InMemoryCache(),
  //nie wiem czy dziala onError lub console.log(e.networkError.result.errors) w miejscu wywolania bledu
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

ReactDOM.render(
  <ApolloProvider client={clientReactApollo}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


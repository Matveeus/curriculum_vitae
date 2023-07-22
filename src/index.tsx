import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './pages';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo/client';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <Router />
      </StoreProvider>
    </ApolloProvider>
  </React.StrictMode>,
);

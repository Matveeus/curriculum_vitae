import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Provider as StoreProvider } from 'react-redux';
import { client } from '../apollo/client';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ApolloProvider client={client}>
        <StoreProvider store={store}>
          <App />
        </StoreProvider>
      </ApolloProvider>
    </React.StrictMode>
  </BrowserRouter>,
);

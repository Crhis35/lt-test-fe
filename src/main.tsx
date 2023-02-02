import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { client } from './apollo';
import AppProvider from './appProvider';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <HelmetProvider>
       <AppProvider/>
      </HelmetProvider>
    </ApolloProvider>
  </React.StrictMode>
);

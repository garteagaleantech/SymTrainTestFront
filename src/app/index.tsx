import { FetchProvider } from '@context/fetch';
import { Main } from './main';
import { QueryClientProvider } from '@context/query-client';
import React from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@components/lib';

export const App = (): React.ReactElement => (
  <React.StrictMode>
    <QueryClientProvider>
      <FetchProvider>
        <Router>
          <Main />
        </Router>
      </FetchProvider>
      <Toaster />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

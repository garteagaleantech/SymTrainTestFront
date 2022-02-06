import {
  QueryClient,
  QueryClientProvider as RQQueryClientProvider
} from 'react-query';

export const QueryClientProvider: React.FC = ({ children }) => {
  return (
    <RQQueryClientProvider
      client={
        new QueryClient({
          defaultOptions: {
            queries: {
              staleTime: Infinity,
              refetchOnWindowFocus: false,
              retry: 2
            }
          }
        })
      }
    >
      {children}
    </RQQueryClientProvider>
  );
};

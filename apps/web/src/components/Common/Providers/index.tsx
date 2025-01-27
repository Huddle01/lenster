import { ApolloProvider, lensApolloClient } from '@lenster/lens/apollo';
import authLink from '@lib/authLink';
import getLivepeerTheme from '@lib/getLivepeerTheme';
import {
  createReactClient,
  LivepeerConfig,
  studioProvider
} from '@livepeer/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';

import ErrorBoundary from '../ErrorBoundary';
import Layout from '../Layout';
import LanguageProvider from './LanguageProvider';
import UserSigNoncesProvider from './UserSigNoncesProvider';
import Web3Provider from './Web3Provider';

const livepeerClient = createReactClient({
  provider: studioProvider({ apiKey: '' })
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <LanguageProvider>
      <ErrorBoundary>
        <Web3Provider>
          <ApolloProvider client={lensApolloClient(authLink)}>
            <UserSigNoncesProvider />
            <QueryClientProvider client={queryClient}>
              <LivepeerConfig client={livepeerClient} theme={getLivepeerTheme}>
                <ThemeProvider defaultTheme="light" attribute="class">
                  <Layout>{children}</Layout>
                </ThemeProvider>
              </LivepeerConfig>
            </QueryClientProvider>
          </ApolloProvider>
        </Web3Provider>
      </ErrorBoundary>
    </LanguageProvider>
  );
};

export default Providers;

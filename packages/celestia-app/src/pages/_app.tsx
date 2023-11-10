import Layout from '../app/layout';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
const { ApolloProvider } = require('@apollo/client');
import client from '@/apollo/apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="h-full">
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;

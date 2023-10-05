import Layout from '../app/layout';
import { AppProps } from 'next/app';
const { ApolloProvider, gql, useQuery } = require('@apollo/client');
import client from '@/apollo/apollo-client';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="h-full">
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </div>
  );
}

export default MyApp;

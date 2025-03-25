import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
    });
  }

  if (networkError) {
    console.error(`[Network Error]: ${networkError.message}`);
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: process.env.WEB_URL || 'http://localhost:4001/graphql' }),
]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

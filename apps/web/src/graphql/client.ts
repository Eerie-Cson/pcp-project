import {
  ApolloClient,
  InMemoryCache,
  from,
  HttpLink,
  split,
} from '@apollo/client';
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

const componentsLink = new HttpLink({
  uri: process.env.COMPONENTS_URL || 'http://localhost:4002/graphql',
});

const usersLink = new HttpLink({
  uri: process.env.USERS_URL || 'http://localhost:4001/graphql',
});

const directionalLink = split(
  ({ getContext }) => {
    const context = getContext ? getContext() : {};
    return context.service === 'users';
  },
  usersLink,
  componentsLink,
);

const link = from([errorLink, directionalLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

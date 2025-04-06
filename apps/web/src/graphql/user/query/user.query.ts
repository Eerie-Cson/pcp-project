import { gql } from '@apollo/client';

export const USERS = gql`
  query Accounts {
    accounts {
      id
      name
      username
      email
      role
    }
  }
`;

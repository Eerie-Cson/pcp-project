import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateAccount(
    $id: String!
    $username: String!
    $password: String!
    $name: String!
    $email: String!
  ) {
    createAccount(
      createAccountInput: {
        id: $id
        username: $username
        password: $password
        name: $name
        email: $email
      }
    )
  }
`;

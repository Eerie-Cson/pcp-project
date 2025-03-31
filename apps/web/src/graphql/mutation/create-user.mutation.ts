import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateAccount(
    $id: String!
    $username: String!
    $password: String!
    $name: String!
    $email: String!
    $role: AccountType!
  ) {
    createAccount(
      createAccountInput: {
        id: $id
        username: $username
        password: $password
        name: $name
        email: $email
        role: $role
      }
    )
  }
`;

import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation (
    $id: String!
    $username: String!
    $password: String!
    $name: String!
    $email: String!
    $role: Account!
  ) {
    createUser(
      createUserInput: {
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

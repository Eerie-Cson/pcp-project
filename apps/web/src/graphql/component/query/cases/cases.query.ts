import { gql } from '@apollo/client';

export const GET_CASES = gql`
  query cases {
    cases {
      id
      name
      componentType
      price
      manufacturer
      partNumber
      color
      type
      formFactor
      interface
      powerSupply
      sidePanel
    }
  }
`;

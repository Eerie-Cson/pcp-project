import { gql } from '@apollo/client';

export const GET_MOTHERBOARDS = gql`
  query motherboards {
    motherboards {
      id
      name
      componentType
      price
      manufacturer
      partNumber

      socket
      formFactor
      chipset
      memoryMax
      memoryType
      memorySlots
      color
    }
  }
`;

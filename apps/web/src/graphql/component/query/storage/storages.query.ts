import { gql } from '@apollo/client';
export const GET_STORAGES = gql`
  query storages {
    storages {
      id
      name
      componentType
      price
      manufacturer
      partNumber

      capacity
      type
      formFactor
      interface
      NVME
    }
  }
`;

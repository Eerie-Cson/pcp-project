import { gql } from '@apollo/client';

export const GET_MEMORYS = gql`
  query memorys {
    memorys {
      id
      name
      componentType
      price
      manufacturer
      partNumber
      speed
      formFactor
      modules
      voltage
      heatSpreader
      color
    }
  }
`;

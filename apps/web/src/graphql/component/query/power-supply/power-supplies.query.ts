import { gql } from '@apollo/client';

export const GET_POWER_SUPPLIES = gql`
  query powerSupplies {
    powerSupplies {
      id
      name
      componentType
      price
      manufacturer
      partNumber
      model
      type
      wattage
      color
      fanless
      SATAConnectors
      length
    }
  }
`;

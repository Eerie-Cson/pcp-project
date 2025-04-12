import { gql } from '@apollo/client';

export const CREATE_POWER_SUPPLY = gql`
  mutation CREATE_POWER_SUPPLY(
    $id: String!
    $name: String!
    $componentType: ComponentType!
    $price: String!
    $manufacturer: String!
    $partNumber: String!
    $model: String!
    $type: String!
    $wattage: String!
    $color: String!
    $fanless: Boolean!
    $SATAConnectors: String!
    $length: String!
  ) {
    createPowerSupply(
      createPowerSupplyInput: {
        id: $id
        name: $name
        componentType: $componentType
        price: $price
        manufacturer: $manufacturer
        partNumber: $partNumber
        model: $model
        type: $type
        wattage: $wattage
        color: $color
        fanless: $fanless
        SATAConnectors: $SATAConnectors
        length: $length
      }
    )
  }
`;

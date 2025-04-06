import { gql } from '@apollo/client';

export const CREATE_CASE = gql`
  mutation CREATE_CASE(
    $id: String!
    $name: String!
    $componentType: ComponentType!
    $price: String!
    $manufacturer: String!
    $partNumber: String!
    $color: String!
    $type: CaseType!
    $formFactor: String!
    $interface: String!
    $powerSupply: Boolean!
    $sidePanel: SidePanelType!
  ) {
    createCase(
      createCaseInput: {
        id: $id
        name: $name
        componentType: $componentType
        price: $price
        manufacturer: $manufacturer
        partNumber: $partNumber
        color: $color
        type: $type
        formFactor: $formFactor
        interface: $interface
        powerSupply: $powerSupply
        sidePanel: $sidePanel
      }
    )
  }
`;

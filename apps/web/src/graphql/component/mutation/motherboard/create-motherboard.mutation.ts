import { gql } from '@apollo/client';

export const CREATE_MOTHERBOARD = gql`
  mutation CREATE_MOTHERBOARD(
    $id: String!
    $name: String!
    $componentType: ComponentType!
    $price: String!
    $manufacturer: String!
    $partNumber: String!
    $socket: String!
    $formFactor: String!
    $chipset: String!
    $memoryMax: String!
    $memoryType: MemoryType!
    $memorySlots: String!
    $color: String!
  ) {
    createMotherboard(
      createMotherboardInput: {
        id: $id
        name: $name
        componentType: $componentType
        price: $price
        manufacturer: $manufacturer
        partNumber: $partNumber
        socket: $socket
        formFactor: $formFactor
        chipset: $chipset
        memoryMax: $memoryMax
        memoryType: $memoryType
        memorySlots: $memorySlots
        color: $color
      }
    )
  }
`;

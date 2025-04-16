import { gql } from '@apollo/client';

export const CREATE_STORAGE = gql`
  mutation CREATE_STORAGE(
    $id: String!
    $name: String!
    $componentType: ComponentType!
    $price: String!
    $manufacturer: String!
    $partNumber: String!
    $capacity: String!
    $type: StorageType!
    $formFactor: String!
    $interface: String!
    $NVME: Boolean!
  ) {
    createStorage(
      createStorageInput: {
        id: $id
        name: $name
        componentType: $componentType
        price: $price
        manufacturer: $manufacturer
        partNumber: $partNumber
        capacity: $capacity
        type: $type
        formFactor: $formFactor
        interface: $interface
        NVME: $NVME
      }
    )
  }
`;

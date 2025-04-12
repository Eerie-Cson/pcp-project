import { gql } from '@apollo/client';

export const CREATE_VIDEO_CARD = gql`
  mutation CREATE_VIDEO_CARD(
    $id: String!
    $name: String!
    $componentType: ComponentType!
    $price: String!
    $manufacturer: String!
    $partNumber: String!
    $model: String!
    $chipset: String!
    $memory: String!
    $memoryType: String!
    $coreClock: String!
    $interface: String!
    $color: String!
    $TDP: String!
    $coolingFans: String!
    $displayPortOutputs: String!
    $HDMIOutputs: String!
  ) {
    createVideoCard(
      createVideoCardInput: {
        id: $id
        name: $name
        componentType: $componentType
        price: $price
        manufacturer: $manufacturer
        partNumber: $partNumber
        model: $model
        chipset: $chipset
        memory: $memory
        memoryType: $memoryType
        coreClock: $coreClock
        interface: $interface
        color: $color
        TDP: $TDP
        coolingFans: $coolingFans
        displayPortOutputs: $displayPortOutputs
        HDMIOutputs: $HDMIOutputs
      }
    )
  }
`;

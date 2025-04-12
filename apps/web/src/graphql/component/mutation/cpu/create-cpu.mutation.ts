import { gql } from '@apollo/client';

export const CREATE_CPU = gql`
  mutation CREATE_CPU(
    $id: String!
    $name: String!
    $price: String!
    $componentType: ComponentType!
    $manufacturer: String!
    $partNumber: String!
    $series: String!
    $microarchitecture: String!
    $coreFamily: String!
    $socket: String!
    $coreCount: String!
    $coreClock: String!
    $tdp: String!
    $integratedGraphics: String!
    $cooler: Boolean!
    $packaging: PackagingType!
  ) {
    createCPU(
      createCPUInput: {
        id: $id
        name: $name
        price: $price
        componentType: $componentType
        manufacturer: $manufacturer
        partNumber: $partNumber
        series: $series
        microarchitecture: $microarchitecture
        coreFamily: $coreFamily
        socket: $socket
        coreCount: $coreCount
        coreClock: $coreClock
        tdp: $tdp
        integratedGraphics: $integratedGraphics
        cooler: $cooler
        packaging: $packaging
      }
    )
  }
`;

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

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

export const CREATE_MEMORY = gql`
  mutation CREATE_MEMORY(
    $id: String!
    $name: String!
    $price: String!
    $manufacturer: String!
    $partNumber: String!
    $componentType: ComponentType!
    $speed: String!
    $formFactor: String!
    $modules: String!
    $voltage: String!
    $heatSpreader: Boolean!
    $color: String!
  ) {
    createMemory(
      createMemoryInput: {
        id: $id
        name: $name
        price: $price
        manufacturer: $manufacturer
        partNumber: $partNumber
        componentType: $componentType
        speed: $speed
        formFactor: $formFactor
        modules: $modules
        voltage: $voltage
        heatSpreader: $heatSpreader
        color: $color
      }
    )
  }
`;

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

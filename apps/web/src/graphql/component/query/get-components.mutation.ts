import { gql } from '@apollo/client';

export const GET_CASES = gql`
  query cases {
    cases {
      id
      name
      componentType
      price
      manufacturer
      partNumber
      color
      type
      formFactor
      interface
      powerSupply
      sidePanel
    }
  }
`;

export const GET_CPUS = gql`
  query CPUs {
    CPUs {
      id
      name
      componentType
      price
      manufacturer
      partNumber
      series
      microarchitecture
      coreFamily
      socket
      coreCount
      coreClock
      tdp
      integratedGraphics
      cooler
      packaging
    }
  }
`;

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

import { gql } from '@apollo/client';

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

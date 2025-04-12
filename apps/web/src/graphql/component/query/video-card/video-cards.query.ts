import { gql } from '@apollo/client';

export const GET_VIDEO_CARDS = gql`
  query videoCards {
    videoCards {
      id
      name
      componentType
      price
      manufacturer
      partNumber
      model
      chipset
      memory
      memoryType
      coreClock
      interface
      color
      TDP
      coolingFans
      displayPortOutputs
      HDMIOutputs
    }
  }
`;

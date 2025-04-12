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

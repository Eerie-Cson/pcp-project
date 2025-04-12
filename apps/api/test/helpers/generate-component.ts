import {
  CaseType,
  Component,
  ComponentType,
  MemoryType,
  PackagingType,
  SidePanelType,
  StorageType,
} from '@pcp/types';

import { faker } from '@faker-js/faker';
import { ObjectId, ObjectTypes } from '@pcp/object-id';
import * as R from 'ramda';

type ComponentWithType<T extends ComponentType> = Extract<
  Component,
  { componentType: T }
>;

const componentFactories: Record<ComponentType, () => Partial<Component>> = {
  [ComponentType.CPU]: () => ({
    socket: faker.word.noun(),
    series: faker.word.words(),
    microarchitecture: faker.string.alpha(),
    coreFamily: faker.string.alpha(),
    coreCount: faker.helpers.arrayElement(['1', '2', '4', '8', '16', '32']),
    coreClock: `${faker.string.alpha()} hz`,
    tdp: faker.string.alpha(),
    integratedGraphics: faker.string.alpha(),
    cooler: faker.datatype.boolean(),
    packaging: faker.helpers.enumValue(PackagingType),
  }),
  [ComponentType.CASE]: () => ({
    color: faker.color.human(),
    type: faker.helpers.enumValue(CaseType),
    formFactor: faker.word.adjective(),
    interface: faker.word.noun(),
    powerSupply: faker.datatype.boolean(),
    sidePanel: faker.helpers.enumValue(SidePanelType),
  }),
  [ComponentType.MOTHERBOARD]: () => ({
    socket: faker.string.alpha(),
    formFactor: faker.string.alpha(),
    chipset: faker.string.alpha(),
    memoryMax: faker.string.alpha(),
    memoryType: faker.helpers.enumValue(MemoryType),
    memorySlots: faker.string.alpha(),
    color: faker.color.human(),
  }),
  [ComponentType.MEMORY]: () => ({
    speed: faker.string.alpha(),
    formFactor: faker.string.alpha(),
    modules: faker.string.alpha(),
    voltage: faker.string.alpha(),
    heatSpreader: faker.datatype.boolean(),
    color: faker.color.human(),
  }),
  [ComponentType.STORAGE]: () => ({
    capacity: faker.string.alpha(),
    type: faker.helpers.enumValue(StorageType),
    formFactor: faker.string.alpha(),
    interface: faker.string.alpha(),
    NVME: faker.datatype.boolean(),
  }),
  [ComponentType.VIDEO_CARD]: () => ({
    model: faker.string.alpha(),
    chipset: faker.string.alpha(),
    memory: faker.string.alpha(),
    memoryType: faker.string.alpha(),
    coreClock: faker.string.alpha(),
    interface: faker.string.alpha(),
    color: faker.string.alpha(),
    TDP: faker.string.alpha(),
    coolingFans: faker.string.alpha(),
    displayPortOutputs: faker.string.alpha(),
    HDMIOutputs: faker.string.alpha(),
  }),
  [ComponentType.POWER_SUPPLY]: () => ({
    model: faker.string.alpha(),
    type: faker.string.alpha(),
    wattage: faker.string.alpha(),
    color: faker.string.alpha(),
    fanless: faker.datatype.boolean(),
    SATAConnectors: faker.string.alpha(),
    length: faker.string.alpha(),
  }),
};

export function generateComponent<T extends ComponentType>(
  objectType: ObjectTypes,
) {
  const componentType = Object.keys(ObjectTypes).find(
    (key) => ObjectTypes[key] === objectType,
  );

  const componentFixture = () =>
    ({
      id: ObjectId.generate(objectType),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      manufacturer: faker.company.name(),
      partNumber: faker.string.alphanumeric(7).toUpperCase(),
      componentType,
      ...componentFactories[componentType](),
    }) as ComponentWithType<T>;

  return {
    component: componentFixture(),
    componentTimes: R.times(componentFixture),
  };
}

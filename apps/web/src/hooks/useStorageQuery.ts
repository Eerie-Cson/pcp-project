import { GET_STORAGES } from '../graphql/component/query/storage/storages.query';
import { ComponentType, Storage } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { UseComponentQueryReturnType } from '../libs/types/queryHooks';
import { useComponentQuery } from './useComponentQuery';

export function useStoragesQuery(): UseComponentQueryReturnType<
  PcComponent<ComponentType.Storage>
> {
  return useComponentQuery<Storage, ComponentType.Storage>(
    GET_STORAGES,
    'storages',
    (Storage) => ({
      id: Storage.id,
      name: Storage.name,
      type: ComponentType.Storage,
      price: Number(Storage.price),
      partNumber: Storage.partNumber,
      specs: {
        Manufacturer: Storage.manufacturer,

        Capacity: Storage.capacity,
        Type: Storage.type,
        'Form Factor': Storage.formFactor,
        NVME: Storage.NVME,
        interface: Storage.interface,
      },
      brand: Storage.manufacturer,
      image: 'https://example.com/case.jpg',
      compatibility: ['ATX', 'Micro-ATX'],
      features: ['RGB Lighting', 'Tempered Glass Side Panel'],
    }),
  );
}

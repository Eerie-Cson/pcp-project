import { PcComponent, ComponentType } from '../libs/components';

export const COMPONENT_TYPES: ComponentType[] = [
  'CPU',
  'GPU',
  'Motherboard',
  'RAM',
  'Storage',
  'PSU',
  'Case',
  'Cooling',
];

export const allComponents: PcComponent[] = [
  {
    id: 'cpu-1',
    name: 'AMD Ryzen 9 7950X',
    type: 'CPU',
    price: 699,
    specs: {
      'Cores/Threads': '16/32',
      'Base Clock': '4.5GHz',
      'Boost Clock': '5.7GHz',
      Socket: 'AM5',
      TDP: '170W',
      Cache: '80MB',
    },
    brand: 'AMD',
    image: 'https://example.com/cpu-amd.jpg',
    compatibility: ['AM5'],
    rating: 4.9,
    features: ['Zen 4 Architecture', 'PCIe 5.0 Support', 'DDR5 Memory Support'],
  },
  {
    id: 'gpu-1',
    name: 'NVIDIA RTX 4090 Founders Edition',
    type: 'GPU',
    price: 1599,
    specs: {
      'CUDA Cores': '16384',
      'Boost Clock': '2.52GHz',
      Memory: '24GB GDDR6X',
      'Memory Bus': '384-bit',
      'Power Connectors': '1x 16-pin',
      TDP: '450W',
    },
    brand: 'NVIDIA',
    image: 'https://example.com/rtx4090.jpg',
    compatibility: ['PCIe 4.0'],
    rating: 4.8,
    features: ['DLSS 3', 'Ray Tracing', 'AV1 Encoding'],
  },
  // Add 10+ more components with similar detail
];

export const FEATURED_BRANDS = [
  'AMD',
  'Intel',
  'NVIDIA',
  'Corsair',
  'ASUS',
  'MSI',
  'Samsung',
  'Seagate',
];

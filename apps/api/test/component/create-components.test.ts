import { setupFixture } from '../component-fixture';
import { CaseRepository } from '../../src/features/component/repository/case.repository';
import { CpuRepository } from '../../src/features/component/repository/cpu.repository';
import { Tokens as ComponentToken } from '../../src/features/component/libs/tokens';
import { generateComponent } from '../helpers/generate-component';
import { ComponentType } from '@pcp/types';
import { ObjectTypes } from '@pcp/object-id';
import { MemoryRepository } from '../../src/features/component/repository/memory.repository';

describe('Components.Create', () => {
  test('Create Case', async () => {
    const { module, request, teardown } = await setupFixture();

    const caseRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );

    const caseComponent = {
      ...generateComponent(ObjectTypes.CASE, ComponentType.CASE),
      componentType: ComponentType.CASE,
    };

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $createCaseInput: CreateCaseInput!
          ) {
            createCase(createCaseInput: $createCaseInput)
          }
      `,
      variables: {
        createCaseInput: {
          ...caseComponent,
          id: caseComponent.id.toString(),
        },
      },
    });

    const createdCase = await caseRepository.find(caseComponent.id);
    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createCase).toBeTruthy();
    expect(createdCase).toMatchObject({
      id: caseComponent.id.toString(),
      name: caseComponent.name,
      componentType: ComponentType.CASE,
      price: caseComponent.price,
      manufacturer: caseComponent.manufacturer,
      partNumber: caseComponent.partNumber,
    });

    await teardown();
  });

  test('Create Cpu', async () => {
    const { module, request, teardown } = await setupFixture();

    const cpuRepository = module.get<CpuRepository>(
      ComponentToken.CpuRepository,
    );

    const cpuComponent = {
      ...generateComponent(ObjectTypes.CPU, ComponentType.CPU),
      componentType: ComponentType.CPU,
    };

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $createCPUInput: CreateCPUInput!
          ) {
            createCPU(createCPUInput: $createCPUInput)
          }
      `,
      variables: {
        createCPUInput: {
          ...cpuComponent,
          id: cpuComponent.id.toString(),
        },
      },
    });

    const createdCPU = await cpuRepository.find(cpuComponent.id);

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createCPU).toBeTruthy();
    expect(createdCPU).toMatchObject({
      id: cpuComponent.id.toString(),
      name: cpuComponent.name,
      componentType: ComponentType.CPU,
      price: cpuComponent.price,
      manufacturer: cpuComponent.manufacturer,
      partNumber: cpuComponent.partNumber,
    });

    await teardown();
  });

  test('Create Memory', async () => {
    const { module, request, teardown } = await setupFixture();

    const memoryRepository = module.get<MemoryRepository>(
      ComponentToken.MemoryRepository,
    );

    const memoryComponent = {
      ...generateComponent(ObjectTypes.MEMORY, ComponentType.MEMORY),
      componentType: ComponentType.MEMORY,
    };

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $createMemoryInput: CreateMemoryInput!
          ) {
            createMemory(createMemoryInput: $createMemoryInput)
          }
      `,
      variables: {
        createMemoryInput: {
          ...memoryComponent,
          id: memoryComponent.id.toString(),
        },
      },
    });

    const createdMemory = await memoryRepository.find(memoryComponent.id);

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createMemory).toBeTruthy();
    expect(createdMemory).toMatchObject({
      id: memoryComponent.id.toString(),
      name: memoryComponent.name,
      componentType: ComponentType.MEMORY,
      price: memoryComponent.price,
      manufacturer: memoryComponent.manufacturer,
      partNumber: memoryComponent.partNumber,
    });

    await teardown();
  });
});

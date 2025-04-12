import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { CpuRepository } from '../../../../src/features/component/repository/cpu.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Create', () => {
  test('Create Cpu', async () => {
    const { module, request, teardown } = await setupFixture();

    const cpuRepository = module.get<CpuRepository>(
      ComponentToken.CpuRepository,
    );

    const { component: cpuComponent } = generateComponent<ComponentType.CPU>(
      ObjectTypes.CPU,
    );

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
});

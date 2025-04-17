import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { CpuRepository } from '../../../../src/features/component/repository/cpu.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Delete', () => {
  test('Delete CPU', async () => {
    const { module, request, teardown } = await setupFixture();

    const cpuRepository = module.get<CpuRepository>(
      ComponentToken.CpuRepository,
    );

    const { component: cpuComponent } = generateComponent<ComponentType.CPU>(
      ObjectTypes.CPU,
    );

    await cpuRepository.create(cpuComponent);

    const response = await request.post('/graphql').send({
      query: `
        mutation($id: String!) {
          deleteCPU(id: $id)
        }
      `,
      variables: {
        id: cpuComponent.id.toString(),
      },
    });

    const foundCpu = await cpuRepository.find(
      ObjectId.from(cpuComponent.id.toString()),
    );

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deleteCPU).toBeTruthy();
    expect(foundCpu).toBeNull();

    await teardown();
  });
});

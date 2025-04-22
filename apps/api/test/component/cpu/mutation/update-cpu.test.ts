import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
import { CpuRepository } from '../../../../src/features/component/repository/cpu.repository';

describe('Component.Update', () => {
  test('Update CPU', async () => {
    const { module, request, teardown } = await setupFixture();

    const cpuRepository = module.get<CpuRepository>(
      ComponentToken.CpuRepository,
    );

    const { component: cpuComponent } =
      generateComponent<ComponentType.CPU>(ObjectTypes.CPU);

    const updateInput = {
      name: 'Updated CPU',
    };

    await cpuRepository.create(cpuComponent);

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $updateCPUInput: UpdateCPUInput!
          ) {
            updateCPU(id: $id, updateCPUInput: $updateCPUInput)
          }
      `,
      variables: {
        id: cpuComponent.id.toString(),
        updateCPUInput: updateInput,
      },
    });

    const updatedCPU = await cpuRepository.find(
      cpuComponent.id,
    );

    await teardown();
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.updateCPU).toBeTruthy();
    expect(updatedCPU.name).toBe(updateInput.name);

    await teardown();
  });
});

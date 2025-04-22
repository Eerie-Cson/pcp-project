import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
import { MotherboardRepository } from '../../../../src/features/component/repository/motherboard.repository';

describe('Component.Update', () => {
  test('Update Motherboard', async () => {
    const { module, request, teardown } = await setupFixture();

    const motherboardRepository = module.get<MotherboardRepository>(
      ComponentToken.MotherboardRepository,
    );

    const { component: motherboardComponent } =
      generateComponent<ComponentType.MOTHERBOARD>(ObjectTypes.MOTHERBOARD);

    const updateInput = {
      name: 'Updated Motherboard',
    };

    await motherboardRepository.create(motherboardComponent);

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $updateMotherboardInput: UpdateMotherboardInput!
          ) {
            updateMotherboard(id: $id, updateMotherboardInput: $updateMotherboardInput)
          }
      `,
      variables: {
        id: motherboardComponent.id.toString(),
        updateMotherboardInput: updateInput,
      },
    });

    const updatedMotherboard = await motherboardRepository.find(
      motherboardComponent.id,
    );

    await teardown();
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.updateMotherboard).toBeTruthy();
    expect(updatedMotherboard.name).toBe(updateInput.name);

    await teardown();
  });
});

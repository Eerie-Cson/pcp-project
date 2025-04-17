import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { MotherboardRepository } from '../../../../src/features/component/repository/motherboard.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Delete', () => {
  test('Delete Motherboard', async () => {
    const { module, request, teardown } = await setupFixture();

    const motherboardRepository = module.get<MotherboardRepository>(
      ComponentToken.MotherboardRepository,
    );

    const { component: motherboardComponent } =
      generateComponent<ComponentType.MOTHERBOARD>(ObjectTypes.MOTHERBOARD);

    await motherboardRepository.create(motherboardComponent);

    const response = await request.post('/graphql').send({
      query: `
        mutation($id: String!) {
          deleteMotherboard(id: $id)
        }
      `,
      variables: {
        id: motherboardComponent.id.toString(),
      },
    });

    const foundMotherboard = await motherboardRepository.find(
      motherboardComponent.id,
    );

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deleteMotherboard).toBeTruthy();
    expect(foundMotherboard).toBeNull();

    await teardown();
  });
});

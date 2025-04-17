import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { PowerSupplyRepository } from '../../../../src/features/component/repository/power-supply.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Delete', () => {
  test('Delete PowerSupply', async () => {
    const { module, request, teardown } = await setupFixture();

    const powerSupplyRepository = module.get<PowerSupplyRepository>(
      ComponentToken.PowerSupplyRepository,
    );

    const { component: powerSupplyComponent } =
      generateComponent<ComponentType.POWER_SUPPLY>(ObjectTypes.POWER_SUPPLY);

    await powerSupplyRepository.create(powerSupplyComponent);

    const response = await request.post('/graphql').send({
      query: `
        mutation($id: String!) {
          deletePowerSupply(id: $id)
        }
      `,
      variables: {
        id: powerSupplyComponent.id.toString(),
      },
    });

    const foundPowerSupply = await powerSupplyRepository.find(
      ObjectId.from(powerSupplyComponent.id.toString()),
    );

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deletePowerSupply).toBeTruthy();
    expect(foundPowerSupply).toBeNull();

    await teardown();
  });
});

import { ObjectTypes } from '@pcp/object-id';
import { PowerSupply, ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
import { PowerSupplyRepository } from '../../../../src/features/component/repository/power-supply.repository';

describe('Component.Update', () => {
  test('Update PowerSupply', async () => {
    const { module, request, teardown } = await setupFixture();

    const powerSupplyRepository = module.get<PowerSupplyRepository>(
      ComponentToken.PowerSupplyRepository,
    );

    const { component: powerSupplyComponent } =
      generateComponent<ComponentType.POWER_SUPPLY>(ObjectTypes.POWER_SUPPLY);

    const updateInput = {
      name: 'Updated PowerSupply',
    };

    await powerSupplyRepository.create(powerSupplyComponent);

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $updatePowerSupplyInput: UpdatePowerSupplyInput!
          ) {
            updatePowerSupply(id: $id, updatePowerSupplyInput: $updatePowerSupplyInput)
          }
      `,
      variables: {
        id: powerSupplyComponent.id.toString(),
        updatePowerSupplyInput: updateInput,
      },
    });

    const updatedPowerSupply = await powerSupplyRepository.find(
      powerSupplyComponent.id,
    );

    await teardown();
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.updatePowerSupply).toBeTruthy();
    expect(updatedPowerSupply.name).toBe(updateInput.name);

    await teardown();
  });
});

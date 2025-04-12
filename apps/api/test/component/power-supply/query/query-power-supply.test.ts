import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { PowerSupplyRepository } from '../../../../src/features/component/repository/power-supply.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Query', () => {
  test('Get PowerSupply', async () => {
    const { module, request, teardown } = await setupFixture();

    const powerSupplyRepository = module.get<PowerSupplyRepository>(
      ComponentToken.PowerSupplyRepository,
    );

    const { componentTimes } = generateComponent<ComponentType.POWER_SUPPLY>(
      ObjectTypes.POWER_SUPPLY,
    );

    const powerSupplies = componentTimes(3);

    await Promise.all(
      powerSupplies.map((component) => powerSupplyRepository.create(component)),
    );

    const getPowerSupplyResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          powerSupply(id: $id) {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
      variables: {
        id: powerSupplies[0].id.toString(),
      },
    });

    await teardown();

    expect(getPowerSupplyResponse.status).toEqual(200);
    expect(getPowerSupplyResponse.body).not.toHaveProperty('errors');
    expect(getPowerSupplyResponse.body.data.powerSupply).toBeTruthy();
    expect(getPowerSupplyResponse.body.data.powerSupply).toMatchObject({
      id: powerSupplies[0].id.toString(),
      name: powerSupplies[0].name,
      partNumber: powerSupplies[0].partNumber,
      componentType: ComponentType.POWER_SUPPLY,
      price: powerSupplies[0].price,
    });

    await teardown();
  });
});

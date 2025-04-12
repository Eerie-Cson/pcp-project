import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { PowerSupplyRepository } from '../../../../src/features/component/repository/power-supply.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
describe('Components.Query', () => {
  test('Get Power Supplies', async () => {
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

    const getMotherboardsResponse = await request.post('/graphql').send({
      query: `
        query {
          powerSupplies {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
    });

    await teardown();

    expect(getMotherboardsResponse.status).toEqual(200);
    expect(getMotherboardsResponse.body.data.powerSupplies).toBeTruthy();
    expect(getMotherboardsResponse.body).not.toHaveProperty('errors');
    expect(getMotherboardsResponse.body.data.powerSupplies).toHaveLength(3);

    await teardown();
  });
});

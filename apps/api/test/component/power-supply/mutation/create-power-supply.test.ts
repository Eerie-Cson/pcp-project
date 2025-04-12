import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { PowerSupplyRepository } from '../../../../src/features/component/repository/power-supply.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Create', () => {
  test('Create Power Supply', async () => {
    const { module, request, teardown } = await setupFixture();

    const powerSupplyRepository = module.get<PowerSupplyRepository>(
      ComponentToken.PowerSupplyRepository,
    );

    const { component: powerSupplyComponent } =
      generateComponent<ComponentType.POWER_SUPPLY>(ObjectTypes.POWER_SUPPLY);

    const response = await request.post('/graphql').send({
      query: `
        mutation($createPowerSupplyInput: CreatePowerSupplyInput!) {
          createPowerSupply(createPowerSupplyInput: $createPowerSupplyInput) 
        }
      `,
      variables: {
        createPowerSupplyInput: {
          ...powerSupplyComponent,
          id: powerSupplyComponent.id.toString(),
        },
      },
    });

    const createdPowerSupply = await powerSupplyRepository.find(
      powerSupplyComponent.id,
    );

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createPowerSupply).toBeTruthy();
    expect(createdPowerSupply).toMatchObject({
      id: powerSupplyComponent.id.toString(),
      name: powerSupplyComponent.name,
      componentType: ComponentType.POWER_SUPPLY,
      price: powerSupplyComponent.price,
      manufacturer: powerSupplyComponent.manufacturer,
      partNumber: powerSupplyComponent.partNumber,
    });

    await teardown();
  });
});

import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { MotherboardRepository } from '../../../../src/features/component/repository/motherboard.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Query', () => {
  test('Get Motherboard', async () => {
    const { module, request, teardown } = await setupFixture();

    const motherboardRepository = module.get<MotherboardRepository>(
      ComponentToken.MotherboardRepository,
    );

    const { componentTimes } = generateComponent<ComponentType.MOTHERBOARD>(
      ObjectTypes.MOTHERBOARD,
    );

    const motherboards = componentTimes(3);

    await Promise.all(
      motherboards.map((component) => motherboardRepository.create(component)),
    );

    const getMotherboardResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          motherboard(id: $id) {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
      variables: {
        id: motherboards[0].id.toString(),
      },
    });

    await teardown();

    console.log(getMotherboardResponse.text);

    expect(getMotherboardResponse.status).toEqual(200);
    expect(getMotherboardResponse.body).not.toHaveProperty('errors');
    expect(getMotherboardResponse.body.data.motherboard).toBeTruthy();
    expect(getMotherboardResponse.body.data.motherboard).toMatchObject({
      id: motherboards[0].id.toString(),
      name: motherboards[0].name,
      partNumber: motherboards[0].partNumber,
      componentType: ComponentType.MOTHERBOARD,
      price: motherboards[0].price,
    });

    await teardown();
  });
});

import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentTokens } from '../../../../src/features/component/libs/tokens';
import { MotherboardRepository } from '../../../../src/features/component/repository/motherboard.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Create', () => {
  test('Create Motherboard', async () => {
    const { module, request, teardown } = await setupFixture();

    const motherboardRepository = module.get<MotherboardRepository>(
      ComponentTokens.MotherboardRepository,
    );

    const { component: motherboardComponent } =
      generateComponent<ComponentType.MOTHERBOARD>(ObjectTypes.MOTHERBOARD);

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $createMotherboardInput: CreateMotherboardInput!
          ) {
            createMotherboard(createMotherboardInput: $createMotherboardInput)
          }
      `,
      variables: {
        createMotherboardInput: {
          ...motherboardComponent,
          id: motherboardComponent.id.toString(),
        },
      },
    });

    const createdmotherBoard = await motherboardRepository.find(
      motherboardComponent.id,
    );

    await teardown();
    console.log(response.text);
    console.log(createdmotherBoard);

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createMotherboard).toBeTruthy();
    expect(createdmotherBoard).toMatchObject({
      id: motherboardComponent.id.toString(),
      name: motherboardComponent.name,
      componentType: ComponentType.MOTHERBOARD,
      price: motherboardComponent.price,
      manufacturer: motherboardComponent.manufacturer,
      partNumber: motherboardComponent.partNumber,
    });

    await teardown();
  });
});

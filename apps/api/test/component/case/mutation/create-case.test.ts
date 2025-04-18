import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { CaseRepository } from '../../../../src/features/component/repository/case.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Create', () => {
  test('Create Case', async () => {
    const { module, request, teardown } = await setupFixture();

    const caseRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );

    const { component: caseComponent } = generateComponent<ComponentType.CASE>(
      ObjectTypes.CASE,
    );

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $createCaseInput: CreateCaseInput!
          ) {
            createCase(createCaseInput: $createCaseInput)
          }
      `,
      variables: {
        createCaseInput: {
          ...caseComponent,
          id: caseComponent.id.toString(),
        },
      },
    });

    const createdCase = await caseRepository.find(caseComponent.id);
    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.createCase).toBeTruthy();
    expect(createdCase).toMatchObject({
      id: caseComponent.id.toString(),
      name: caseComponent.name,
      componentType: ComponentType.CASE,
      price: caseComponent.price,
      manufacturer: caseComponent.manufacturer,
      partNumber: caseComponent.partNumber,
    });

    await teardown();
  });
});

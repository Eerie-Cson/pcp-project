import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { CaseRepository } from '../../../../src/features/component/repository/case.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Delete', () => {
  test('Delete Case', async () => {
    const { module, request, teardown } = await setupFixture();

    const caseRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );

    const { component: caseComponent } = generateComponent<ComponentType.CASE>(
      ObjectTypes.CASE,
    );

    await caseRepository.create(caseComponent);

    const response = await request.post('/graphql').send({
      query: `
        mutation($id: String!) {
          deleteCase(id: $id)
        }
      `,
      variables: {
        id: caseComponent.id.toString(),
      },
    });

    const foundCase = await caseRepository.find(
      ObjectId.from(caseComponent.id.toString()),
    );

    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deleteCase).toBeTruthy();
    expect(foundCase).toBeNull();

    await teardown();
  });
});

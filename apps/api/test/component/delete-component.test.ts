import { setupFixture } from '../component-fixture';
import { CaseRepository } from '../../src/features/component/repository/case.repository';
import { Tokens as ComponentToken } from '../../src/features/component/libs/tokens';
import { generateComponent } from '../helpers/generate-component';
import { ObjectTypes } from '@pcp/object-type';
import { Case, ComponentType } from '@pcp/types';

describe('Components.Delete', () => {
  test('Delete Case', async () => {
    const { module, request, teardown } = await setupFixture();

    const caseRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );

    const caseComponent = generateComponent(
      ObjectTypes.CASE,
      ComponentType.CASE,
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

    const foundCase = (await caseRepository.find({})) as Case[];
    await teardown();

    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.deleteCase).toBeTruthy();
    expect(foundCase.length).toBe(0);

    await teardown();
  });
});

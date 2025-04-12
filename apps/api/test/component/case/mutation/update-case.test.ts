import { ObjectTypes } from '@pcp/object-id';
import { Case, ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { CaseRepository } from '../../../../src/features/component/repository/case.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Component.Update', () => {
  test('Update Case', async () => {
    const { module, request, teardown } = await setupFixture();

    const caseRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );

    const { component: caseComponent } = generateComponent<ComponentType.CASE>(
      ObjectTypes.CASE,
    );

    const updateInput = {
      name: 'Updated Case',
    };

    await caseRepository.create(caseComponent);

    const response = await request.post('/graphql').send({
      query: `
          mutation(
            $id: String!
            $updateCaseInput: UpdateCaseInput!
          ) {
            updateCase(id: $id, updateCaseInput: $updateCaseInput)
          }
      `,
      variables: {
        id: caseComponent.id.toString(),
        updateCaseInput: updateInput,
      },
    });

    const updatedCase = (await caseRepository.find(caseComponent.id)) as Case;

    await teardown();
    expect(response.status).toBe(200);
    expect(response.body).not.toHaveProperty('errors');
    expect(response.body.data.updateCase).toBeTruthy();
    expect(updatedCase.name).toBe(updateInput.name);

    await teardown();
  });
});

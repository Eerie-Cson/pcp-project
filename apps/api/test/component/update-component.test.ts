import { setupFixture } from '../component-fixture';
import { generateComponent } from '../helpers/generate-component';
import { CaseRepository } from '../../src/features/component/repository/case.repository';
import { Tokens as ComponentToken } from '../../src/features/component/libs/tokens';
import { Case, ComponentType } from '@pcp/types';
import { ObjectTypes } from '@pcp/object-type';

describe('Components.Update', () => {
  test('Update Case', async () => {
    const { module, request, teardown } = await setupFixture();

    const caseRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );

    const caseComponent = await generateComponent(
      ObjectTypes.CASE,
      ComponentType.CASE,
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

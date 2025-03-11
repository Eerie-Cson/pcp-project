import { setupFixture } from '../component-fixture';
import { CaseRepository } from '../../src/features/component/repository/case.repository';
import { Tokens as ComponentToken } from '../../src/features/component/libs/tokens';
import { generateComponent } from '../helpers/generate-component';
import { ComponentType } from '@pcp/types';

describe('Components', () => {
  test('Create Case', async () => {
    const { module, request, teardown } = await setupFixture();

    const caseRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );

    const caseComponent = await generateComponent(ComponentType.CASE);
    console.log(caseComponent);

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

    const createdCase = await caseRepository.find({ name: caseComponent.name });
    await teardown();

    console.log(createdCase);
    console.log(response);

    expect(response.status).toBe(200);
  });
});

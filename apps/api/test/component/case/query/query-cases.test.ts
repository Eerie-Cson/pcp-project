import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { CaseRepository } from '../../../../src/features/component/repository/case.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Components.Query', () => {
  test('Get Cases', async () => {
    const { module, request, teardown } = await setupFixture();

    const caseRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );
    const { componentTimes } = generateComponent<ComponentType.CASE>(
      ObjectTypes.CASE,
    );
    const cases = componentTimes(3);

    await Promise.all(
      cases.map((component) => caseRepository.create(component)),
    );

    const getCasesResponse = await request.post('/graphql').send({
      query: `
            query {
              cases {
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

    expect(getCasesResponse.status).toEqual(200);
    expect(getCasesResponse.body.data.cases).toBeTruthy();
    expect(getCasesResponse.body).not.toHaveProperty('errors');
    expect(getCasesResponse.body.data.cases).toHaveLength(3);

    await teardown();
  });
});

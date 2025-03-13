import { setupFixture } from '../component-fixture';
import { generateComponent } from '../helpers/generate-component';
import { ComponentType } from '@pcp/types';
import { CaseRepository } from '../../src/features/component/repository/case.repository';
import { Tokens as ComponentToken } from '../../src/features/component/libs/tokens';
import { ObjectTypes } from '@pcp/object-type';

import * as R from 'ramda';

describe('Components.Query', () => {
  test('Get Cases', async () => {
    const { module, request, teardown } = await setupFixture();

    const componentRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );

    const cases = R.times(() =>
      generateComponent(ObjectTypes.CASE, ComponentType.CASE),
    )(3);

    await Promise.all(
      cases.map((component) => componentRepository.create(component)),
    );

    const getCaseResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          getCase(id: $id) {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
      variables: {
        id: cases[0].id.toString(),
      },
    });

    const getCasesResponse = await request.post('/graphql').send({
      query: `
        query {
          getCases {
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

    expect(getCaseResponse.status).toEqual(200);
    expect(getCaseResponse.body).not.toHaveProperty('errors');
    expect(getCaseResponse.body.data.getCase).toBeTruthy();
    expect(getCaseResponse.body.data.getCase).toMatchObject({
      id: cases[0].id.toString(),
      name: cases[0].name,
      partNumber: cases[0].partNumber,
      componentType: ComponentType.CASE,
      price: cases[0].price,
    });

    expect(getCasesResponse.status).toEqual(200);
    expect(getCasesResponse.body.data.getCases).toBeTruthy();
    expect(getCasesResponse.body).not.toHaveProperty('errors');
    expect(getCasesResponse.body.data.getCases).toHaveLength(3);

    await teardown();
  });
});

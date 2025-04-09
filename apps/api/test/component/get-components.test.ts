import { setupFixture } from '../component-fixture';
import { generateComponent } from '../helpers/generate-component';
import { ComponentType } from '@pcp/types';
import { CaseRepository } from '../../src/features/component/repository/case.repository';
import { CpuRepository } from '../../src/features/component/repository/cpu.repository';
import { Tokens as ComponentToken } from '../../src/features/component/libs/tokens';
import { ObjectTypes } from '@pcp/object-id';

import * as R from 'ramda';

describe('Components.Query', () => {
  test('Get Cases', async () => {
    const { module, request, teardown } = await setupFixture();

    const caseRepository = module.get<CaseRepository>(
      ComponentToken.CaseRepository,
    );

    const cases = R.times(() => ({
      ...generateComponent(ObjectTypes.CASE, ComponentType.CASE),
      componentType: ComponentType.CASE,
    }))(3);

    await Promise.all(
      cases.map((component) => caseRepository.create(component)),
    );

    const getCaseResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          case(id: $id) {
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

    expect(getCaseResponse.status).toEqual(200);
    expect(getCaseResponse.body).not.toHaveProperty('errors');
    expect(getCaseResponse.body.data.case).toBeTruthy();
    expect(getCaseResponse.body.data.case).toMatchObject({
      id: cases[0].id.toString(),
      name: cases[0].name,
      partNumber: cases[0].partNumber,
      componentType: ComponentType.CASE,
      price: cases[0].price,
    });

    expect(getCasesResponse.status).toEqual(200);
    expect(getCasesResponse.body.data.cases).toBeTruthy();
    expect(getCasesResponse.body).not.toHaveProperty('errors');
    expect(getCasesResponse.body.data.cases).toHaveLength(3);

    await teardown();
  });

  test('Get CPUs', async () => {
    const { module, request, teardown } = await setupFixture();

    const cpuRepository = module.get<CpuRepository>(
      ComponentToken.CpuRepository,
    );

    const cpus = R.times(() => ({
      ...generateComponent(ObjectTypes.CPU, ComponentType.CPU),
      componentType: ComponentType.CPU,
    }))(3);

    await Promise.all(cpus.map((component) => cpuRepository.create(component)));

    const getCpuResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          CPU(id: $id) {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
      variables: {
        id: cpus[0].id.toString(),
      },
    });

    const getCpusResponse = await request.post('/graphql').send({
      query: `
        query {
          CPUs {
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

    console.log(getCpusResponse.text);
    console.log(getCpuResponse.text);

    expect(getCpuResponse.status).toEqual(200);
    expect(getCpuResponse.body).not.toHaveProperty('errors');
    expect(getCpuResponse.body.data.CPU).toBeTruthy();
    expect(getCpuResponse.body.data.CPU).toMatchObject({
      id: cpus[0].id.toString(),
      name: cpus[0].name,
      partNumber: cpus[0].partNumber,
      componentType: ComponentType.CPU,
      price: cpus[0].price,
    });

    expect(getCpusResponse.status).toEqual(200);
    expect(getCpusResponse.body.data.CPUs).toBeTruthy();
    expect(getCpusResponse.body).not.toHaveProperty('errors');
    expect(getCpusResponse.body.data.CPUs).toHaveLength(3);

    await teardown();
  });
});

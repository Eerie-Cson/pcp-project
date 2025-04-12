import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import * as R from 'ramda';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { CpuRepository } from '../../../../src/features/component/repository/cpu.repository';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';
describe('Components.Query', () => {
  test('Get CPUs', async () => {
    const { module, request, teardown } = await setupFixture();

    const cpuRepository = module.get<CpuRepository>(
      ComponentToken.CpuRepository,
    );

    const { componentTimes } = generateComponent<ComponentType.CPU>(
      ObjectTypes.CPU,
    );

    const cpus = componentTimes(3);

    await Promise.all(cpus.map((component) => cpuRepository.create(component)));

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

    expect(getCpusResponse.status).toEqual(200);
    expect(getCpusResponse.body.data.CPUs).toBeTruthy();
    expect(getCpusResponse.body).not.toHaveProperty('errors');
    expect(getCpusResponse.body.data.CPUs).toHaveLength(3);

    await teardown();
  });
});

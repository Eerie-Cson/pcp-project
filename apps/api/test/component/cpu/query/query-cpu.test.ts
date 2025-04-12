import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { CpuRepository } from 'apps/api/src/features/component/repository/cpu.repository';
import { Tokens as ComponentToken } from '../../../../src/features/component/libs/tokens';
import { generateComponent } from '../../../helpers/generate-component';
import { setupFixture } from '../../component-fixture';

describe('Components.Query', () => {
  test('Get CPU', async () => {
    const { module, request, teardown } = await setupFixture();

    const cpuRepository = module.get<CpuRepository>(
      ComponentToken.CpuRepository,
    );

    const { componentTimes } = generateComponent<ComponentType.CPU>(
      ObjectTypes.CPU,
    );

    const cpus = componentTimes(3);

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

    await teardown();

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

    await teardown();
  });
});

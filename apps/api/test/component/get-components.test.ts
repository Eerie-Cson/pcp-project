import { ObjectTypes } from '@pcp/object-id';
import { ComponentType } from '@pcp/types';
import { VideoCardRepository } from 'apps/api/src/features/component/repository/video-card.repository';
import * as R from 'ramda';
import { Tokens as ComponentToken } from '../../src/features/component/libs/tokens';
import { CaseRepository } from '../../src/features/component/repository/case.repository';
import { CpuRepository } from '../../src/features/component/repository/cpu.repository';
import { MemoryRepository } from '../../src/features/component/repository/memory.repository';
import { setupFixture } from '../component-fixture';
import { generateComponent } from '../helpers/generate-component';

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

  test('Get Memories', async () => {
    const { module, request, teardown } = await setupFixture();

    const memoryRepository = module.get<MemoryRepository>(
      ComponentToken.MemoryRepository,
    );

    const memorys = R.times(() => ({
      ...generateComponent(ObjectTypes.MEMORY, ComponentType.MEMORY),
      componentType: ComponentType.MEMORY,
    }))(3);

    await Promise.all(
      memorys.map((component) => memoryRepository.create(component)),
    );

    const getMemoryResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          memory(id: $id) {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
      variables: {
        id: memorys[0].id.toString(),
      },
    });

    const getMemorysResponse = await request.post('/graphql').send({
      query: `
        query {
          memorys {
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

    expect(getMemoryResponse.status).toEqual(200);
    expect(getMemoryResponse.body).not.toHaveProperty('errors');
    expect(getMemoryResponse.body.data.memory).toBeTruthy();
    expect(getMemoryResponse.body.data.memory).toMatchObject({
      id: memorys[0].id.toString(),
      name: memorys[0].name,
      partNumber: memorys[0].partNumber,
      componentType: ComponentType.MEMORY,
      price: memorys[0].price,
    });

    expect(getMemorysResponse.status).toEqual(200);
    expect(getMemorysResponse.body.data.memorys).toBeTruthy();
    expect(getMemorysResponse.body).not.toHaveProperty('errors');
    expect(getMemorysResponse.body.data.memorys).toHaveLength(3);

    await teardown();
  });

  test('Get Video Card', async () => {
    const { module, request, teardown } = await setupFixture();

    const videoCardRepository = module.get<VideoCardRepository>(
      ComponentToken.VideoCardRepository,
    );

    const videoCards = R.times(() => ({
      ...generateComponent(ObjectTypes.VIDEO_CARD, ComponentType.VIDEO_CARD),
      componentType: ComponentType.VIDEO_CARD,
    }))(3);

    await Promise.all(
      videoCards.map((component) => videoCardRepository.create(component)),
    );

    const getVideoCardResponse = await request.post('/graphql').send({
      query: `
        query($id: String!) {
          videoCard(id: $id) {
            id
            name
            partNumber
            componentType
            price
          }
        }
      `,
      variables: {
        id: videoCards[0].id.toString(),
      },
    });

    const getVideoCardsResponse = await request.post('/graphql').send({
      query: `
        query {
          videoCards {
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

    expect(getVideoCardResponse.status).toEqual(200);
    expect(getVideoCardResponse.body).not.toHaveProperty('errors');
    expect(getVideoCardResponse.body.data.videoCard).toBeTruthy();
    expect(getVideoCardResponse.body.data.videoCard).toMatchObject({
      id: videoCards[0].id.toString(),
      name: videoCards[0].name,
      partNumber: videoCards[0].partNumber,
      componentType: ComponentType.VIDEO_CARD,
      price: videoCards[0].price,
    });

    expect(getVideoCardsResponse.status).toEqual(200);
    expect(getVideoCardsResponse.body.data.videoCards).toBeTruthy();
    expect(getVideoCardsResponse.body).not.toHaveProperty('errors');
    expect(getVideoCardsResponse.body.data.videoCards).toHaveLength(3);

    await teardown();
  });
});

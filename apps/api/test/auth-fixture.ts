import { Test } from '@nestjs/testing';
import { getRandomPort } from 'get-port-please';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { ConfigService } from '@nestjs/config';
import supertest from 'supertest';
import { AuthModule } from '../src/apps/auth/auth.module';
import { faker } from '@faker-js/faker/.';

export async function setupFixture(opts?: {
  mocks?: [
    {
      type: unknown;
      value: unknown;
    },
  ];
}) {
  const port = await getRandomPort();

  const mongo = await MongoMemoryReplSet.create({
    replSet: {
      storageEngine: 'wiredTiger',
    },
    instanceOpts: [
      {
        launchTimeout: 30000,
        port: await getRandomPort(),
      },
    ],
  });

  let builder = Test.createTestingModule({
    imports: [AuthModule],
  })
    .overrideProvider(ConfigService)
    .useValue(
      new ConfigService({
        AUTH_URI: mongo.getUri('AUTH_URI'),
        JWT_SECRET_KEY: faker.string.alphanumeric(32),
      }),
    );

  for (const { type, value } of opts?.mocks ?? []) {
    builder = builder.overrideProvider(type).useValue(value);
  }

  const module = await builder.compile();
  const app = module.createNestApplication();
  await app.listen(port);

  return {
    request: supertest(app.getHttpServer()),
    module,
    teardown: async () => {
      await app.close();
      await module.close();
      await mongo.stop();
    },
  };
}

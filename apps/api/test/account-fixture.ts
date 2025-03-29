import { Test } from '@nestjs/testing';
import { getRandomPort } from 'get-port-please';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { AccountsModule } from '../src/apps/accounts/accounts.module';
import { ConfigService } from '@nestjs/config';
import supertest from 'supertest';

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
    imports: [AccountsModule],
  })
    .overrideProvider(ConfigService)
    .useValue(
      new ConfigService({
        ACCOUNTS_URI: mongo.getUri('ACCOUNTS_URI'),
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

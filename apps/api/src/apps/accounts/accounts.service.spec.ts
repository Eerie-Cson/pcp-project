import { Test } from '@nestjs/testing';
import { getRandomPort } from 'get-port-please';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { AccountsModule } from './accounts.module';
import { ConfigService } from '@nestjs/config';

describe('AccountModule', () => {
  test.concurrent('initialize module', async () => {
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

    const module = await Test.createTestingModule({
      imports: [AccountsModule],
    })
      .overrideProvider(ConfigService)
      .useValue(
        new ConfigService({
          ACCOUNTS_URI: mongo.getUri('ACCOUNTS_URI'),
        }),
      )
      .compile();

    await expect(module.init()).resolves.toBeTruthy();
    await expect(module.close()).resolves.toBeUndefined();

    await mongo.stop();
  });
});

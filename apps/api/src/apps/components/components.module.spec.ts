import { Test } from '@nestjs/testing';
import { getRandomPort } from 'get-port-please';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { ComponentsModule } from './components.module';
import { ConfigService } from '@nestjs/config';

describe('ComponentModule', () => {
  test.concurrent('initialize module', async () => {
    const mongo = await MongoMemoryReplSet.create({
      replSet: {
        storageEngine: 'ephemeralForTest',
      },
      instanceOpts: [
        {
          launchTimeout: 30000,
          port: await getRandomPort(),
        },
      ],
    });

    const module = await Test.createTestingModule({
      imports: [ComponentsModule],
    })
      .overrideProvider(ConfigService)
      .useValue(
        new ConfigService({
          COMPONENT_URI: mongo.getUri('COMPONENT_URI'),
        })
      )
      .compile();

    await expect(module.init()).resolves.toBeTruthy();
    await expect(module.close()).resolves.toBeUndefined();

    await mongo.stop();
  });
});

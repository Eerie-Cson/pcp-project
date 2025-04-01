import { setupFixture } from '../auth-fixture';
import { generateAccount } from '../helpers/generate-account';
import { AccountRepository } from '../../src/features/account/repository/account.repository';
import { Tokens as AccountTokens } from '../../src/features/account/libs/tokens';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

describe('Auth.sessions', () => {
  test.concurrent('create session', async () => {
    const { module, request, teardown } = await setupFixture();

    const accountRepository = module.get<AccountRepository>(
      AccountTokens.AccountRepository,
    );

    const account = generateAccount();

    const password = faker.internet.password();

    await accountRepository.create({
      ...account,
      password: await bcrypt.hash(password, 10),
    });

    const response = await request
      .post('/sessions')
      .set('role', account.role)
      .auth(account.name, password, {
        type: 'basic',
      });

    await teardown();

    expect(response.status).toBe(201);
  });
});

import { setupFixture } from '../auth-fixture';
import { generateAccount } from '../helpers/generate-account';
import { AccountRepository } from '../../src/features/account/repository/account.repository';
import { Tokens as AccountTokens } from '../../src/features/account/libs/tokens';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { ObjectId, ObjectTypes } from '@pcp/object-id';
import { randomBytes } from 'crypto';
import { SessionRepository } from '../../src/features/auth/repositories/session.repository';
import { Tokens as SessionTokens } from '../../src/features/auth/libs/tokens';
import { JwtService } from '@nestjs/jwt';
import { TokenType } from '../../src/apps/auth/libs/types';
import { DateTime } from 'luxon';

describe('Auth.sessions', () => {
  test.concurrent('get session', async () => {
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

    const session = {
      id: ObjectId.generate(ObjectTypes.SESSION),
      account: account.id,
      jti: randomBytes(12),
      dateTimeCreated: new Date(),
      dateTimeLastRefreshed: new Date(),
    };

    const sessionRepository = module.get<SessionRepository>(
      SessionTokens.SessionRepository,
    );

    await sessionRepository.create(session);

    const jwtService = module.get<JwtService>(JwtService);

    const token = await jwtService.signAsync(
      {
        sub: account.id.toString(),
        type: TokenType.Access,
        jti: session.jti.toString('hex'),
        role: account.role,
        iap: DateTime.now()
          .minus({
            second: 30,
          })
          .toJSDate()
          .toISOString(),
      },
      {
        expiresIn: '10m',
      },
    );

    const response = await request.get('/session').set({
      Authorization: `Bearer ${token}`,
    });

    await teardown();

    expect(response.status).toBe(200);
  });
});

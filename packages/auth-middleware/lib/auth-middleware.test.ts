import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { faker } from '@faker-js/faker';
import { Test } from '@nestjs/testing';
import { AuthMiddleware } from './auth-middleware';
describe('AuthMiddleware', () => {
  type RequestWithClaims = Request & { claims: any };

  test('valid token', async () => {
    const JwtServiceMock = {
      verifyAsync: jest.fn(async () => ({})),
    };

    const NextFunction = jest.fn();
    const token = new JwtService().sign({}, { secret: faker.git.commitSha() });

    const RequestMock = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthMiddleware,
        {
          provide: JwtService,
          useValue: JwtServiceMock,
        },
      ],
    }).compile();

    const middleware = module.get<AuthMiddleware>(AuthMiddleware);

    await middleware.use(
      RequestMock as RequestWithClaims,
      {} as Response,
      NextFunction,
    );

    expect(JwtServiceMock.verifyAsync).toHaveBeenCalledWith(token);
    expect(NextFunction).toHaveBeenCalled();
  });
});

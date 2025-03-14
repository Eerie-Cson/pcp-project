import { Test } from '@nestjs/testing';
import { AccountRole } from '../types';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';

const createTestingModule = async (mock: any) => {
  return Test.createTestingModule({
    providers: [
      AuthGuard,
      {
        provide: Reflector,
        useValue: mock,
      },
    ],
  }).compile();
};

describe('AuthGuard', () => {
  type ExecutionContextMockType = {
    getHandler: jest.Mock;
    getClass: jest.Mock;
    getArgs: jest.Mock;
    getArgByIndex: jest.Mock;
    switchToHttp: jest.Mock;
    switchToRpc: jest.Mock;
    switchToWs: jest.Mock;
    getType: jest.Mock;
  };

  const roles = [AccountRole.ADMIN, AccountRole.USER];

  const ExecutionContextMock = {
    getHandler: jest.fn(),
  };

  test('Roles not required', async () => {
    const reflectorMock = {
      get: jest.fn(() => undefined),
    };

    const GraphqlExecutionContextMock = {
      create: jest.fn(),
    };

    (GqlExecutionContext.create as jest.Mock) =
      GraphqlExecutionContextMock.create;

    const module = await createTestingModule(reflectorMock);

    const authGuard = module.get<AuthGuard>(AuthGuard);

    const canActivate = await authGuard.canActivate(
      ExecutionContextMock as ExecutionContextMockType,
    );

    expect(canActivate).toBe(true);
    expect(GqlExecutionContext.create).not.toHaveBeenCalled();
  });

  test('Empty claims', async () => {
    const reflectorMock = {
      get: jest.fn(() => roles),
    };

    const GraphqlExecutionContextMock = {
      create: jest.fn(() => ({
        getContext: jest.fn().mockReturnValue({
          req: {},
        }),
      })),
    };

    (GqlExecutionContext.create as jest.Mock) =
      GraphqlExecutionContextMock.create;

    const module = await createTestingModule(reflectorMock);

    const authGuard = module.get<AuthGuard>(AuthGuard);

    expect(() =>
      authGuard.canActivate(ExecutionContextMock as ExecutionContextMockType),
    ).toThrow(new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED));
  });

  test('Unauthorized role', async () => {
    const reflectorMock = {
      get: jest.fn(() => roles),
    };

    const GraphqlExecutionContextMock = {
      create: jest.fn(() => ({
        getContext: jest.fn().mockReturnValue({
          req: {
            claims: {
              role: 'MEMBER',
            },
          },
        }),
      })),
    };

    (GqlExecutionContext.create as jest.Mock) =
      GraphqlExecutionContextMock.create;

    const module = await createTestingModule(reflectorMock);

    const authGuard = module.get<AuthGuard>(AuthGuard);

    expect(() =>
      authGuard.canActivate(ExecutionContextMock as ExecutionContextMockType),
    ).toThrow(new HttpException('Forbidden', HttpStatus.FORBIDDEN));
  });

  test('Authorized role', async () => {
    const reflectorMock = {
      get: jest.fn().mockReturnValue(roles),
    };

    const GraphqlExecutionContextMock = {
      create: jest.fn(() => ({
        getContext: jest.fn().mockReturnValue({
          req: {
            claims: {
              role: AccountRole.ADMIN,
            },
          },
        }),
      })),
    };

    const module = await createTestingModule(reflectorMock);

    (GqlExecutionContext.create as jest.Mock) =
      GraphqlExecutionContextMock.create;

    const authGuard = module.get<AuthGuard>(AuthGuard);

    const canActivate = authGuard.canActivate(
      ExecutionContextMock as ExecutionContextMockType,
    );

    expect(canActivate).toBe(true);
    expect(GqlExecutionContext.create).toHaveBeenCalled();
  });
});

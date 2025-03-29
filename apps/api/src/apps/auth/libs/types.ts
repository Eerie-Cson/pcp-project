import { AccountType, User as Account, Session } from '@pcp/types';
import { Request } from 'express';

export enum TokenType {
  Access = 'access',
  Refresh = 'refresh',
}

export type Claims = {
  sub: string;
  type: TokenType;
  session: string;
  role: AccountType;
  iap: string;
  jti?: string;
};

export type AuthRequest = Request & {
  user: Account;
  claims: Claims;
  session: Session;
};

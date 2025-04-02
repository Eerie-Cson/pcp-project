import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { AccountType } from '@pcp/types';
import { AccountService } from '../../../features/account/account.service';

const BASIC_REGEX = /^(?:basic) ([A-Za-z0-9._~+/-]+=*)$/i;

@Injectable()
export class BasicGuard implements CanActivate {
  constructor(private readonly accountService: AccountService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const match = (request.headers.authorization || '').match(BASIC_REGEX);

    if (!match) throw new ForbiddenException();

    const [scheme, hash] = [
      match[0].trim().split(' ')[0].toLowerCase(),
      match[1],
    ];

    request.scheme = scheme;

    const [username, password] = Buffer.from(hash, 'base64')
      .toString()
      .split(':');

    const account = await this.accountService.findAccount({ username });

    if (!account || !(await bcrypt.compare(password, account.password))) {
      throw new ForbiddenException();
    }

    request.user = account;

    return true;
  }
}

import { ObjectId } from '@pcp/object-id';
import { Session } from '@pcp/types';
import { Inject, Injectable } from '@nestjs/common';
import { SessionRepository } from './repositories/session.repository';
import { Tokens } from './libs/tokens';
import { FilterQuery } from 'mongoose';

@Injectable()
export class SessionService {
  constructor(
    @Inject(Tokens.SessionRepository)
    private sessionRepository: SessionRepository,
  ) {}
  async createSession(session: Session) {
    await this.sessionRepository.create(session);
  }

  async deleteSession(filter: ObjectId | FilterQuery<Session>) {
    return this.sessionRepository.delete(filter);
  }

  async findSession(filter: ObjectId | FilterQuery<Session>) {
    return this.sessionRepository.find(filter);
  }

  async listSession(filter: ObjectId | FilterQuery<Session>) {
    return this.sessionRepository.list(filter);
  }

  async updateSession(
    filter: ObjectId | FilterQuery<Session>,
    data: Partial<Omit<Session, 'id'>>,
  ) {
    return this.sessionRepository.update(filter, data);
  }
}

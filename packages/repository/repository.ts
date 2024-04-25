import { FilterQuery } from 'mongoose';

export interface Repository<T> {
  create(data: T): Promise<void>;
  update(filter: FilterQuery<T>, data: Partial<Omit<T, 'id'>>): Promise<void>;
  delete(filter: FilterQuery<T>): Promise<void>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  find(filter?: FilterQuery<T>): Promise<T[]>;
}
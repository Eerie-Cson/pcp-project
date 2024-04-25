import { Connection, FilterQuery, Model, Schema } from 'mongoose';
import { Repository } from './repository';

export class MongooseRepository<TEntity> implements Repository<TEntity> {
  private readonly _model: Model<TEntity>;

  constructor(connection: Connection, name: string, schema: Schema) {
    this._model = connection.model<TEntity>(name, schema);
  }

  public get model() {
    return this._model;
  }

  public async create(data: TEntity) {
    await this.model.create(data);
  }

  public async update(
    filter: FilterQuery<TEntity>,
    data: Partial<Omit<TEntity, 'id'>>,
  ) {
    await this.model.updateOne(filter, {
      ...data,
      dateTimeLastUpdated: new Date(),
    });
  }

  public async delete(filter: FilterQuery<TEntity>) {
    await this.model.deleteOne(filter);
  }

  public async findOne(filter: FilterQuery<TEntity>) {
    return this.model.findOne(filter);
  }

  public async find(filter?: FilterQuery<TEntity>) {
    return this.model.find(filter || {});
  }
}
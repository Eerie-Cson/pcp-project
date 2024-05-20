import { Connection, FilterQuery, Model, Schema } from 'mongoose';
import { Repository } from './repository';
import { ObjectId } from '@pcp/object-id';

export class MongooseRepository<
  TEntity extends { id: ObjectId } = { id: ObjectId }
> implements Repository<TEntity>
{
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
    data: Partial<Omit<TEntity, 'id'>>
  ) {
    if (filter instanceof ObjectId) {
      await this.model.updateOne(filter, {
        ...data,
        dateTimeLastUpdated: new Date(),
      });

      return;
    }

    await this.model.updateMany(filter, {
      ...data,
      dateTimeLastUpdated: new Date(),
    });
  }

  public async delete(filter: FilterQuery<TEntity>) {
    if (filter instanceof ObjectId) {
      await this.model.deleteOne(filter);

      return;
    }

    await this.model.deleteMany(filter);
  }

  public async find(filter?: FilterQuery<TEntity>) {
    if (filter instanceof ObjectId) {
      return this.model.findOne(filter);
    }

    return this.model.find(filter || {});
  }
}

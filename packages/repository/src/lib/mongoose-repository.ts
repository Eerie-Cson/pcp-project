import { Connection, FilterQuery, Model, Schema } from 'mongoose';
import { Repository } from './repository';
import { ObjectId } from '@pcp/object-id';
import * as R from 'ramda';

function serializeFilterField(value: any) {
  if (value instanceof ObjectId) {
    return value.toString();
  }

  return value;
}

function serializeFilter(filter: any) {
  if (filter instanceof ObjectId) {
    return filter.toString();
  }

  return R.map(serializeFilterField, filter);
}

export class MongooseRepository<
  TEntity extends { id: ObjectId } = { id: ObjectId },
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
    await this.model.create(serializeFilter(data));
  }

  public async update(
    filter: FilterQuery<TEntity>,
    data: Partial<Omit<TEntity, 'id'>>,
  ) {
    if (filter instanceof ObjectId) {
      await this.model.updateOne(
        { id: filter },
        {
          ...data,
          dateTimeLastUpdated: new Date(),
        },
      );

      return;
    }

    await this.model.updateMany(
      serializeFilter(filter) as FilterQuery<TEntity>,
      {
        $set: {
          ...data,
          dateTimeLastUpdated: new Date(),
        },
      },
    );
  }

  public async delete(filter: FilterQuery<TEntity>) {
    if (filter instanceof ObjectId) {
      await this.model.deleteOne({
        id: filter.toString(),
      });

      return;
    }

    await this.model.deleteMany(
      serializeFilter(filter) as FilterQuery<TEntity>,
    );
  }

  public async find(filter?: FilterQuery<TEntity>) {
    if (filter instanceof ObjectId) {
      return this.model.findOne({ id: filter.toString() });
    }

    return this.model.findOne(
      (serializeFilter(filter) as FilterQuery<TEntity>) || {},
    );
  }

  public async list(filter?: FilterQuery<TEntity>) {
    if (filter instanceof ObjectId) {
      return this.model.find({ id: filter.toString() });
    }

    return this.model.find(
      (serializeFilter(filter) as FilterQuery<TEntity>) || {},
    );
  }
}

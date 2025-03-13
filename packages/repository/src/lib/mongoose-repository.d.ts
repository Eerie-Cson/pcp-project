import { Connection, FilterQuery, Model, Schema } from 'mongoose';
import { Repository } from './repository';
import { ObjectId } from '@pcp/object-id';
export declare class MongooseRepository<TEntity extends {
    id: ObjectId;
} = {
    id: ObjectId;
}> implements Repository<TEntity> {
    private readonly _model;
    constructor(connection: Connection, name: string, schema: Schema);
    get model(): Model<TEntity, {}, {}, {}, import("mongoose").IfAny<TEntity, any, import("mongoose").Document<unknown, {}, TEntity> & import("mongoose").Default__v<import("mongoose").Require_id<TEntity>>>, any>;
    create(data: TEntity): Promise<void>;
    update(filter: FilterQuery<TEntity>, data: Partial<Omit<TEntity, 'id'>>): Promise<void>;
    delete(filter: FilterQuery<TEntity>): Promise<void>;
    find(filter?: FilterQuery<TEntity>): Promise<import("mongoose").IfAny<TEntity, any, import("mongoose").Document<unknown, {}, TEntity> & import("mongoose").Default__v<import("mongoose").Require_id<TEntity>>> | import("mongoose").IfAny<TEntity, any, import("mongoose").Document<unknown, {}, TEntity> & import("mongoose").Default__v<import("mongoose").Require_id<TEntity>>>[]>;
}

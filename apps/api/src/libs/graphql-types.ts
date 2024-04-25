/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

import { ObjectId as _ObjectId } from '@highoutputventures/opexa-object-id';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ObjectType {
  SYSTEM_JOB = 'SYSTEM_JOB',
}

export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
}

export enum Provider {
  EVOLUTION = 'EVOLUTION',
  DARWIN = 'DARWIN',
  RTG = 'RTG',
}

export enum SystemJobStatus {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum SystemJobType {
  LOAD_GAMES = 'LOAD_GAMES',
}

export interface ObjectIdFilterInput {
  equal?: Nullable<ObjectId>;
  notEqual?: Nullable<ObjectId>;
  in?: Nullable<ObjectId[]>;
  notIn?: Nullable<ObjectId[]>;
}

export interface StringFilterInput {
  equal?: Nullable<string>;
  notEqual?: Nullable<string>;
  in?: Nullable<string[]>;
  notIn?: Nullable<string[]>;
  contains?: Nullable<string>;
  startsWith?: Nullable<string>;
}

export interface BooleanFilterInput {
  equal?: Nullable<boolean>;
  notEqual?: Nullable<boolean>;
}

export interface EmailAddressFilterInput {
  equal?: Nullable<EmailAddress>;
  notEqual?: Nullable<EmailAddress>;
  in?: Nullable<EmailAddress[]>;
  notIn?: Nullable<EmailAddress[]>;
  contains?: Nullable<string>;
  startsWith?: Nullable<string>;
}

export interface DateFilterInput {
  equal?: Nullable<Date>;
  notEqual?: Nullable<Date>;
  in?: Nullable<Date[]>;
  notIn?: Nullable<Date[]>;
  lesserThan?: Nullable<Date>;
  lesserThanOrEqual?: Nullable<Date>;
  greaterThan?: Nullable<Date>;
  greaterThanOrEqual?: Nullable<Date>;
}

export interface DateTimeFilterInput {
  equal?: Nullable<DateTime>;
  notEqual?: Nullable<DateTime>;
  in?: Nullable<DateTime[]>;
  notIn?: Nullable<DateTime[]>;
  lesserThan?: Nullable<DateTime>;
  lesserThanOrEqual?: Nullable<DateTime>;
  greaterThan?: Nullable<DateTime>;
  greaterThanOrEqual?: Nullable<DateTime>;
}

export interface StartLoadGamesSystemJobDataInput {
  provider: Provider;
}

export interface StartLoadGamesSystemJobInput {
  id: ObjectId;
  type: SystemJobType;
  data: StartLoadGamesSystemJobDataInput;
}

export interface Node {
  id: ObjectId;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor?: Nullable<Cursor>;
}

export interface Edge {
  cursor: Cursor;
  node: Node;
}

export interface Connection {
  totalCount: number;
  edges: Edge[];
  pageInfo: PageInfo;
}

export interface IQuery {
  node(id?: Nullable<ObjectId>): Nullable<Node> | Promise<Nullable<Node>>;
}

export interface SystemJob extends Node {
  id: ObjectId;
  type: SystemJobType;
  status: SystemJobStatus;
  dateTimeCreated: DateTime;
  dateTimeLastUpdated: DateTime;
}

export interface IMutation {
  startLoadGamesSystemJob(
    input: StartLoadGamesSystemJobInput,
  ): boolean | Promise<boolean>;
}

export type ObjectId = _ObjectId;
export type DateTime = Date;
export type JSON = Record<string, any>;
export type EmailAddress = string;
export type Cursor = unknown;
export type URL = string;
export type Decimal = unknown;
export type Timezone = unknown;
type Nullable<T> = T | null;

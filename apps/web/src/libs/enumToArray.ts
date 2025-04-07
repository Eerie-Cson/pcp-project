import * as R from 'ramda';
export default <EnumType>(enumObject: Record<any, any>): EnumType[] =>
  R.values(enumObject) as EnumType[];

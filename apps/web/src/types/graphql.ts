import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Cursor: { input: any; output: any };
  Date: { input: any; output: any };
  DateTime: { input: any; output: any };
  Decimal: { input: any; output: any };
  EmailAddress: { input: any; output: any };
  JSON: { input: any; output: any };
  ObjectId: { input: any; output: any };
  TimeZone: { input: any; output: any };
  URL: { input: any; output: any };
  Upload: { input: any; output: any };
};

export type Account = {
  __typename?: 'Account';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: AccountType;
  username: Scalars['String']['output'];
};

export enum AccountType {
  MEMBER = 'MEMBER',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export type BooleanFilterInput = {
  equal?: InputMaybe<Scalars['Boolean']['input']>;
  notEqual?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Connection = {
  __typename?: 'Connection';
  edges: Array<Edge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CreateAccountInput = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: AccountType;
  username: Scalars['String']['input'];
};

export type DateFilterInput = {
  equal?: InputMaybe<Scalars['Date']['input']>;
  greaterThan?: InputMaybe<Scalars['Date']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<Scalars['Date']['input']>>;
  lesserThan?: InputMaybe<Scalars['Date']['input']>;
  lesserThanOrEqual?: InputMaybe<Scalars['Date']['input']>;
  notEqual?: InputMaybe<Scalars['Date']['input']>;
  notIn?: InputMaybe<Array<Scalars['Date']['input']>>;
};

export type DateTimeFilterInput = {
  equal?: InputMaybe<Scalars['DateTime']['input']>;
  greaterThan?: InputMaybe<Scalars['DateTime']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lesserThan?: InputMaybe<Scalars['DateTime']['input']>;
  lesserThanOrEqual?: InputMaybe<Scalars['DateTime']['input']>;
  notEqual?: InputMaybe<Scalars['DateTime']['input']>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type DecimalFilterInput = {
  equal?: InputMaybe<Scalars['Decimal']['input']>;
  greaterThan?: InputMaybe<Scalars['Decimal']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<Scalars['Decimal']['input']>>;
  lesserThan?: InputMaybe<Scalars['Decimal']['input']>;
  lesserThanOrEqual?: InputMaybe<Scalars['Decimal']['input']>;
  notEqual?: InputMaybe<Scalars['Decimal']['input']>;
  notIn?: InputMaybe<Array<Scalars['Decimal']['input']>>;
};

export type Edge = {
  __typename?: 'Edge';
  cursor: Scalars['Cursor']['output'];
  node: Node;
};

export type EmailAddressFilterInput = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equal?: InputMaybe<Scalars['EmailAddress']['input']>;
  in?: InputMaybe<Array<Scalars['EmailAddress']['input']>>;
  notEqual?: InputMaybe<Scalars['EmailAddress']['input']>;
  notIn?: InputMaybe<Array<Scalars['EmailAddress']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type IntFilterInput = {
  equal?: InputMaybe<Scalars['Int']['input']>;
  greaterThan?: InputMaybe<Scalars['Int']['input']>;
  greaterThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lesserThan?: InputMaybe<Scalars['Int']['input']>;
  lesserThanOrEqual?: InputMaybe<Scalars['Int']['input']>;
  notEqual?: InputMaybe<Scalars['Int']['input']>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount?: Maybe<Scalars['Boolean']['output']>;
  deleteAccount?: Maybe<Scalars['Boolean']['output']>;
  updateAccount?: Maybe<Scalars['Boolean']['output']>;
};

export type MutationCreateAccountArgs = {
  createAccountInput: CreateAccountInput;
};

export type MutationDeleteAccountArgs = {
  id: Scalars['String']['input'];
};

export type MutationUpdateAccountArgs = {
  id: Scalars['String']['input'];
  updateAccountInput: UpdateAccountInput;
};

export type Node = {
  id: Scalars['ObjectId']['output'];
};

export type ObjectIdFilterInput = {
  equal?: InputMaybe<Scalars['ObjectId']['input']>;
  in?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
  notEqual?: InputMaybe<Scalars['ObjectId']['input']>;
  notIn?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: Array<Maybe<Account>>;
  node?: Maybe<Node>;
};

export type QueryAccountArgs = {
  id: Scalars['String']['input'];
};

export type QueryNodeArgs = {
  id?: InputMaybe<Scalars['ObjectId']['input']>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type StringFilterInput = {
  contains?: InputMaybe<Scalars['String']['input']>;
  equal?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notEqual?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAccountInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAccountMutationVariables = Exact<{
  id: Scalars['String']['input'];
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  role: AccountType;
}>;

export type CreateAccountMutation = {
  __typename?: 'Mutation';
  createAccount?: boolean | null;
};

export type AccountsQueryVariables = Exact<{ [key: string]: never }>;

export type AccountsQuery = {
  __typename?: 'Query';
  accounts: Array<{
    __typename?: 'Account';
    id: string;
    name: string;
    username: string;
    email: string;
    role: AccountType;
  } | null>;
};

export const CreateAccountDocument = gql`
  mutation CreateAccount(
    $id: String!
    $username: String!
    $password: String!
    $name: String!
    $email: String!
    $role: AccountType!
  ) {
    createAccount(
      createAccountInput: {
        id: $id
        username: $username
        password: $password
        name: $name
        email: $email
        role: $role
      }
    )
  }
`;
export type CreateAccountMutationFn = Apollo.MutationFunction<
  CreateAccountMutation,
  CreateAccountMutationVariables
>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useCreateAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CreateAccountDocument, options);
}
export type CreateAccountMutationHookResult = ReturnType<
  typeof useCreateAccountMutation
>;
export type CreateAccountMutationResult =
  Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<
  CreateAccountMutation,
  CreateAccountMutationVariables
>;
export const AccountsDocument = gql`
  query Accounts {
    accounts {
      id
      name
      username
      email
      role
    }
  }
`;

/**
 * __useAccountsQuery__
 *
 * To run a query within a React component, call `useAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountsQuery(
  baseOptions?: Apollo.QueryHookOptions<AccountsQuery, AccountsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AccountsQuery, AccountsQueryVariables>(
    AccountsDocument,
    options,
  );
}
export function useAccountsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AccountsQuery,
    AccountsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AccountsQuery, AccountsQueryVariables>(
    AccountsDocument,
    options,
  );
}
export function useAccountsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<AccountsQuery, AccountsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AccountsQuery, AccountsQueryVariables>(
    AccountsDocument,
    options,
  );
}
export type AccountsQueryHookResult = ReturnType<typeof useAccountsQuery>;
export type AccountsLazyQueryHookResult = ReturnType<
  typeof useAccountsLazyQuery
>;
export type AccountsSuspenseQueryHookResult = ReturnType<
  typeof useAccountsSuspenseQuery
>;
export type AccountsQueryResult = Apollo.QueryResult<
  AccountsQuery,
  AccountsQueryVariables
>;

import { ApolloError } from '@apollo/client';

export type UseComponentQueryReturnType<C> = {
  data: C[];
  loading: boolean;
  error: ApolloError | undefined;
};

import { useEffect } from 'react';
import { useQuery, ApolloError, DocumentNode } from '@apollo/client';
import { ComponentType } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import * as R from 'ramda';

export interface UseComponentQueryReturn<R> {
  data: R[];
  loading: boolean;
  error: ApolloError | undefined;
}

/**
 * A generic hook to query components and transform each result.
 *
 * @param query - The GraphQL query document.
 * @param transform - A function that transforms each fetched item.
 * @param service - (Optional) The service context; defaults to 'components'.
 * @returns An object containing the transformed data, loading state, and error.
 */
export function useComponentQuery<DataType, CType extends ComponentType>(
  query: DocumentNode,
  endpoint: string,
  transform: (item: DataType) => PcComponent<CType>,
): UseComponentQueryReturn<PcComponent<CType>> {
  const service: string = 'components';

  const { data, loading, error } = useQuery<{ [endpoint]: DataType[] }>(query, {
    context: { service },
    errorPolicy: 'all',
  });

  const componentData = data ? data[endpoint] : [];

  useEffect(() => {
    if (error) {
      alert(`Server connection issue: ${error.message}`);
    }
  }, [error]);

  return {
    data: componentData.map(transform),
    loading,
    error,
  };
}

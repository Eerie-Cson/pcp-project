import { useEffect } from 'react';
import { useQuery, DocumentNode } from '@apollo/client';
import { ComponentType } from '../libs/graphql-types/component';
import { PcComponent } from '../libs/types/components';
import { UseComponentQueryReturnType } from '../libs/types/queryHooks';

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
  gqlQueryEndpoint: string,
  transform: (item: DataType) => PcComponent<CType>,
): UseComponentQueryReturnType<PcComponent<CType>> {
  const service: string = 'components';

  const { data, loading, error } = useQuery<{ [gqlQueryEndpoint]: DataType[] }>(
    query,
    {
      context: { service },
      errorPolicy: 'all',
    },
  );

  const componentData = data ? data[gqlQueryEndpoint] : [];

  useEffect(() => {
    if (error) {
      alert(`Server connection issue @${gqlQueryEndpoint}: ${error.message}`);
    }
  }, [error]);

  return {
    data: componentData.map(transform),
    loading,
    error,
  };
}

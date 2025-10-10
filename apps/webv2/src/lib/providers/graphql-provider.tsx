'use client';

import type React from 'react';

import { graphqlClient } from '@/src/lib/graphql/client';
import { Provider } from 'urql';

export function GraphQLProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={graphqlClient}>{children}</Provider>;
}

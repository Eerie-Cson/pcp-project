"use client"

import type React from "react"

import { Provider } from "urql"
import { graphqlClient } from "@/lib/graphql/client"

export function GraphQLProvider({ children }: { children: React.ReactNode }) {
  return <Provider value={graphqlClient}>{children}</Provider>
}

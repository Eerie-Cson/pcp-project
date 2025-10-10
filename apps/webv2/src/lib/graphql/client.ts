"use client"

import { Client, cacheExchange, fetchExchange } from "urql"

// GraphQL endpoint - update this to your actual API endpoint
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:4000/graphql"

export const graphqlClient = new Client({
  url: GRAPHQL_ENDPOINT,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: () => {
    // Add authentication token if available
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null
    return {
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  },
})

'use client';

import type React from 'react';

import { ProtectedRoute } from '@/src/components/auth/protected-route';

export default function BuildsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute requiredRole="user">{children}</ProtectedRoute>;
}

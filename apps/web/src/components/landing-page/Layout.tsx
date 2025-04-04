import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 p-4 md:p-8 mx-auto w-full max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  );
}

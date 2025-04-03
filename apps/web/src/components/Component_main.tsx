import { useState } from 'react';
import { PcComponent, ComponentType } from '../libs/components';
import Header from './Header';
import Hero from './Hero';
import buildUtils from '../hooks/addToBuild';
import { BuildComponent, BuildPanel } from './BuildComponent';
import ComponentModal from './ComponentModal';
import BrandSection from './BrandSection';
import { ComponentProvider } from './ComponentContext';

export default function PcBuilder() {
  const [selectedComponent, setSelectedComponent] =
    useState<PcComponent | null>(null);
  // Sample data with rich content

  // Filter components based on selections

  // Add component to build

  // Remove component from build

  // Check for compatibility issues

  // Calculate total price

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <ComponentProvider>
        <Header />
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 mx-auto w-full max-w-7xl">
          {/* Hero Section */}
          <Hero />
          {/* Builder Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            {/* Component Selection */}
            <BuildComponent />
            {/* Build Panel */}
            <BuildPanel />
          </div>

          {/* Featured Brands */}
          <BrandSection />
        </main>

        {/* Component Modal */}
        <ComponentModal />
      </ComponentProvider>

      {/* Footer */}
    </div>
  );
}

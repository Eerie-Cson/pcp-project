import React from 'react';
import { Layout } from '../components/landing-page/Layout';
import { Hero } from '../components/landing-page/Hero';
import { ComponentFilters } from '../components/landing-page/ComponentFilter';
import { ComponentGrid } from '../components/landing-page/ComponentGrid';
import { BuildPanel } from '../components/landing-page/BuildPanel';
import { ComponentModal } from '../components/landing-page/ComponentModal';
import { FeaturedBrands } from '../components/landing-page/FeaturedBrands';
import { usePcBuilder } from '../hooks/usePcBuilder';

export default function PcBuilder() {
  const {
    build,
    selectedType,
    setSelectedType,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    selectedComponent,
    setSelectedComponent,
    compatibilityIssues,
    filteredComponents,
    addToBuild,
    removeFromBuild,
    clearBuild,
    totalPrice,
  } = usePcBuilder();

  return (
    <Layout>
      <Hero />

      {/* Builder Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        {/* Component Selection */}
        <div className="lg:col-span-3 bg-white rounded-lg p-6 shadow">
          <ComponentFilters
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priceRange={priceRange as [number, number]}
            setPriceRange={setPriceRange as (range: [number, number]) => void}
          />

          <ComponentGrid
            components={filteredComponents}
            onAddToBuild={addToBuild}
            onSelectComponent={setSelectedComponent}
          />
        </div>

        {/* Build Panel */}
        <BuildPanel
          build={build}
          totalPrice={totalPrice}
          compatibilityIssues={compatibilityIssues}
          onRemoveComponent={removeFromBuild}
          onClearBuild={clearBuild}
        />
      </div>

      <FeaturedBrands />

      {/* Component Modal */}
      {selectedComponent && (
        <ComponentModal
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
          onAddToBuild={addToBuild}
        />
      )}
    </Layout>
  );
}

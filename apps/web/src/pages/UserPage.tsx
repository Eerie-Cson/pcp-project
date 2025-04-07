import { Layout } from '../components/landing-page/Layout';
import { Hero } from '../components/landing-page/Hero';
import { ComponentFilters } from '../components/landing-page/ComponentFilter';
import { ComponentGrid } from '../components/landing-page/ComponentGrid';
import { BuildPanel } from '../components/landing-page/BuildPanel';
import { ComponentModal } from '../components/landing-page/ComponentModal';
import { FeaturedBrands } from '../components/landing-page/FeaturedBrands';
import { useUserPcBuilder } from '../hooks/useUserPcBuilder';
import ComponentSorting from '../components/common/ComponentSorting';
import Pagination from '../components/common/Pagination';

export default function UserPcBuilder() {
  const {
    build,
    totalPrice,
    searchQuery,
    priceRange,
    selectedComponent,
    compatibilityIssues,
    setSearchQuery,
    setPriceRange,
    setSelectedComponent,
    addToBuild,
    removeFromBuild,
    clearBuild,
    setCurrentPage,

    //query
    componentTypes,
    sortedComponents,
    paginatedComponents,
    currentPage,
    sortBy,
    sortOrder,
    activeFilter,
    handleSort,
    resetFilters,
    setActiveFilter,
  } = useUserPcBuilder();

  return (
    <Layout>
      <Hero />

      {/* Builder Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        {/* Component Selection */}
        <div className="lg:col-span-3 bg-white rounded-lg p-6 shadow">
          <ComponentFilters
            componentTypes={componentTypes}
            selectedType={activeFilter}
            setSelectedType={setActiveFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            priceRange={priceRange as [number, number]}
            setPriceRange={setPriceRange as (range: [number, number]) => void}
          />

          <ComponentSorting
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSort={handleSort}
          />

          <ComponentGrid
            components={paginatedComponents}
            onAddToBuild={addToBuild}
            onSelectComponent={setSelectedComponent}
            onResetFilters={resetFilters}
          />

          {sortedComponents.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalItems={sortedComponents.length}
              visibleItems={paginatedComponents.length}
              onPageChange={setCurrentPage}
            />
          )}
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

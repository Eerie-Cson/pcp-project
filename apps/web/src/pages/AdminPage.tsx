import { COMPONENT_TYPES_MAP } from '../libs/types/components';
import { useAdminPcBuilder } from '../hooks/useAdminPcBuilder';
import CreateComponentButton from '../components/admin/CreateComponentButton';
import ComponentFilters from '../components/admin/ComponentFilters';
import ComponentSorting from '../components/common/ComponentSorting';
import ComponentGrid from '../components/admin/ComponentGrid';
import Pagination from '../components/common/Pagination';
import ComponentListHeader from '../components/admin/ComponentListHeader';

export default function AdminPcBuilder() {
  const {
    activeFilter,
    searchQuery,
    sortBy,
    sortOrder,
    isModalOpen,
    currentPage,
    componentTypes,
    sortedComponents,
    paginatedComponents,
    setActiveFilter,
    setSearchQuery,
    setIsModalOpen,
    setCurrentPage,
    handleSort,
    resetFilters,
    handleAddComponent,
    itemsPerPage,
  } = useAdminPcBuilder();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-6xl mx-auto border-t-2">
      <ComponentListHeader onAddComponent={() => setIsModalOpen(true)} />

      <ComponentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        componentTypes={componentTypes}
        componentTypesMap={COMPONENT_TYPES_MAP}
      />

      <ComponentSorting
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />

      <ComponentGrid
        components={paginatedComponents}
        onResetFilters={resetFilters}
      />

      {sortedComponents.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={sortedComponents.length}
          itemsPerPage={itemsPerPage}
          visibleItems={paginatedComponents.length}
          onPageChange={setCurrentPage}
        />
      )}

      <CreateComponentButton
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddComponent}
      />
    </div>
  );
}

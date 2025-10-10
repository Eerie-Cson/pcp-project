import ComponentDetailsModal from '../components/admin/ComponentDetailsModal';
import ComponentFilters from '../components/admin/ComponentFilters';
import ComponentGrid from '../components/admin/ComponentGrid';
import ComponentListHeader from '../components/admin/ComponentListHeader';
import CreateComponentButton from '../components/admin/CreateComponentButton';
import ComponentSorting from '../components/common/ComponentSorting';
import Pagination from '../components/common/Pagination';
import { useAdminPcBuilder } from '../hooks/useAdminPcBuilder';
import { COMPONENT_TYPES_MAP } from '../libs/types/components';

export default function AdminPcBuilder() {
  const {
    activeFilter,
    searchQuery,
    sortBy,
    sortOrder,
    isModalOpen,
    isDetailsModalOpen,
    isEditModalOpen,
    selectedComponent,
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
    handleEditComponent,
    handleViewDetails,
    handleEdit,
    closeDetailsModal,
    closeEditModal,
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
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
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

      {/* Add Component Modal */}
      <CreateComponentButton
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddComponent}
        mode="add"
      />

      {/* Edit Component Modal */}
      <CreateComponentButton
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={handleEditComponent}
        editComponent={selectedComponent}
        mode="edit"
      />

      {/* View Details Modal */}
      <ComponentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        component={selectedComponent}
      />
    </div>
  );
}

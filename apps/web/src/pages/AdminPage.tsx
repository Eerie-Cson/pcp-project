import CreateComponentButton from '../components/admin-page/CreateComponentButton';
import ViewAllComponent from '../components/admin-page/ViewAllComponent';

export default function AdminPage() {
  return (
    <div>
      <CreateComponentButton
        isOpen={false}
        onClose={() => console.log('Modal closed')}
        onSubmit={(data) => console.log('Submitted data:', data)}
      />
      <div className="mt-7 ">
        <ViewAllComponent />
      </div>
    </div>
  );
}

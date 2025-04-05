import { AuthProvider } from '../context/AuthContext';
import AdminPage from '../pages/AdminPage';
// import PcBuilder from '../components/initialPage/Component_main';
import PcBuilder from '../pages/PcBuilder';
import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PcBuilder />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {/* <div className="p-4">
        <AuthProvider>
          <h1 className="text-2xl font-bold mb-4">GraphQL Users List</h1>
          <Users />
          <CreateUserForm />
        </AuthProvider>
      </div> */}
      {/* <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes> */}
    </div>
  );
}

export default App;

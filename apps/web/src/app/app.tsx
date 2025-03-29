import Users from '../components/Users';
import CreateUserForm from '../components/UserForm';
// import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">GraphQL Users List</h1>
        <Users />
        <CreateUserForm />
      </div>
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

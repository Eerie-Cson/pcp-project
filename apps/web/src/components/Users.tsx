import React from 'react';
import { useQuery } from '@apollo/client';
import { USERS } from '../graphql/query/user.query';

const Users: React.FC = () => {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      <ul>
        {data.users.map((user: { id: string; name: string; email: string }) => (
          <li key={user.id} className="border p-2 rounded mb-2 shadow">
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

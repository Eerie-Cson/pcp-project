import React from 'react';
import { useQuery } from '@apollo/client';
import { USERS } from '../graphql/query/user.query';
import { Account } from '../types/graphql';

const Users: React.FC = () => {
  const { loading, error, data } = useQuery<{ accounts: Account[] }>(USERS);
  console.log(data);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users List</h2>
      <ul>
        {data && data.accounts && data.accounts.length > 0
          ? data.accounts.map(
              (user: { id: string; name: string; email: string }) => (
                <li key={user.id} className="border p-2 rounded mb-2 shadow">
                  <strong>{user.name}</strong> - {user.email}
                </li>
              ),
            )
          : 'No users found'}
      </ul>
    </div>
  );
};

export default Users;

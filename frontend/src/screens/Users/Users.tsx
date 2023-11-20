import React, { useState } from 'react';
import { api } from 'api/index';

const UsersPage = () => {
  const [userData, setUserData] = useState('');
  const [error, setError] = useState('');

  const handleFetchUsers = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // TODO: find a better way to do this for practical implementations of accessing protected routes.
      } else {
        throw new Error('Authentication token not found');
      }

      const response = await api.get('/users');
      setUserData(JSON.stringify(response.data, null, 2));
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Failed to retrieve users. Please make sure you are logged in.');
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleFetchUsers}>Fetch Users</button>
      {error && <div>Error: {error}</div>}
      {userData && <pre>{userData}</pre>} {/* Display the formatted JSON data */}
    </div>
  );
};

export default UsersPage;

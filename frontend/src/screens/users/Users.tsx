import React, { useState } from 'react';
import api from 'api';

interface UserDataResponse {
  data: JSON
}

const UsersPage = () => {
  const [userData, setUserData] = useState('');
  const [error, setError] = useState('');

  const handleFetchUsers = async () => {
    try {
      const response: UserDataResponse = await api.get('/users/');
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
      {userData && <pre>{userData}</pre>}
    </div>
  );
};

export default UsersPage;

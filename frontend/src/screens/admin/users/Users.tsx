import { useState, useEffect } from 'react';
import api from 'api';
import AddUser from 'components/admin/AddUser';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const limit = 10;

  const fetchUsers = async (skip: number, limit: number) => {
    try {
      const response: any = await api.get(`/users/?skip=${skip}&limit=${limit}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(page * limit, limit);
  }, [page]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold text-hunterGreen mb-4">User Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="border-b">
            <tr>
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mt-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 mr-2 bg-hunterGreen text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 bg-hunterGreen text-white rounded"
        >
          Next
        </button>
      </div>

        <button onClick={() => setShowAddUserModal(true)} className="...">Add User</button>
        {showAddUserModal && (
            <AddUser
            onUserAdded={() => {
                fetchUsers(page * limit, limit);
                setShowAddUserModal(false);
            }}
            onClose={() => setShowAddUserModal(false)}
            />
        )}

    </div>
  );
};

export default Users;

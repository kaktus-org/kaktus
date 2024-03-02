import React, { useState } from 'react';
import api from 'api'; // Ensure this import points to your API utility setup

interface AddUserProps {
  onUserAdded: () => void;
  onClose: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdded, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddUser = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await api.post("/users/", { email, password });
      onUserAdded(); // Invoke callback to refresh user list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg mb-4">Add New User</h2>
        <form onSubmit={handleAddUser}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name:</label>
            <input
              type="text"
              id="passsword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="px-4 py-2 bg-hunterGreen text-white rounded hover:bg-green-700 transition-colors mr-2">Create</button>
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import { CREATE_USER } from '../graphql/mutation/create-user.mutation'; // Import your mutation

const UserCreationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    role: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Apollo useMutation hook
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      alert('✅ User created successfully!');
      closeModal();
    },
  });

  // Open modal
  const openModal = () => setIsModalOpen(true);

  // Close modal & reset form
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ username: '', password: '', name: '', email: '', role: '' });
    setErrors({});
  };

  // Validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate a unique ID for the user
    const id = uuidv4();
    const ids = id.split('-');
    ids[0] = 'USER_';
    const generatedId = ids.join('');

    try {
      await createUser({ variables: { id: generatedId, ...formData } });
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Click Here to Create Account
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">
              Create Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {['username', 'password', 'name', 'email'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === 'password' ? 'password' : 'text'}
                    id={field}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className={`w-full p-2 border rounded ${
                      errors[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder={`Enter ${field}`}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              {/* Role Select */}
              <div>
                <label htmlFor="role" className="block mb-2">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${errors.role ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select a role</option>
                  <option value="ADMIN">Admin</option>
                  <option value="MEMBER">User</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 text-white rounded transition duration-300 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm mt-2">{error.message}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCreationModal;

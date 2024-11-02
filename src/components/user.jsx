import React, { useState, useEffect } from "react";
import { FaEye, FaTrash, FaBell, FaUser, FaEdit, FaUserPlus } from "react-icons/fa";

const UserManagementDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Simulating API calls
    setUsers([
      { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    ]);
    setCurrentUser({ id: 1, name: "John Doe", email: "john@example.com", role: "Admin" });
    setNotifications([
      { id: 1, message: "New user registered", time: "5 minutes ago" },
      { id: 2, message: "System update completed", time: "1 hour ago" },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form data
      console.log("Form submitted:", formData);
      setFormData({ name: "", email: "", password: "" });
    }
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEditUser = (userId) => {
    // Implement edit user logic
    console.log("Edit user:", userId);
  };

  const handleAssignRole = (userId) => {
    // Implement assign role logic
    console.log("Assign role to user:", userId);
  };

  const handleDeleteNotification = (notificationId) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId));
  };

  const handleClearAllNotifications = () => {
    if (window.confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="bg-gray-800 text-white p-4 mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Management Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaBell
              className="text-2xl cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            )}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-10">
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                    <div>
                      <p className="text-sm text-gray-700">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                    <div className="flex space-x-2">
                      <FaEye
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          setSelectedNotification(notification);
                          setShowModal(true);
                        }}
                      />
                      <FaTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteNotification(notification.id)}
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="w-full text-center py-2 text-sm text-red-500 hover:bg-gray-100"
                  onClick={handleClearAllNotifications}
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User profile"
              className="w-8 h-8 rounded-full"
            />
            <span>{currentUser?.name}</span>
          </div>
        </div>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">User Registration</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Register
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Existing Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex space-x-2">
                        <FaEye
                          className="text-blue-500 cursor-pointer"
                          onClick={() => console.log("View user:", user.id)}
                        />
                        <FaEdit
                          className="text-green-500 cursor-pointer"
                          onClick={() => handleEditUser(user.id)}
                        />
                        <FaTrash
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleDeleteUser(user.id)}
                        />
                        <FaUserPlus
                          className="text-purple-500 cursor-pointer"
                          onClick={() => handleAssignRole(user.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Current User Profile</h2>
        {currentUser && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User profile"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                <p className="text-gray-600">{currentUser.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Role:</strong> {currentUser.role}
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Notification Details</h3>
            <p>{selectedNotification.message}</p>
            <p className="text-sm text-gray-500 mt-2">{selectedNotification.time}</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementDashboard;

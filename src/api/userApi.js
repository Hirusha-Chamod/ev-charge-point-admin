import axiosInstance from './axiosConfig';

export const userApi = {
  // Get all users
  getAllUsers: () => axiosInstance.get('/users'),
  
  // Get user by ID
  getUserById: (id) => axiosInstance.get(`/users/${id}`),
  
  // Create new user
  createUser: (userData) => axiosInstance.post('/users', userData),
  
  // Update user
  updateUser: (id, userData) => axiosInstance.put(`/users/${id}`, userData),
  
  // Delete user
  deleteUser: (id) => axiosInstance.delete(`/users/${id}`),
  
  // Login
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  
  // Get current user profile
  getProfile: () => axiosInstance.get('/users/profile'),
};
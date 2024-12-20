import axios from 'axios';

const API_URL = 'http://localhost:5000';  // URL for your backend

// Function to handle login
export const loginUser = async (username , password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  return response.data;
};

// Function to handle sending a message to the chatbot
export const sendMessageToChatbot = async (message, token) => {
  const response = await axios.post(`${API_URL}/chat/message`, 
    { message },
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  return response.data;
};

// Function to search for products
export const searchProducts = async (query, token) => {
  const response = await axios.get(`${API_URL}/products/search?query=${query}`, 
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  return response.data;
};

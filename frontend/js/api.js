// API Configuration & Helpers
const API_BASE = 'http://localhost:8080/api';

async function fetchAPI(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
      }
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed (${response.status})`);
    }

    if (response.status === 204) return null;
    return await response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please ensure the backend is running.');
    }
    throw error;
  }
}

// Convenience methods
const api = {
  get: (endpoint) => fetchAPI(endpoint, { method: 'GET' }),
  post: (endpoint, data) => fetchAPI(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => fetchAPI(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (endpoint) => fetchAPI(endpoint, { method: 'DELETE' }),
};

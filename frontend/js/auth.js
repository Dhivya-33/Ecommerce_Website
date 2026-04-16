// Authentication Module
const Auth = {
  getToken() {
    return localStorage.getItem('token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isLoggedIn() {
    return !!this.getToken();
  },

  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'ADMIN';
  },

  setSession(data) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
      username: data.username,
      role: data.role,
    }));
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  },

  async login(email, password) {
    const data = await api.post('/auth/login', { email, password });
    this.setSession(data);
    return data;
  },

  async register(username, email, password) {
    const data = await api.post('/auth/register', { username, email, password });
    this.setSession(data);
    return data;
  },
};

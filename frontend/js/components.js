// Shared UI Components

function renderHeader() {
  const user = Auth.getUser();
  const cartCount = Cart.getCount();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="logo">ShopWave</a>
      <nav class="nav-links">
        <a href="index.html" class="nav-link ${currentPage === 'index.html' ? 'active' : ''}">
          <span class="icon">🏠</span>
          <span>Home</span>
        </a>
        <a href="wishlist.html" class="nav-link ${currentPage === 'wishlist.html' ? 'active' : ''}">
          <span class="icon">❤️</span>
          <span>Wishlist</span>
        </a>
        <a href="cart.html" class="nav-link ${currentPage === 'cart.html' ? 'active' : ''}" style="position:relative">
          <span class="icon">🛒</span>
          <span>Cart</span>
          <span class="cart-badge" style="display:${cartCount > 0 ? 'flex' : 'none'}">${cartCount}</span>
        </a>
        ${user ? `
          ${user.role === 'ADMIN' ? `
            <a href="admin.html" class="nav-link ${currentPage === 'admin.html' ? 'active' : ''}">
              <span class="icon">⚙️</span>
              <span>Admin</span>
            </a>
          ` : ''}
          <a href="orders.html" class="nav-link ${currentPage === 'orders.html' ? 'active' : ''}">
            <span class="icon">📦</span>
            <span>My Orders</span>
          </a>
          <a href="profile.html" class="nav-link ${currentPage === 'profile.html' ? 'active' : ''}">
            <span class="icon">👤</span>
            <span>Profile</span>
          </a>
          <button class="nav-link" onclick="Auth.logout()" id="logout-btn">
            <span class="icon">👋</span>
            <span>${user.username}</span>
          </button>
        ` : `
          <a href="login.html" class="nav-link ${currentPage === 'login.html' ? 'active' : ''}">
            <span class="icon">👤</span>
            <span>Login</span>
          </a>
        `}
      </nav>
    </div>
  `;

  document.body.prepend(header);
}

// Toast notification system
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✓', error: '✗', info: 'ℹ' };
  toast.innerHTML = `
    <span style="font-weight:700;font-size:1.1em">${icons[type] || icons.info}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Format currency
function formatPrice(price) {
  return '$' + price.toFixed(2);
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
});

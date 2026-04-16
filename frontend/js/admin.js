// Admin Module

let editingProductId = null;

async function loadAdminProducts() {
  const tbody = document.getElementById('admin-products-body');
  if (!tbody) return;

  try {
    const products = await api.get('/products');
    tbody.innerHTML = products.map(p => `
      <tr>
        <td>${p.id}</td>
        <td>
          <div style="display:flex;align-items:center;gap:var(--space-3)">
            <img src="${p.imageUrl}" alt="${p.name}" style="width:40px;height:40px;border-radius:var(--radius-sm);object-fit:cover">
            <span>${p.name}</span>
          </div>
        </td>
        <td>${p.category}</td>
        <td>${formatPrice(p.price)}</td>
        <td class="${p.stock <= 5 ? 'stock-low-highlight' : ''}">${p.stock}</td>
        <td>
          <div class="admin-actions">
            <button class="btn btn-ghost btn-sm" onclick='openEditModal(${JSON.stringify(p).replace(/'/g,"&#39;")})'>✏️ Edit</button>
            <button class="btn btn-ghost btn-sm" style="color:var(--color-danger)" onclick="deleteProduct(${p.id})">🗑️ Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function openAddModal() {
  editingProductId = null;
  document.getElementById('modal-title').textContent = 'Add Product';
  document.getElementById('product-form').reset();
  document.querySelector('.modal-overlay').classList.add('active');
}

function openEditModal(product) {
  editingProductId = product.id;
  document.getElementById('modal-title').textContent = 'Edit Product';
  document.getElementById('prod-name').value = product.name;
  document.getElementById('prod-description').value = product.description;
  document.getElementById('prod-price').value = product.price;
  document.getElementById('prod-category').value = product.category;
  document.getElementById('prod-imageUrl').value = product.imageUrl;
  document.getElementById('prod-stock').value = product.stock;
  document.querySelector('.modal-overlay').classList.add('active');
}

function closeModal() {
  document.querySelector('.modal-overlay').classList.remove('active');
  editingProductId = null;
}

async function handleProductForm(event) {
  event.preventDefault();

  const productData = {
    name: document.getElementById('prod-name').value,
    description: document.getElementById('prod-description').value,
    price: parseFloat(document.getElementById('prod-price').value),
    category: document.getElementById('prod-category').value,
    imageUrl: document.getElementById('prod-imageUrl').value,
    stock: parseInt(document.getElementById('prod-stock').value),
  };

  try {
    if (editingProductId) {
      await api.put(`/admin/products/${editingProductId}`, productData);
      showToast('Product updated', 'success');
    } else {
      await api.post('/admin/products', productData);
      showToast('Product added', 'success');
    }
    closeModal();
    loadAdminProducts();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function deleteProduct(id) {
  if (!confirm('Are you sure you want to delete this product?')) return;

  try {
    await api.delete(`/admin/products/${id}`);
    showToast('Product deleted', 'success');
    loadAdminProducts();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function loadAnalytics() {
  try {
    const stats = await api.get('/admin/analytics');
    document.getElementById('stat-revenue').textContent = formatPrice(stats.totalRevenue);
    document.getElementById('stat-orders').textContent = stats.totalOrders;
    document.getElementById('stat-avg-order').textContent = formatPrice(stats.avgOrderValue);
    document.getElementById('stat-low-stock').textContent = stats.lowStockCount;
  } catch (err) {
    console.error('Failed to load analytics', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.isAdmin()) {
    showToast('Admin access required', 'error');
    setTimeout(() => window.location.href = 'index.html', 1500);
    return;
  }

  loadAdminProducts();
  loadAnalytics();

  const form = document.getElementById('product-form');
  if (form) form.addEventListener('submit', handleProductForm);

  // Close modal on overlay click
  document.querySelector('.modal-overlay')?.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) closeModal();
  });
});

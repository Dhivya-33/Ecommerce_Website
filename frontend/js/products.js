// Products Module

function renderProductCard(product) {
  const stockClass = product.stock <= 5 ? 'low' : '';
  const stockText = product.stock <= 0 ? 'Out of stock'
    : product.stock <= 5 ? `Only ${product.stock} left`
    : `${product.stock} in stock`;

  return `
    <div class="card product-card" id="product-${product.id}">
      <a href="product.html?id=${product.id}" class="card-image">
        <img src="${product.imageUrl}" alt="${product.name}" loading="lazy">
        <span class="category-tag">${product.category}</span>
        <button class="wishlist-btn" onclick="event.preventDefault(); toggleWishlist(${product.id}, this)">🤍</button>
      </a>
      <div class="card-body">
        <a href="product.html?id=${product.id}" style="color:inherit">
          <h3 class="card-title">${product.name}</h3>
        </a>
        <p class="card-description">${product.description}</p>
        <div class="card-footer">
          <span class="price">${formatPrice(product.price)}</span>
          <span class="stock-info ${stockClass}">${stockText}</span>
        </div>
        <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})" ${product.stock <= 0 ? 'disabled style="opacity:0.5"' : ''}>
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

let allProducts = [];

async function loadProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = '<div class="spinner"></div>';

  try {
    allProducts = await api.get('/products');
    await populateCategories();
    renderFilteredProducts();
  } catch (err) {
    grid.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon">⚠️</div>
      <h3 class="empty-state-title">Unable to load products</h3>
      <p class="empty-state-text">${err.message}</p>
    </div>`;
  }
}

async function populateCategories() {
  const filter = document.getElementById('category-filter');
  if (!filter) return;

  try {
    const categories = await api.get('/products/categories');
    const currentValue = filter.value;
    
    filter.innerHTML = '<option value="">All Categories</option>' + 
      categories.map(c => `<option value="${c}">${c}</option>`).join('');
    
    filter.value = currentValue;
  } catch (err) {
    console.error('Failed to load categories', err);
  }
}

function handleSearchInput(e) {
  const query = e.target.value.toLowerCase().trim();
  const suggestionsBox = document.getElementById('search-suggestions');
  
  if (!query) {
    suggestionsBox.style.display = 'none';
    renderFilteredProducts();
    return;
  }

  const matches = allProducts
    .filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query))
    .slice(0, 5);

  renderSuggestions(matches, query);
  renderFilteredProducts();
}

function renderSuggestions(matches, query) {
  const container = document.getElementById('search-suggestions');
  if (matches.length === 0) {
    container.style.display = 'none';
    return;
  }

  container.innerHTML = matches.map(p => {
    const name = p.name;
    const index = name.toLowerCase().indexOf(query);
    const highlighted = index >= 0 
      ? `${name.substring(0, index)}<span class="match-highlight">${name.substring(index, index + query.length)}</span>${name.substring(index + query.length)}`
      : name;

    return `
      <div class="suggestion-item" onclick="window.location.href='product.html?id=${p.id}'">
        <img src="${p.imageUrl}" alt="">
        <div>
          <div style="font-weight:600">${highlighted}</div>
          <div style="font-size:10px;color:var(--color-text-muted)">in ${p.category}</div>
        </div>
      </div>
    `;
  }).join('');
  
  container.style.display = 'block';
}

// Close suggestions on click outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-input-wrapper')) {
    const s = document.getElementById('search-suggestions');
    if (s) s.style.display = 'none';
  }
});

function renderFilteredProducts() {
  const grid = document.getElementById('product-grid');
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');
  if (!grid) return;

  let filtered = [...allProducts];

  if (searchInput && searchInput.value) {
    const query = searchInput.value.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }

  if (categoryFilter && categoryFilter.value) {
    filtered = filtered.filter(p => p.category === categoryFilter.value);
  }

  grid.innerHTML = filtered.length > 0 
    ? filtered.map(renderProductCard).join('')
    : `<div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No products found</h3>
        <p class="empty-state-text">Try adjusting your search or filter.</p>
      </div>`;
}

async function addToCart(productId) {
  let product = allProducts.find(p => p.id === productId);
  if (!product) {
    try {
      product = await api.get(`/products/${productId}`);
    } catch (e) {
      showToast('Failed to add to cart', 'error');
      return;
    }
  }
  Cart.addItem(product);
}

async function loadProductDetail() {
  const container = document.getElementById('product-detail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    container.innerHTML = '<p>Product not found.</p>';
    return;
  }

  container.innerHTML = '<div class="spinner"></div>';

  try {
    const product = await api.get(`/products/${id}`);

    const stockClass = product.stock <= 0 ? 'out-of-stock'
      : product.stock <= 5 ? 'low-stock' : 'in-stock';
    const stockText = product.stock <= 0 ? 'Out of stock'
      : product.stock <= 5 ? `Only ${product.stock} left!`
      : `${product.stock} in stock`;

    container.innerHTML = `
      <div class="product-detail-image">
        <img src="${product.imageUrl}" alt="${product.name}">
        <button class="wishlist-btn-large" onclick="toggleWishlist(${product.id}, this)">🤍</button>
      </div>
      <div class="product-detail-info">
        <span class="product-detail-category">${product.category}</span>
        <h1 class="product-detail-title">${product.name}</h1>
        <p class="product-detail-price">${formatPrice(product.price)}</p>
        <p class="product-detail-description">${product.description}</p>
        <p class="product-detail-stock ${stockClass}">${stockText}</p>
        <div class="product-detail-actions">
          <div class="quantity-control">
            <button class="quantity-btn" onclick="changeDetailQty(-1)">−</button>
            <span class="quantity-value" id="detail-qty">1</span>
            <button class="quantity-btn" onclick="changeDetailQty(1)">+</button>
          </div>
          <button class="btn btn-primary btn-lg" onclick='addToCartDetail(${JSON.stringify(product).replace(/'/g, "&#39;")})' ${product.stock <= 0 ? 'disabled style="opacity:0.5"' : ''}>
            Add to Cart
          </button>
        </div>
      </div>
    `;

    // Initialize reviews
    if (typeof loadReviews === 'function') {
      loadReviews(id);
    }
    
    // Check if in wishlist
    if (Auth.isLoggedIn() && typeof checkWishlistStatus === 'function') {
      checkWishlistStatus(id);
    }
  } catch (err) {
    container.innerHTML = `<div class="empty-state">
      <div class="empty-state-icon">😕</div>
      <h3 class="empty-state-title">Product not found</h3>
      <p class="empty-state-text">${err.message}</p>
      <a href="index.html" class="btn btn-primary">Browse Products</a>
    </div>`;
  }
}

function changeDetailQty(delta) {
  const el = document.getElementById('detail-qty');
  let qty = parseInt(el.textContent) + delta;
  if (qty < 1) qty = 1;
  el.textContent = qty;
}

function addToCartDetail(product) {
  const qty = parseInt(document.getElementById('detail-qty').textContent);
  Cart.addItem(product, qty);
}

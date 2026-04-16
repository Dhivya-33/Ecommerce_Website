// Cart Module (localStorage-based)
const Cart = {
  _getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },

  _saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this._updateBadge();
  },

  getItems() {
    return this._getCart();
  },

  addItem(product, quantity = 1) {
    const cart = this._getCart();
    const existing = cart.find(item => item.productId === product.id);

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        productName: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity,
      });
    }

    this._saveCart(cart);
    showToast(`${product.name} added to cart`, 'success');
  },

  updateQuantity(productId, quantity) {
    const cart = this._getCart();
    const item = cart.find(i => i.productId === productId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this._saveCart(cart);
    }
  },

  removeItem(productId) {
    let cart = this._getCart();
    cart = cart.filter(i => i.productId !== productId);
    this._saveCart(cart);
  },

  getTotal() {
    return this._getCart().reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getCount() {
    return this._getCart().reduce((sum, item) => sum + item.quantity, 0);
  },

  clear() {
    localStorage.removeItem('cart');
    this._updateBadge();
  },

  _updateBadge() {
    const badge = document.querySelector('.cart-badge');
    const count = this.getCount();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  },
};

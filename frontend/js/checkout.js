// Checkout Module

function renderCheckoutSummary() {
  const container = document.getElementById('order-summary-items');
  const totalEl = document.getElementById('order-total');
  if (!container) return;

  const items = Cart.getItems();

  if (items.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="order-item">
      <span class="order-item-name">${item.productName}</span>
      <span class="order-item-qty">×${item.quantity}</span>
      <span class="order-item-price">${formatPrice(item.price * item.quantity)}</span>
    </div>
  `).join('');

  if (totalEl) {
    totalEl.textContent = formatPrice(Cart.getTotal());
  }
}

async function handleCheckout(event) {
  event.preventDefault();

  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Processing...';

  const items = Cart.getItems();

  const orderData = {
    customerName: form.querySelector('#checkout-name').value,
    email: form.querySelector('#checkout-email').value,
    shippingAddress: form.querySelector('#checkout-address').value,
    items: items.map(i => ({
      productId: i.productId,
      productName: i.productName,
      quantity: i.quantity,
      price: i.price,
    })),
    total: Cart.getTotal(),
  };

  try {
    // Simulate Payment Gateway Interaction
    submitBtn.textContent = '🔒 Processing Payment...';
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    submitBtn.textContent = '📄 Generating Order...';
    await api.post('/orders', orderData);
    Cart.clear();

    // Show success
    document.querySelector('.page-content .container').innerHTML = `
      <div class="empty-state">
        <div class="success-checkmark">✓</div>
        <h2 class="empty-state-title">Order Placed Successfully!</h2>
        <p class="empty-state-text">
          Thank you, ${orderData.customerName}! A confirmation has been sent to ${orderData.email}.
        </p>
        <a href="index.html" class="btn btn-primary btn-lg">Continue Shopping</a>
      </div>
    `;
    showToast('Order placed successfully!', 'success');
  } catch (err) {
    showToast(err.message || 'Failed to place order', 'error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Place Order';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  const form = document.getElementById('checkout-form');
  if (form) form.addEventListener('submit', handleCheckout);
});

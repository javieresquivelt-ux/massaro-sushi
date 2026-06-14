import { getCart, getSubtotal, getTotal, clearCart, setDeliveryMode, getDeliveryMode } from './cart.js';
import { formatPrice } from '../data/menu.js';

const WHATSAPP_NUMBER = '56972377458';

export function initCheckout() {
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  const sendBtn = document.getElementById('checkout-send-btn');
  const backBtn = document.getElementById('checkout-back-btn');

  if (checkoutBtn) checkoutBtn.addEventListener('click', openCheckout);
  if (sendBtn) sendBtn.addEventListener('click', sendWhatsApp);
  if (backBtn) backBtn.addEventListener('click', closeCheckout);
}

function openCheckout() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const checkoutSection = document.getElementById('checkout-section');

  if (drawer) drawer.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-visible');

  if (!checkoutSection) return;

  const cart = getCart();
  if (cart.items.length === 0) return;

  document.body.style.overflow = 'hidden';
  checkoutSection.style.display = 'flex';

  // Initialize delivery mode buttons
  initDeliveryModeButtons();
  renderCheckoutSummary();
}

function initDeliveryModeButtons() {
  const container = document.querySelector('.checkout__delivery-mode');
  if (!container) return;

  // Sync active button with current mode
  const currentMode = getDeliveryMode();
  container.querySelectorAll('.delivery-mode-btn').forEach(btn => {
    const isActive = btn.dataset.mode === currentMode;
    btn.classList.toggle('delivery-mode-btn--active', isActive);
  });

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.delivery-mode-btn');
    if (!btn) return;
    if (btn.classList.contains('delivery-mode-btn--active')) return;

    const mode = btn.dataset.mode;
    setDeliveryMode(mode);

    // Update active state
    container.querySelectorAll('.delivery-mode-btn').forEach(b => {
      b.classList.toggle('delivery-mode-btn--active', b.dataset.mode === mode);
    });

    // Show/hide address field
    toggleAddressField(mode);
    renderCheckoutSummary();
  });

  // Apply initial visibility
  toggleAddressField(currentMode);
}

function toggleAddressField(mode) {
  const addressField = document.querySelector('.checkout__field--address');
  if (!addressField) return;
  addressField.style.display = mode === 'pickup' ? 'none' : 'flex';
}

export function closeCheckout() {
  const checkoutSection = document.getElementById('checkout-section');
  if (!checkoutSection) return;
  checkoutSection.style.display = 'none';
  document.body.style.overflow = '';
}

function renderCheckoutSummary() {
  const cart = getCart();
  const list = document.getElementById('checkout-items');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const deliveryLine = document.querySelector('.checkout__summary-line--delivery');
  const totalEl = document.getElementById('checkout-total');

  if (list) {
    list.innerHTML = cart.items.map(item => `
      <div class="checkout__item">
        <span>${item.quantity}x ${item.name}${item.variantName ? ` (${item.variantName})` : ''}</span>
        <span class="checkout__item-price">${formatPrice(item.price * item.quantity)}</span>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.textContent = formatPrice(getSubtotal());
  if (deliveryLine) deliveryLine.style.display = getDeliveryMode() === 'pickup' ? 'none' : 'flex';
  if (totalEl) totalEl.textContent = formatPrice(getTotal());
}

function buildWhatsAppMessage(cart, customerInfo) {
  const { name, address, notes } = customerInfo;
  const mode = getDeliveryMode();
  const items = cart.items
    .map(item => {
      const variant = item.variantName ? ` (${item.variantName})` : '';
      return `• ${item.quantity}x ${item.name}${variant} — $${(item.price * item.quantity).toLocaleString('es-CL')}`;
    })
    .join('\n');

  const messageLines = [
    '🍣 *PEDIDO MASSARO SUSHI*',
    '',
    '📋 *Detalle:*',
    items,
    '',
  ];

  if (mode === 'delivery') {
    messageLines.push(`🛵 *Delivery*`, `📍 ${address}`, '');
  } else {
    messageLines.push(`🏪 *Retiro en Local*`, '');
  }

  messageLines.push(`💰 *Total: $${getTotal().toLocaleString('es-CL')}*`);
  messageLines.push('');
  messageLines.push(`👤 *Cliente:* ${name}`);
  messageLines.push(`📝 *Notas:* ${notes || 'Sin notas'}`);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageLines.join('\n'))}`;
}

function sendWhatsApp() {
  const name = document.getElementById('checkout-name').value.trim();
  const address = document.getElementById('checkout-address').value.trim();
  const notes = document.getElementById('checkout-notes').value.trim();
  const errorEl = document.getElementById('checkout-error');
  const mode = getDeliveryMode();

  if (!name) {
    if (errorEl) {
      errorEl.textContent = 'Por favor ingresa tu nombre.';
      errorEl.style.display = 'block';
    }
    return;
  }

  if (mode === 'delivery' && !address) {
    if (errorEl) {
      errorEl.textContent = 'Por favor ingresa tu dirección de despacho.';
      errorEl.style.display = 'block';
    }
    return;
  }

  if (errorEl) errorEl.style.display = 'none';

  const cart = getCart();
  const url = buildWhatsAppMessage(cart, { name, address, notes });

  clearCart();
  closeCheckout();
  window.open(url, '_blank');
}

import { getCart, getSubtotal, getTotal, getItemCount, removeFromCart, updateQuantity } from './cart.js';
import { formatPrice } from '../data/menu.js';

function getEl(id) {
  return document.getElementById(id);
}

let isOpen = false;

export function initCartUI() {
  const overlay = getEl('cart-overlay');
  const drawer = getEl('cart-drawer');
  const toggle = getEl('cart-toggle');
  const closeBtn = getEl('cart-drawer-close');

  if (!drawer || !toggle) return;

  toggle.addEventListener('click', () => openDrawer());
  if (closeBtn) closeBtn.addEventListener('click', () => closeDrawer());
  if (overlay) overlay.addEventListener('click', () => closeDrawer());

  document.addEventListener('cart:updated', () => {
    updateBadge();
    openDrawer();
  });

  // Initial render
  updateBadge();
}

function openDrawer() {
  isOpen = true;
  const drawer = getEl('cart-drawer');
  const overlay = getEl('cart-overlay');
  if (drawer) drawer.classList.add('is-open');
  if (overlay) overlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
  renderCartItems();
}

function closeDrawer() {
  isOpen = false;
  const drawer = getEl('cart-drawer');
  const overlay = getEl('cart-overlay');
  if (drawer) drawer.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
}

function updateBadge() {
  const badge = getEl('cart-badge');
  if (!badge) return;
  const count = getItemCount();
  badge.textContent = count;
  badge.style.display = count > 0 ? 'inline-flex' : 'none';
}

function renderCartItems() {
  const cart = getCart();
  const body = getEl('cart-drawer-body');
  const footer = getEl('cart-drawer-footer');
  const subtotalEl = getEl('cart-subtotal');
  const totalEl = getEl('cart-total');

  if (!body) return;

  if (cart.items.length === 0) {
    body.innerHTML = '<div class="cart-drawer__empty">Tu carrito está vacío</div>';
    if (footer) footer.style.display = 'none';
    return;
  }

  if (footer) footer.style.display = 'block';

  const itemsHtml = cart.items.map(item => `
    <div class="cart-item" data-cart-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item__image" loading="lazy" />
      <div class="cart-item__info">
        <p class="cart-item__name">${item.name}</p>
        ${item.variantName ? `<p class="cart-item__variant">${item.variantName}</p>` : ''}
        <div class="cart-item__footer">
          <div class="cart-item__qty">
            <button class="cart-item__qty-btn" data-action="decrease">−</button>
            <span class="cart-item__qty-value">${item.quantity}</span>
            <button class="cart-item__qty-btn" data-action="increase">+</button>
          </div>
          <span class="cart-item__price">${formatPrice(item.price * item.quantity)}</span>
        </div>
        <button class="cart-item__remove" data-action="remove">Eliminar</button>
      </div>
    </div>
  `).join('');

  body.innerHTML = `<div class="cart-drawer__items">${itemsHtml}</div>`;

  if (subtotalEl) subtotalEl.textContent = formatPrice(getSubtotal());
  // El Total ya no se muestra en el drawer, se difiere al checkout

  // Event delegation for cart item actions
  const itemsContainer = body.querySelector('.cart-drawer__items');
  if (!itemsContainer) return;

  itemsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const cartItem = btn.closest('.cart-item');
    if (!cartItem) return;

    const cartId = cartItem.dataset.cartId;
    const action = btn.dataset.action;

    if (action === 'remove') {
      removeFromCart(cartId);
    } else if (action === 'increase') {
      updateQuantity(cartId, 1);
    } else if (action === 'decrease') {
      updateQuantity(cartId, -1);
    }
  });
}

import { getCart, getSubtotal, getItemCount, removeFromCart, updateQuantity, addSalsa, removeSalsa, getSalsas, getSalsaTotal, setCustomizationNote, getCustomizationNote } from './cart.js';
import { formatPrice, salsaOptions } from '../data/menu.js';

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
    updateSummary();
    if (isOpen) {
      renderCartItems();
      renderSalsas();
      renderCustomizationBadge();
    }
    openDrawer();
  });

  const customModalOverlay = getEl('customization-modal-overlay');
  if (customModalOverlay) {
    const closeCustomBtn = document.getElementById('custom-modal-close');
    const saveCustomBtn = document.getElementById('custom-note-save');
    const clearCustomBtn = document.getElementById('custom-note-clear');
    if (closeCustomBtn) closeCustomBtn.addEventListener('click', closeCustomModal);
    if (saveCustomBtn) saveCustomBtn.addEventListener('click', saveCustomNote);
    if (clearCustomBtn) clearCustomBtn.addEventListener('click', clearCustomNote);
    customModalOverlay.addEventListener('click', (e) => {
      if (e.target === customModalOverlay) closeCustomModal();
    });
  }

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
  renderSalsas();
  renderCustomizationBadge();
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

  if (!body) return;

  if (cart.items.length === 0) {
    body.innerHTML = '<div class="cart-drawer__empty">Tu carrito está vacío</div>';
    if (footer) footer.style.display = 'none';
    updateSummary();
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
  updateSummary();

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

function renderSalsas() {
  const container = getEl('cart-salsas');
  if (!container) return;

  const cart = getCart();

  let html = '<div class="cart-drawer__salsas-header">🥫 Agregar salsas</div>';

  salsaOptions.forEach(salsa => {
    const inCart = cart.salsas.find(s => s.id === salsa.id);
    const qty = inCart ? inCart.quantity : 0;
    const totalPrice = qty * salsa.price;
    html += `
      <div class="cart-drawer__salsa-item" data-salsa-id="${salsa.id}">
        <span class="cart-drawer__salsa-name">${salsa.name}</span>
        <div class="cart-drawer__salsa-qty">
          <button class="cart-item__qty-btn salsa-decrease">−</button>
          <span class="cart-item__qty-value">${qty}</span>
          <button class="cart-item__qty-btn salsa-increase">+</button>
        </div>
        <span class="cart-drawer__salsa-price">${qty > 0 ? formatPrice(totalPrice) : '—'}</span>
      </div>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll('.salsa-increase').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.cart-drawer__salsa-item');
      const id = item.dataset.salsaId;
      const salsa = salsaOptions.find(s => s.id === id);
      if (salsa) addSalsa(salsa.id, salsa.name, salsa.price);
    });
  });

  container.querySelectorAll('.salsa-decrease').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.cart-drawer__salsa-item');
      const id = item.dataset.salsaId;
      removeSalsa(id);
    });
  });
}

function updateSummary() {
  const cart = getCart();
  const salsaTotal = getSalsaTotal();
  const customNote = getCustomizationNote();
  const hasSalsas = salsaTotal > 0;
  const hasCustom = !!customNote;
  const subtotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalPartial = subtotal + salsaTotal + (hasCustom ? 1000 : 0);

  const salsasLine = getEl('summary-salsas-line');
  const salsasTotal = getEl('summary-salsas-total');
  if (salsasLine && salsasTotal) {
    salsasLine.style.display = hasSalsas ? 'flex' : 'none';
    salsasTotal.textContent = formatPrice(salsaTotal);
  }

  const customLine = getEl('summary-custom-line');
  if (customLine) {
    customLine.style.display = hasCustom ? 'flex' : 'none';
  }

  const totalEl = getEl('cart-drawer-total');
  if (totalEl) totalEl.textContent = formatPrice(totalPartial);
}

function renderCustomizationBadge() {
  const container = getEl('cart-customization');
  if (!container) return;

  const note = getCustomizationNote();

  if (note) {
    container.innerHTML = `
      <div class="cart-drawer__customization">
        <span class="cart-drawer__custom-badge">📝 Personalizado</span>
        <p class="cart-drawer__custom-note">"${note}"</p>
        <button class="btn btn--small btn--secondary" id="edit-custom-btn">Editar</button>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="cart-drawer__customization">
        <button class="btn btn--small btn--secondary" id="edit-custom-btn" style="width:100%;">
          📝 Personalizar pedido (+$1.000)
        </button>
      </div>
    `;
  }

  const editBtn = document.getElementById('edit-custom-btn');
  if (editBtn) editBtn.addEventListener('click', openCustomModal);
}

function openCustomModal() {
  const overlay = getEl('customization-modal-overlay');
  if (!overlay) return;
  const textarea = document.getElementById('custom-note-input');
  if (textarea) textarea.value = getCustomizationNote();
  overlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';
}

function closeCustomModal() {
  const overlay = getEl('customization-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
}

function saveCustomNote() {
  const textarea = document.getElementById('custom-note-input');
  if (!textarea) return;
  setCustomizationNote(textarea.value.trim());
  closeCustomModal();
}

function clearCustomNote() {
  setCustomizationNote('');
  closeCustomModal();
}

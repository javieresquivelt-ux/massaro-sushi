const STORAGE_KEY = 'massaro-cart';
const DELIVERY_FEE = 2000;
const CUSTOMIZATION_FEE = 1000;

let deliveryMode = 'delivery';

export function setDeliveryMode(mode) {
  deliveryMode = mode;
  notifyCartChange();
}

export function getDeliveryMode() {
  return deliveryMode;
}

function getInitialState() {
  return { items: [], deliveryFee: DELIVERY_FEE, salsas: [], customizationNote: '' };
}

function loadCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return getInitialState();
    const parsed = JSON.parse(data);
    parsed.salsas = parsed.salsas || [];
    parsed.customizationNote = parsed.customizationNote || '';
    return parsed;
  } catch {
    return getInitialState();
  }
}

function saveCart(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function notifyCartChange(productName = null) {
  document.dispatchEvent(new CustomEvent('cart:updated', {
    detail: { itemCount: getItemCount(), total: getTotal(), productName },
  }));
}

let state = getInitialState();

export function initCart() {
  state = loadCart();
  notifyCartChange();
}

export function getCart() {
  return {
    ...state,
    items: state.items.map(item => ({ ...item })),
    salsas: state.salsas.map(s => ({ ...s })),
    customizationNote: state.customizationNote,
  };
}

export function addToCart(product, variantName = null) {
  const existingIndex = state.items.findIndex(
    item => item.productId === product.id && item.variantName === variantName
  );

  if (existingIndex > -1) {
    state.items[existingIndex].quantity += 1;
  } else {
    state.items.push({
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2),
      productId: product.id,
      name: product.name,
      variantName: variantName,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  }

  saveCart(state);
  notifyCartChange(product.name);
}

export function removeFromCart(cartItemId) {
  state.items = state.items.filter(item => item.id !== cartItemId);
  saveCart(state);
  notifyCartChange();
}

export function updateQuantity(cartItemId, delta) {
  const item = state.items.find(i => i.id === cartItemId);
  if (!item) return;

  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    removeFromCart(cartItemId);
    return;
  }

  item.quantity = newQty;
  saveCart(state);
  notifyCartChange();
}

export function clearCart() {
  state = getInitialState();
  saveCart(state);
  notifyCartChange();
}

export function getSubtotal() {
  return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
}

export function getSalsaTotal() {
  return state.salsas.reduce((acc, s) => acc + s.price * s.quantity, 0);
}

export function getTotal() {
  let total = getSubtotal() + getSalsaTotal();
  if (deliveryMode !== 'pickup') total += state.deliveryFee;
  if (state.customizationNote) total += CUSTOMIZATION_FEE;
  return total;
}

export function getItemCount() {
  return state.items.reduce((acc, item) => acc + item.quantity, 0);
}

export function addSalsa(salsaId, salsaName, salsaPrice) {
  const existing = state.salsas.find(s => s.id === salsaId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.salsas.push({ id: salsaId, name: salsaName, price: salsaPrice, quantity: 1 });
  }
  saveCart(state);
  notifyCartChange();
}

export function removeSalsa(salsaId) {
  const existing = state.salsas.find(s => s.id === salsaId);
  if (!existing) return;
  if (existing.quantity > 1) {
    existing.quantity -= 1;
  } else {
    state.salsas = state.salsas.filter(s => s.id !== salsaId);
  }
  saveCart(state);
  notifyCartChange();
}

export function getSalsas() {
  return state.salsas.map(s => ({ ...s }));
}

export function setCustomizationNote(note) {
  state.customizationNote = note;
  saveCart(state);
  notifyCartChange();
}

export function getCustomizationNote() {
  return state.customizationNote;
}

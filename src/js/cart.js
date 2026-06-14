const STORAGE_KEY = 'massaro-cart';
const DELIVERY_FEE = 2000;

let deliveryMode = 'delivery'; // 'delivery' | 'pickup'

export function setDeliveryMode(mode) {
  deliveryMode = mode;
  notifyCartChange();
}

export function getDeliveryMode() {
  return deliveryMode;
}

function getInitialState() {
  return { items: [], deliveryFee: DELIVERY_FEE };
}

function loadCart() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getInitialState();
  } catch {
    return getInitialState();
  }
}

function saveCart(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function notifyCartChange() {
  document.dispatchEvent(new CustomEvent('cart:updated', {
    detail: { itemCount: getItemCount(), total: getTotal() },
  }));
}

let state = getInitialState();

export function initCart() {
  state = loadCart();
  notifyCartChange();
}

export function getCart() {
  return { ...state, items: state.items.map(item => ({ ...item })) };
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
  notifyCartChange();
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

export function getTotal() {
  if (deliveryMode === 'pickup') return getSubtotal();
  return getSubtotal() + state.deliveryFee;
}

export function getItemCount() {
  return state.items.reduce((acc, item) => acc + item.quantity, 0);
}

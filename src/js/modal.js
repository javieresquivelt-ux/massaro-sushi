import { addToCart } from './cart.js';
import { formatPrice } from '../data/menu.js';

let currentProduct = null;

export function initModal() {
  document.addEventListener('modal:open-variant', (e) => {
    currentProduct = e.detail.product;
    openModal(currentProduct);
  });
}

function openModal(product) {
  const overlay = document.getElementById('variant-modal-overlay');
  if (!overlay) return;

  const title = overlay.querySelector('.modal__title');
  const body = overlay.querySelector('.modal__body');

  if (title) title.textContent = 'Elige tu relleno';

  body.innerHTML = `
    <p class="modal__product-name">${product.name}</p>
    <p class="modal__product-price">${formatPrice(product.price)}</p>
    <span class="modal__variants-label">Selecciona un relleno:</span>
    <div class="modal__variants">
      ${product.variants.map((v, i) => `
        <label class="modal__variant">
          <input type="radio" name="variant" value="${v.name}" data-price="${v.price}" class="modal__variant-input" ${i === 0 ? 'checked' : ''} />
          <span class="modal__variant-name">${v.name}</span>
          <span class="modal__variant-price">${formatPrice(v.price)}</span>
        </label>
      `).join('')}
    </div>
  `;

  overlay.classList.add('is-visible');
  document.body.style.overflow = 'hidden';

  // Update selected style on radio change
  const radios = overlay.querySelectorAll('.modal__variant-input');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      overlay.querySelectorAll('.modal__variant').forEach(el => el.classList.remove('is-selected'));
      if (radio.checked) {
        radio.closest('.modal__variant').classList.add('is-selected');
      }
    });
  });

  // Pre-select first variant
  const firstLabel = overlay.querySelector('.modal__variant');
  if (firstLabel) firstLabel.classList.add('is-selected');
}

export function closeModal() {
  const overlay = document.getElementById('variant-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
  currentProduct = null;
}

function confirmVariant() {
  const overlay = document.getElementById('variant-modal-overlay');
  if (!overlay || !currentProduct) return;

  const selected = overlay.querySelector('.modal__variant-input:checked');
  if (!selected) return;

  addToCart(currentProduct, selected.value);
  closeModal();
}

// Wire up close and confirm buttons
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('variant-modal-overlay');
  if (!overlay) return;

  const closeBtn = document.getElementById('modal-close');
  const addBtn = document.getElementById('modal-add-btn');

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (addBtn) addBtn.addEventListener('click', confirmVariant);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
});

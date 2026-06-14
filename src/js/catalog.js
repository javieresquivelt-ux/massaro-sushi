import { products, categories, getProductsByCategory, formatPrice } from '../data/menu.js';
import { addToCart } from './cart.js';

function renderTabs(container) {
  const allTab = document.createElement('button');
  allTab.className = 'catalog__tab catalog__tab--active';
  allTab.dataset.category = '';
  allTab.textContent = 'Todo';
  container.appendChild(allTab);

  const selectContainer = document.getElementById('category-select');
  if (selectContainer) {
    selectContainer.innerHTML = '<option value="">Categoría: Todo</option>';
  }

  categories.forEach(cat => {
    const tab = document.createElement('button');
    tab.className = 'catalog__tab';
    tab.dataset.category = cat.id;
    tab.textContent = cat.name;
    container.appendChild(tab);

    if (selectContainer) {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.name;
      selectContainer.appendChild(option);
    }
  });
}

export function renderCatalog(gridContainer, categoryId = null) {
  const items = getProductsByCategory(categoryId);

  if (!items.length) {
    gridContainer.innerHTML = '<p class="catalog__empty">No hay productos en esta categoría.</p>';
    return;
  }

  const regularItems = items.filter(p => p.category !== 'promos');
  const promos = items.filter(p => p.category === 'promos');

  let html = '';

  // Renderizar productos regulares como cards
  if (regularItems.length) {
    html += regularItems.map(product => {
      const hasVariants = product.variants && product.variants.length > 0;
      const variantText = hasVariants
        ? `<span class="card__variant-hint">Relleno: ${product.variants.map(v => v.name).join(' · ')}</span>`
        : '';
      const badgeHtml = product.badges
        ? product.badges.map(b => `<span class="card__badge card__badge--${b.toLowerCase()}">${b}</span>`).join('')
        : '';
      const piecesHtml = product.pieces
        ? `<span class="card__badge card__badge--pieces">${product.pieces} pz.</span>`
        : '';

      return `
        <article class="card" data-category="${product.category}" data-product-id="${product.id}">
          <div class="card__image-wrapper">
            <img src="${product.image}" alt="${product.name}" class="card__image" loading="lazy" />
            ${badgeHtml}
            ${piecesHtml}
          </div>
          <div class="card__content">
            <h3 class="card__title">${product.name}</h3>
            <p class="card__desc">${product.description}</p>
            ${variantText}
            <div class="card__footer">
              <span class="card__price">${formatPrice(product.price)}</span>
              <button class="btn btn--primary">Agregar</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Renderizar promos como lista ampliada
  if (promos.length) {
    html += `<div class="catalog__promos">`;
    html += promos.map(promo => `
      <article class="promo-card" data-product-id="${promo.id}">
        <div class="promo-card__image-wrapper">
          <img src="${promo.image}" alt="${promo.name}" class="promo-card__image" loading="lazy" />
          <span class="promo-card__pieces">${promo.pieces} pz.</span>
        </div>
        <div class="promo-card__content">
          <h3 class="promo-card__name">${promo.name}</h3>
          <p class="promo-card__desc">${promo.description}</p>
          <div class="promo-card__footer">
            <span class="promo-card__price">${formatPrice(promo.price)}</span>
            <button class="btn btn--primary">Agregar</button>
          </div>
        </div>
      </article>
    `).join('');
    html += `</div>`;
  }

  gridContainer.innerHTML = html;
}

function handleAddToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const hasVariants = product.variants && product.variants.length > 0;

  if (hasVariants) {
    document.dispatchEvent(new CustomEvent('modal:open-variant', { detail: { product } }));
  } else {
    addToCart(product);
  }
}

export function initTabs() {
  const tabsContainer = document.querySelector('.catalog__tabs');
  const gridContainer = document.querySelector('.catalog__grid');

  if (!tabsContainer || !gridContainer) return;

  renderTabs(tabsContainer);
  renderCatalog(gridContainer);

  tabsContainer.addEventListener('click', (e) => {
    const tab = e.target.closest('.catalog__tab');
    if (!tab) return;

    tabsContainer.querySelectorAll('.catalog__tab').forEach(t => t.classList.remove('catalog__tab--active'));
    tab.classList.add('catalog__tab--active');

    const category = tab.dataset.category;
    
    // Sync select
    const select = document.getElementById('category-select');
    if (select) select.value = category;

    renderCatalog(gridContainer, category || null);
  });

  const select = document.getElementById('category-select');
  if (select) {
    select.addEventListener('change', (e) => {
      const category = e.target.value;
      
      // Sync tabs
      tabsContainer.querySelectorAll('.catalog__tab').forEach(t => {
        if (t.dataset.category === category) {
          t.classList.add('catalog__tab--active');
        } else {
          t.classList.remove('catalog__tab--active');
        }
      });

      renderCatalog(gridContainer, category || null);
    });
  }

  // Event delegation for "Agregar" buttons
  gridContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn--primary');
    if (!btn) return;

    const card = btn.closest('[data-product-id]');
    if (!card) return;

    handleAddToCart(card.dataset.productId);
  });
}

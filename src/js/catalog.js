import { products, categories, getProductsByCategory, getCategoryName, formatPrice } from '../data/menu.js';
import { addToCart } from './cart.js';
export function renderCatalog(expandPromos = true) {
  const catalogContent = document.querySelector('.catalog__content');
  if (!catalogContent) return;

  const defaultCategory = 'promos';
  let html = '';

  categories.forEach(cat => {
    const items = getProductsByCategory(cat.id);
    if (!items.length) return;

    const isDefault = cat.id === defaultCategory && expandPromos;

    html += `<div class="catalog__category-group${isDefault ? ' is-expanded is-active-tab' : ''}" data-category-group="${cat.id}">
      <button class="catalog__accordion-header">
        <span>${cat.name}</span>
        <span class="icon">▼</span>
      </button>
      <div class="catalog__category-items">
        <div class="catalog__category-items-inner">`;

    const regularItems = items.filter(p => p.category !== 'promos');
    const promos = items.filter(p => p.category === 'promos');

    if (regularItems.length) {
      html += '<div class="catalog__grid">';
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
            <div class="card__compact-header" data-action="toggle-details">
              <div class="card__compact-header-info">
                <h3 class="card__title">${product.name}</h3>
                <div class="card__compact-header-meta">
                  ${badgeHtml}
                  ${piecesHtml}
                  <span class="card__price">${formatPrice(product.price)}</span>
                  <button class="btn btn--primary">Agregar</button>
                </div>
              </div>
              <span class="card__toggle-icon">▼</span>
            </div>
            <div class="card__compact-details">
              <div class="card__compact-details-inner">
                <div class="card__image-wrapper">
                  <img src="${product.image}" alt="${product.name}" class="card__image" loading="lazy" />
                </div>
                <p class="card__desc">${product.description}</p>
                ${variantText}
              </div>
            </div>
          </article>
        `;
      }).join('');
      html += '</div>';
    }

    if (promos.length) {
      html += '<div class="catalog__promos">';
      html += promos.map(promo => `
        <article class="promo-card" data-product-id="${promo.id}">
          <div class="promo-card__compact-header" data-action="toggle-details">
            <div class="promo-card__compact-header-info">
              <h3 class="promo-card__name">${promo.name} — ${promo.pieces} pz.</h3>
              <div class="promo-card__compact-header-meta">
                <span class="promo-card__price">${formatPrice(promo.price)}</span>
                <button class="btn btn--primary">Agregar</button>
              </div>
            </div>
            <span class="card__toggle-icon">▼</span>
          </div>
          <div class="promo-card__compact-details">
            <div class="promo-card__compact-details-inner">
              <div class="promo-card__image-wrapper">
                <img src="${promo.image}" alt="${promo.name}" class="promo-card__image" loading="lazy" />
              </div>
              <p class="promo-card__desc">${promo.description}</p>
            </div>
          </div>
        </article>
      `).join('');
      html += '</div>';
    }

    html += '</div></div></div>'; // cierra: catalog__category-items-inner, catalog__category-items, catalog__category-group
  });

  catalogContent.innerHTML = html;
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

export function initCatalogSidebar(activeCategory = 'promos') {
  const sidebar = document.querySelector('.catalog__sidebar');
  const catalogContent = document.querySelector('.catalog__content');
  if (!sidebar || !catalogContent) return;

  categories.forEach((cat) => {
    const btn = document.createElement('button');
    const isActive = activeCategory && cat.id === activeCategory;
    btn.className = `catalog__sidebar-btn${isActive ? ' catalog__sidebar-btn--active' : ''}`;
    btn.dataset.category = cat.id;
    btn.textContent = cat.name;
    sidebar.appendChild(btn);
  });

  // Sidebar click — mostrar/ocultar grupos
  sidebar.addEventListener('click', (e) => {
    const btn = e.target.closest('.catalog__sidebar-btn');
    if (!btn) return;

    sidebar.querySelectorAll('.catalog__sidebar-btn').forEach(b => b.classList.remove('catalog__sidebar-btn--active'));
    btn.classList.add('catalog__sidebar-btn--active');

    const category = btn.dataset.category;
    const groups = catalogContent.querySelectorAll('.catalog__category-group');

    groups.forEach(group => {
      if (group.dataset.categoryGroup === category) {
        group.classList.add('is-active-tab');
      } else {
        group.classList.remove('is-active-tab');
      }
    });
  });

  // En desktop solo se muestra la categoría activa (Promos por defecto)
  // El CSS ya oculta los grupos sin is-active-tab en desktop

  // Acordeón móvil — cierre mutuo
  catalogContent.addEventListener('click', (e) => {
    const header = e.target.closest('.catalog__accordion-header');
    if (!header) return;

    const group = header.closest('.catalog__category-group');
    if (!group) return;

    const isExpanded = group.classList.contains('is-expanded');

    // Cerrar todos los demás grupos
    catalogContent.querySelectorAll('.catalog__category-group.is-expanded').forEach(g => {
      g.classList.remove('is-expanded');
    });

    // Toggle el clicado
    if (!isExpanded) {
      group.classList.add('is-expanded');
    }
  });

  // Toggle details (acordeón individual por card/promo)
  catalogContent.addEventListener('click', function(e) {
    const card = e.target.closest('.promo-card, .card');
    if (!card) return;
    if (e.target.closest('.btn--primary')) return;
    if (e.target.closest('.catalog__accordion-header')) return;
    card.classList.toggle('is-expanded');
    const details = card.querySelector('.card__compact-details, .promo-card__compact-details');
    if (details) {
      details.style.display = card.classList.contains('is-expanded') ? 'block' : 'none';
    }
  });

  // Event delegation para botones "Agregar"
  catalogContent.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn--primary');
    if (!btn) return;

    e.stopPropagation();

    const card = btn.closest('[data-product-id]');
    if (!card) return;

    handleAddToCart(card.dataset.productId);
  });
}

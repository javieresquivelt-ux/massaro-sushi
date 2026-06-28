import './sass/app.scss'
import { renderCatalog, initCatalogSidebar } from './js/catalog.js'
import { initCart } from './js/cart.js'
import { initCartUI } from './js/cart-ui.js'
import { initModal } from './js/modal.js'
import { initCheckout } from './js/checkout.js'

function initSpaNavigation() {
  const heroSection = document.getElementById('hero-section');
  const menuSection = document.getElementById('menu');
  const infoSection = document.getElementById('info-section');
  const catalogContent = document.querySelector('.catalog__content');
  const sidebar = document.querySelector('.catalog__sidebar');
  const btnHeroMenu = document.getElementById('btn-hero-menu');
  const btnShowMenu = document.getElementById('btn-show-menu');
  const btnShowHero = document.getElementById('btn-show-hero');
  const btnShowInfo = document.getElementById('btn-show-info');
  const btnOrderNow = document.getElementById('btn-order-now');

  const hideAllSections = () => {
    heroSection?.classList.add('d-none');
    menuSection?.classList.remove('catalog--active');
    infoSection?.classList.remove('info-section--active');
  };

  const showHero = () => {
    hideAllSections();
    heroSection?.classList.remove('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showMenu = () => {
    hideAllSections();
    menuSection?.classList.add('catalog--active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showMenuCollapsed = () => {
    if (window.innerWidth >= 768) {
      showMenu();
      return;
    }
    hideAllSections();
    if (catalogContent) {
      renderCatalog(false);
    }
    menuSection?.classList.add('catalog--active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showInfo = () => {
    if (window.innerWidth >= 768) {
      const footer = document.querySelector('.footer');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    } else {
      hideAllSections();
      infoSection?.classList.add('info-section--active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (btnHeroMenu) btnHeroMenu.addEventListener('click', showMenuCollapsed);
  if (btnShowMenu) btnShowMenu.addEventListener('click', (e) => { e.preventDefault(); showMenuCollapsed(); });
  if (btnShowHero) btnShowHero.addEventListener('click', (e) => { e.preventDefault(); showHero(); });
  if (btnShowInfo) btnShowInfo.addEventListener('click', (e) => { e.preventDefault(); showInfo(); });
  if (btnOrderNow) btnOrderNow.addEventListener('click', (e) => { e.preventDefault(); showMenu(); });

  const navLinks = document.querySelectorAll('#main-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById('main-nav')?.classList.remove('is-open');
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('is-open');
    });
  }

  initSpaNavigation();
  initCart();
  initCartUI();
  initModal();
  initCheckout();
  renderCatalog();
  initCatalogSidebar();
});

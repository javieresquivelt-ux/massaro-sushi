import './sass/app.scss'
import { initTabs } from './js/catalog.js'
import { initCart } from './js/cart.js'
import { initCartUI } from './js/cart-ui.js'
import { initModal } from './js/modal.js'
import { initCheckout } from './js/checkout.js'

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('is-open');
    });

    // UX: Cerrar el menú automáticamente al hacer click en cualquier enlace (One-Page navigation)
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
      });
    });
  }

  initCart();
  initCartUI();
  initModal();
  initCheckout();
  initTabs();
});

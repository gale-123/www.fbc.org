const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');
const dropdowns = [...document.querySelectorAll('.nav-dropdown')];
const navLinks = [...document.querySelectorAll('.site-nav a')];

function closeAllDropdowns(except = null) {
  dropdowns.forEach((dropdown) => {
    if (dropdown === except) return;
    dropdown.classList.remove('open');
    const btn = dropdown.querySelector('.dropdown-trigger');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
}

function closeMenu() {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('open');
  document.body.classList.remove('menu-open');
  closeAllDropdowns();
}

// Mobile hamburger toggle
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
  if (isOpen) closeAllDropdowns();
});

// Dropdown accordion/click toggle (works on mobile tap AND desktop keyboard/click)
dropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector('.dropdown-trigger');
  trigger?.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    closeAllDropdowns(dropdown);
    dropdown.classList.toggle('open', !isOpen);
    trigger.setAttribute('aria-expanded', String(!isOpen));
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) {
    closeAllDropdowns();
  }
});

// Close mobile drawer when navigating
navLinks.forEach((link) => link.addEventListener('click', closeMenu));

// Close menus on Escape key
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Scroll reveal animations
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
}

// Client-side contact form feedback
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  formStatus.textContent = `Thanks${name ? `, ${name}` : ''}! Your note has been received by First Baptist Church, Kajo-Keji.`;
  form.reset();
});

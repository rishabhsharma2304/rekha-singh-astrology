/**
 * Rekha Singh Astrology — main.js
 * Vanilla JS only. Dependency-free.
 */
(function () {
  'use strict';

  const CFG = window.SITE_CONFIG || {};
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------- WhatsApp link builder -------------------- */
  function whatsappUrl(message) {
    const num = (CFG.whatsappNumber || '').replace(/\D/g, '');
    const text = encodeURIComponent(message || CFG.whatsappDefaultMessage || '');
    return 'https://wa.me/' + num + (text ? '?text=' + text : '');
  }

  function applyWhatsappLinks() {
    document.querySelectorAll('[data-whatsapp]').forEach((el) => {
      const customMsg = el.getAttribute('data-whatsapp-message');
      el.setAttribute('href', whatsappUrl(customMsg));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  }

  /* -------------------- Config-driven text -------------------- */
  function applyConfigText() {
    // [data-config="key"] gets the text content from SITE_CONFIG[key]
    document.querySelectorAll('[data-config]').forEach((el) => {
      const key = el.getAttribute('data-config');
      const val = CFG[key];
      if (val) {
        el.textContent = val;
      } else {
        // No value configured — hide the surrounding row so the page doesn't
        // show stale placeholder text like "+91-XXXXXXXXXX".
        const row = el.closest('li, p');
        if (row) row.style.display = 'none';
      }
    });
    // [data-config-href="phone"] / "email" / "justdial"
    document.querySelectorAll('[data-config-href]').forEach((el) => {
      const key = el.getAttribute('data-config-href');
      if (key === 'phone' && CFG.phone) el.setAttribute('href', 'tel:' + CFG.phone.replace(/[\s\-]/g, ''));
      else if (key === 'email' && CFG.email) el.setAttribute('href', 'mailto:' + CFG.email);
      else if (key === 'justdial' && CFG.justdialUrl) el.setAttribute('href', CFG.justdialUrl);
    });
    // Maps embed
    const mapEmbed = document.querySelector('[data-map-embed]');
    if (mapEmbed && CFG.googleMapsEmbed) {
      const iframe = document.createElement('iframe');
      iframe.src = CFG.googleMapsEmbed;
      iframe.loading = 'lazy';
      iframe.title = 'Map showing Rekha Singh Astrology in ' + (CFG.location || 'Lucknow');
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      iframe.setAttribute('allowfullscreen', '');
      mapEmbed.innerHTML = '';
      mapEmbed.appendChild(iframe);
    }
  }

  /* -------------------- Mobile nav -------------------- */
  function initMobileNav() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const overlay = document.querySelector('[data-mobile-nav]');
    const closeBtn = document.querySelector('[data-nav-close]');
    if (!toggle || !overlay) return;

    let lastFocus = null;

    const open = () => {
      lastFocus = document.activeElement;
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const firstLink = overlay.querySelector('a, button');
      if (firstLink) firstLink.focus();
    };
    const close = () => {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };

    toggle.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
      if (e.key === 'Tab' && overlay.classList.contains('is-open')) {
        const focusable = overlay.querySelectorAll('a, button');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* -------------------- Active nav highlight -------------------- */
  function setActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('[data-nav-link]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  /* -------------------- Testimonial carousel -------------------- */
  function initCarousel() {
    const root = document.querySelector('[data-carousel]');
    if (!root) return;

    const track = root.querySelector('[data-carousel-track]');
    const slides = Array.from(track.children);
    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    const dotsWrap = root.querySelector('[data-carousel-dots]');
    if (!track || slides.length === 0) return;

    let index = 0;
    let timer = null;
    const interval = 8000;

    function slidesPerView() {
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 768) return 2;
      return 1;
    }

    function maxIndex() {
      return Math.max(0, slides.length - slidesPerView());
    }

    function update() {
      const perView = slidesPerView();
      const slideWidth = 100 / perView;
      if (index > maxIndex()) index = maxIndex();
      track.style.transform = 'translateX(-' + (index * slideWidth) + '%)';
      // dots
      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach((dot, i) => {
          dot.classList.toggle('is-active', i === index);
        });
      }
    }

    function go(dir) {
      const max = maxIndex();
      index = (index + dir + max + 1) % (max + 1);
      update();
    }

    function start() {
      if (prefersReducedMotion) return;
      stop();
      timer = setInterval(() => go(1), interval);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    // Build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      const buildDots = () => {
        dotsWrap.innerHTML = '';
        const count = maxIndex() + 1;
        for (let i = 0; i < count; i++) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Go to testimonial group ' + (i + 1));
          dot.addEventListener('click', () => { index = i; update(); start(); });
          dotsWrap.appendChild(dot);
        }
        update();
      };
      buildDots();
      window.addEventListener('resize', buildDots);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { go(-1); start(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { go(1); start(); });

    // Pause on hover/focus
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    // Swipe on touch
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].screenX; stop(); }, { passive: true });
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const delta = touchEndX - touchStartX;
      if (Math.abs(delta) > 40) {
        go(delta < 0 ? 1 : -1);
      }
      start();
    }, { passive: true });

    update();
    start();
  }

  /* -------------------- Smooth scroll for in-page anchors -------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* -------------------- Scroll reveal -------------------- */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) || prefersReducedMotion) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* -------------------- Init -------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    applyConfigText();
    applyWhatsappLinks();
    setActiveNav();
    initMobileNav();
    initCarousel();
    initSmoothScroll();
    initReveal();
    // Set current year in footer if present
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
})();

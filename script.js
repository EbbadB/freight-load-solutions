/* ─── NAV: scroll class ─────────────────────────────────────── */
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── MOBILE MENU ───────────────────────────────────────────── */
(function () {
  var hamburger = document.getElementById('hamburger');
  var menu      = document.getElementById('mobile-menu');
  var closeBtn  = document.getElementById('mobile-close');

  if (!hamburger || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  /* Close when a nav link is clicked */
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* ─── WHY FLS: block scroll reveal ─────────────────────────── */
(function () {
  var blocks = document.querySelectorAll('.animate-block');
  if (!blocks.length) return;

  if (!window.IntersectionObserver) {
    blocks.forEach(function (b) { b.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  blocks.forEach(function (b) { observer.observe(b); });
})();

/* stats counter removed — numbers are now hardcoded static HTML */

/* ─── SERVICES: fade-up on scroll ───────────────────────────── */
(function () {
  var cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  if (!window.IntersectionObserver) {
    cards.forEach(function (c) { c.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var card = entry.target;
        var idx  = parseInt(card.dataset.index, 10) || 0;
        setTimeout(function () { card.classList.add('is-visible'); }, idx * 100);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(function (c) { observer.observe(c); });
})();

/* ─── CAROUSELS ──────────────────────────────────────────────── */
(function () {
  function initCarousel(sectionId, cardSelector) {
    var section   = document.getElementById(sectionId);
    if (!section) return;

    var track     = section.querySelector('.carousel-track');
    var cards     = section.querySelectorAll(cardSelector);
    var container = section.querySelector('.carousel-container');
    var prevBtn   = section.querySelector('.carousel-prev');
    var nextBtn   = section.querySelector('.carousel-next');

    if (!track || !cards.length) return;

    var currentIndex = 0;
    var autoTimer    = null;

    function getVisible() {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768)  return 2;
      return 1;
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - getVisible());
    }

    function goTo(index) {
      var max = getMaxIndex();
      if (index < 0)   index = max;
      if (index > max) index = 0;
      currentIndex = index;
      var offset = currentIndex * (cards[0].offsetWidth + 24);
      track.style.transform = 'translateX(-' + offset + 'px)';
    }

    function next() { goTo(currentIndex + 1); }
    function prev() { goTo(currentIndex - 1); }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, 5000);
    }

    function stopAuto() {
      if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAuto(); });

    if (container) {
      container.addEventListener('mouseenter', stopAuto);
      container.addEventListener('mouseleave', startAuto);
    }

    window.addEventListener('resize', function () { goTo(currentIndex); });

    startAuto();
  }

  initCarousel('testimonials',   '.testimonial-card');
  initCarousel('carrier-reviews', '.carrier-card');
})();

/* ─── QUOTE CTA: slide-in on scroll ────────────────────────── */
(function () {
  var content = document.querySelector('#quote-cta .cta-content');
  if (!content) return;

  if (!window.IntersectionObserver) {
    content.classList.add('is-visible');
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      content.classList.add('is-visible');
      observer.unobserve(content);
    }
  }, { threshold: 0.3 });

  observer.observe(content);
})();

/* ─── ROLE TOGGLE ──────────────────────────────────────────────── */
(function () {
  var btns = document.querySelectorAll('.role-btn');
  var hidden = document.getElementById('cf-role-hidden');
  if (!btns.length) return;

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      if (hidden) hidden.value = btn.dataset.role;
    });
  });
})();

/* ─── CONTACT: form validation ──────────────────────────────── */
(function () {
  var form       = document.getElementById('contact-form');
  var submitBtn  = document.getElementById('form-submit');
  if (!form || !submitBtn) return;

  function clearError(input) {
    if (!input) return;
    input.classList.remove('field-error');
    var msg = input.parentNode.querySelector('.field-error-msg');
    if (msg) msg.remove();
  }

  function showError(input, text) {
    if (!input) return;
    input.classList.add('field-error');
    if (!input.parentNode.querySelector('.field-error-msg')) {
      var msg = document.createElement('span');
      msg.className = 'field-error-msg';
      msg.textContent = text || 'Required';
      input.parentNode.appendChild(msg);
    }
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var fname = document.getElementById('cf-fname');
    var lname = document.getElementById('cf-lname');
    var email = document.getElementById('cf-email');
    var valid = true;

    clearError(fname); clearError(lname); clearError(email);

    if (!fname || !fname.value.trim()) { showError(fname, 'Please enter your first name'); valid = false; }
    if (!lname || !lname.value.trim()) { showError(lname, 'Please enter your last name'); valid = false; }
    if (!email || !isValidEmail(email.value)) { showError(email, 'Please enter a valid email'); valid = false; }

    if (!valid) return;

    submitBtn.textContent = '✓ Callback Requested — We\'ll be in touch shortly';
    submitBtn.classList.add('success');
    submitBtn.disabled = true;
  });

  [document.getElementById('cf-fname'), document.getElementById('cf-lname'), document.getElementById('cf-email')].forEach(function (el) {
    if (el) el.addEventListener('input', function () { clearError(el); });
  });
})();

/* ─── BACK TO TOP ────────────────────────────────────────────── */
(function () {
  var btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

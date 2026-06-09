/* ─── NAV: entrance animation ──────────────────────────────── */
(function () {
  var nav = document.getElementById('nav');

  function triggerEntrance() {
    if (nav.classList.contains('loaded')) return;
    nav.classList.add('loaded');

    /* After animation completes, lock transform so scrolled class works cleanly */
    setTimeout(function () {
      nav.classList.add('ready');
      /* Remove the animation class so CSS transition takes over */
      nav.classList.remove('loaded');
    }, 870); /* 0.15s delay + 0.7s duration */
  }

  if (document.readyState === 'complete') {
    requestAnimationFrame(triggerEntrance);
  } else {
    window.addEventListener('load', function () {
      requestAnimationFrame(triggerEntrance);
    });
  }

  /* Fallback in case load is slow */
  setTimeout(triggerEntrance, 200);
})();

/* ─── NAV: scroll class ────────────────────────────────────── */
(function () {
  var nav = document.getElementById('nav');
  var THRESHOLD = 80;

  function onScroll() {
    if (window.scrollY > THRESHOLD) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ─── NAV: active link detection ──────────────────────────── */
(function () {
  var page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === '') page = 'index.html';

  var allLinks = document.querySelectorAll('.nav-links-wrap a, .nav-mobile-links a');

  allLinks.forEach(function (link) {
    var href = (link.getAttribute('href') || '').split('#')[0];
    if (href === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
})();

/* ─── NAV: mobile menu ─────────────────────────────────────── */
(function () {
  var hamburger = document.getElementById('hamburger');
  var menu = document.getElementById('mobile-menu');
  var isOpen = false;

  function openMenu() {
    isOpen = true;
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('open');
    menu.setAttribute('aria-hidden', 'false');
    document.addEventListener('click', onOutsideClick);
  }

  function closeMenu() {
    isOpen = false;
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    menu.setAttribute('aria-hidden', 'true');
    document.removeEventListener('click', onOutsideClick);
  }

  function onOutsideClick(e) {
    if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
      closeMenu();
    }
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    isOpen ? closeMenu() : openMenu();
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
})();

/* ─── NAV: sliding hover bubble ───────────────────────────── */
(function () {
  var wrap = document.querySelector('.nav-links-wrap');
  var bubble = document.getElementById('nav-bubble');
  var links = document.querySelectorAll('.nav-links a');

  if (!wrap || !bubble || !links.length) return;

  function moveBubbleTo(el) {
    var wrapRect = wrap.getBoundingClientRect();
    var elRect = el.getBoundingClientRect();
    bubble.style.left   = (elRect.left - wrapRect.left) + 'px';
    bubble.style.width  = elRect.width + 'px';
    bubble.style.height = elRect.height + 'px';
    bubble.style.opacity = '1';
  }

  function snapToActive() {
    var active = wrap.querySelector('a.active');
    if (active) {
      /* Snap without spring (no transition) so initial placement is instant */
      bubble.style.transition = 'none';
      moveBubbleTo(active);
      /* Re-enable spring after a frame */
      requestAnimationFrame(function () {
        bubble.style.transition = '';
      });
    } else {
      bubble.style.opacity = '0';
    }
  }

  links.forEach(function (link) {
    link.addEventListener('mouseenter', function () {
      moveBubbleTo(link);
    });
  });

  wrap.addEventListener('mouseleave', function () {
    snapToActive();
  });

  /* Position bubble on load (after fonts/layout settle) */
  if (document.readyState === 'complete') {
    snapToActive();
  } else {
    window.addEventListener('load', snapToActive);
  }
  setTimeout(snapToActive, 300);
})();

/* ─── VIDEO: hide if missing, show fallback ────────────────── */
(function () {
  var video = document.getElementById('hero-video');
  var fallback = document.getElementById('video-fallback');

  if (!video) return;

  video.addEventListener('error', showFallback);

  /* No src attribute or empty src */
  var source = video.querySelector('source');
  if (!source || !source.src) {
    showFallback();
    return;
  }

  /* If video hasn't started loading after 3s, show fallback */
  setTimeout(function () {
    if (video.readyState === 0) showFallback();
  }, 3000);

  function showFallback() {
    video.style.display = 'none';
    if (fallback) fallback.style.display = 'block';
  }
})();

/* ─── SERVICES: scroll-reveal cards ───────────────────────── */
(function () {
  var cards = document.querySelectorAll('.service-card');
  if (!cards.length) return;

  /* Fallback for browsers without IntersectionObserver */
  if (!window.IntersectionObserver) {
    cards.forEach(function (card) {
      card.style.animationDelay = '0s';
      card.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var card = entry.target;
        var idx = parseInt(card.dataset.index, 10) || 0;
        card.style.animationDelay = (idx * 0.12) + 's';
        card.classList.add('is-visible');
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.12 });

  cards.forEach(function (card) {
    observer.observe(card);
  });
})();

/* ─── USP: scroll-reveal elements ─────────────────────────── */
(function () {
  var els = document.querySelectorAll('.usp-reveal');
  if (!els.length) return;

  if (!window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.style.animationDelay = el.dataset.delay || '0s';
        el.classList.add('is-visible');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.10 });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ─── TEAM: scroll reveal ──────────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.team-reveal');
  if (!els.length) return;

  if (!window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add('is-revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.style.animationDelay = el.dataset.delay || '0s';
        el.classList.add('is-revealed');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.10 });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ─── COVERAGE: scroll reveal ──────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.coverage-reveal');
  if (!els.length) return;

  if (!window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add('is-revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = parseFloat(el.dataset.delay || '0') * 1000;
        setTimeout(function () { el.classList.add('is-revealed'); }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ─── COVERAGE MAP: state fill animation + tooltip ─────────── */
(function () {
  var map = document.getElementById('us-map');
  if (!map) return;

  var tooltip = document.getElementById('map-tooltip');
  var animated = false;

  /* ── Shuffle array utility ── */
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  /* ── Map fill animation ── */
  function animateMap() {
    if (animated) return;
    animated = true;

    var states = Array.from(map.querySelectorAll('.state'));
    shuffle(states);

    states.forEach(function (el, i) {
      setTimeout(function () {
        el.classList.add('state-active');
      }, i * 18);
    });
  }

  if (window.IntersectionObserver) {
    var mapObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        animateMap();
        mapObserver.unobserve(map);
      }
    }, { threshold: 0.20 });
    mapObserver.observe(map);
  } else {
    animateMap();
  }

  /* ── Tooltip ── */
  if (!tooltip) return;

  var states = map.querySelectorAll('.state');

  states.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      var name = el.getAttribute('data-name') || '';
      if (!name) return;
      tooltip.textContent = name;
      tooltip.classList.add('visible');
    });

    el.addEventListener('mousemove', function (e) {
      tooltip.style.left = e.clientX + 'px';
      tooltip.style.top  = e.clientY + 'px';
    });

    el.addEventListener('mouseleave', function () {
      tooltip.classList.remove('visible');
    });
  });
})();

/* ─── CONTACT: scroll reveal ───────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.contact-reveal');
  if (!els.length) return;

  if (!window.IntersectionObserver) {
    els.forEach(function (el) { el.classList.add('is-revealed'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var delay = parseFloat(el.dataset.delay || '0') * 1000;
        setTimeout(function () { el.classList.add('is-revealed'); }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ─── CONTACT: role selector ───────────────────────────────── */
(function () {
  var btns = document.querySelectorAll('.role-btn');
  var roleInput = document.getElementById('role-input');
  if (!btns.length || !roleInput) return;

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      btns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      roleInput.value = btn.dataset.role || '';
    });
  });
})();

/* ─── CONTACT: form validation ─────────────────────────────── */
(function () {
  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('form-submit');
  if (!form || !submitBtn) return;

  function clearError(input) {
    if (!input) return;
    input.classList.remove('field-error');
    var msg = input.parentNode.querySelector('.field-error-msg');
    if (msg) msg.remove();
  }

  function showError(input) {
    if (!input) return;
    input.classList.add('field-error');
    if (!input.parentNode.querySelector('.field-error-msg')) {
      var msg = document.createElement('span');
      msg.className = 'field-error-msg';
      msg.textContent = 'Required';
      input.parentNode.appendChild(msg);
    }
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstName = document.getElementById('cf-first');
    var email = document.getElementById('cf-email');
    var valid = true;

    clearError(firstName);
    clearError(email);

    if (!firstName || !firstName.value.trim()) {
      showError(firstName);
      valid = false;
    }

    if (!email || !isValidEmail(email.value)) {
      showError(email);
      valid = false;
    }

    if (!valid) return;

    submitBtn.textContent = '✓ We’ll call you within 2 hours';
    submitBtn.classList.add('success');
    submitBtn.disabled = true;
  });

  form.querySelectorAll('input, textarea').forEach(function (el) {
    el.addEventListener('input', function () { clearError(el); });
  });
})();

/* ─── USP: mobile accordion ────────────────────────────────── */
(function () {
  var rows = document.querySelectorAll('.usp-row');
  if (!rows.length) return;

  var mq = window.matchMedia('(max-width: 768px)');

  /* Inject expand indicator into each row's problem side */
  var indicatorMap = [];
  rows.forEach(function (row) {
    var ind = document.createElement('span');
    ind.className = 'usp-expand-indicator';
    ind.setAttribute('aria-hidden', 'true');
    ind.innerHTML = 'See how we fix this <span>&#8594;</span>';
    var problem = row.querySelector('.usp-problem');
    if (problem) {
      problem.appendChild(ind);
      indicatorMap.push({ row: row, ind: ind });
    }
  });

  function getInd(row) {
    for (var i = 0; i < indicatorMap.length; i++) {
      if (indicatorMap[i].row === row) return indicatorMap[i].ind;
    }
    return null;
  }

  function collapseAll() {
    rows.forEach(function (row) {
      row.classList.remove('expanded');
      var ind = getInd(row);
      if (ind) ind.innerHTML = 'See how we fix this <span>&#8594;</span>';
    });
  }

  rows.forEach(function (row) {
    row.addEventListener('click', function () {
      if (!mq.matches) return;
      var wasExpanded = row.classList.contains('expanded');
      collapseAll();
      if (!wasExpanded) {
        row.classList.add('expanded');
        var ind = getInd(row);
        if (ind) ind.innerHTML = '<span>&#8592;</span> Less';
      }
    });
  });

  /* Remove expanded state when resizing to desktop */
  window.addEventListener('resize', function () {
    if (!mq.matches) collapseAll();
  }, { passive: true });
})();

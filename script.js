/* ============================================================
   CAVE CLOS FLEURUS — script.js
   ============================================================ */

'use strict';

/* ---- 1. NAVBAR : scroll + shrink ---- */
(function () {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();


/* ---- 2. MOBILE HAMBURGER MENU ---- */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (navMenu.classList.contains('open') && !document.getElementById('navbar').contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });
})();


/* ---- 3. ACTIVE NAV LINK ON SCROLL ---- */
(function () {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function () {
    let current = '';

    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
})();


/* ---- 4. OPEN / CLOSED STATUS BADGE ---- */
(function () {
  /**
   * Returns { open: bool, label: string, state: 'open'|'soon'|'closed' }
   * Based on Paris local time (Europe/Paris).
   * Horaires : Lun = fermé, Mar–Sam 11h–20h30, Dim 11h–19h30
   */
  function getOpenStatus() {
    // Use Paris timezone
    const now     = new Date();
    const paris   = new Intl.DateTimeFormat('fr-FR', {
      timeZone: 'Europe/Paris',
      hour: '2-digit', minute: '2-digit',
      weekday: 'short', hour12: false
    }).formatToParts(now);

    const parts   = {};
    paris.forEach(function (p) { parts[p.type] = p.value; });

    const weekday = parts.weekday;  // 'lun.', 'mar.', etc.
    const timeStr = parts.hour + ':' + parts.minute; // '14:30'
    const [hh, mm] = timeStr.split(':').map(Number);
    const totalMin = hh * 60 + mm;

    // Monday = closed
    if (weekday === 'lun.') {
      return { open: false, state: 'closed', label: 'Fermé aujourd\'hui' };
    }

    let closeMin;
    const openMin = 11 * 60; // 11h00

    if (weekday === 'dim.') {
      closeMin = 19 * 60 + 30; // 19h30
    } else {
      closeMin = 20 * 60 + 30; // 20h30
    }

    if (totalMin >= openMin && totalMin < closeMin) {
      const remaining = closeMin - totalMin;
      if (remaining <= 30) {
        const ch = Math.floor(closeMin / 60);
        const cm = closeMin % 60;
        return {
          open: true,
          state: 'soon',
          label: 'Ferme bientôt · ' + ch + 'h' + (cm === 0 ? '00' : cm)
        };
      }
      const ch = Math.floor(closeMin / 60);
      const cm = closeMin % 60;
      return {
        open: true,
        state: 'open',
        label: 'Ouvert · Ferme à ' + ch + 'h' + (cm === 0 ? '00' : cm)
      };
    } else if (totalMin < openMin) {
      return { open: false, state: 'closed', label: 'Fermé · Ouvre à 11h00' };
    } else {
      return { open: false, state: 'closed', label: 'Fermé · Ouvre demain' };
    }
  }

  function updateBadge() {
    const badge = document.getElementById('status-badge');
    if (!badge) return;

    const dot  = badge.querySelector('.badge-dot');
    const text = badge.querySelector('.badge-text');
    const info = getOpenStatus();

    text.textContent = info.label;
    dot.className    = 'badge-dot';

    if (info.state === 'open') {
      dot.classList.add('open');
      badge.style.borderColor = 'rgba(76, 175, 80, 0.4)';
    } else if (info.state === 'soon') {
      dot.classList.add('soon');
      badge.style.borderColor = 'rgba(255, 160, 0, 0.4)';
    } else {
      dot.classList.add('closed');
      badge.style.borderColor = 'rgba(231, 76, 60, 0.3)';
    }
  }

  updateBadge();
  setInterval(updateBadge, 60 * 1000); // refresh every minute
})();


/* ---- 5. PARALLAX HERO ---- */
(function () {
  const heroBg = document.getElementById('hero-bg');
  if (!heroBg) return;

  // Disable on reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  function onScroll() {
    if (window.scrollY < window.innerHeight * 1.2) {
      heroBg.style.transform = 'translateY(' + (window.scrollY * 0.38) + 'px)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();


/* ---- 6. SCROLL FADE-IN ANIMATIONS ---- */
(function () {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  fadeEls.forEach(function (el) { observer.observe(el); });
})();


/* ---- 7. SMOOTH SCROLL (polyfill fallback) ---- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();


/* ---- 8. SCROLL PROGRESS BAR ---- */
(function () {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function updateBar() {
    const scrolled  = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct       = maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0;
    bar.style.width = pct + '%';
  }

  window.addEventListener('scroll', updateBar, { passive: true });
  updateBar();
})();


/* ---- 9. SCROLL-TO-TOP BUTTON ---- */
(function () {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 550);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ---- 10. ANIMATED COUNTERS (spirit stats) ---- */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOutQuart = function (t) {
    return 1 - Math.pow(1 - t, 4);
  };

  function animateCounter(el) {
    const target   = parseFloat(el.dataset.count);
    const isFloat  = el.dataset.count.includes('.');
    const prefix   = el.dataset.prefix || '';
    /* Garder le span suffix (★, ans…) s'il existe */
    const suffixEl = el.querySelector('span, sup');
    const suffix   = suffixEl ? suffixEl.outerHTML : '';
    const duration = 1800;
    const startTime = performance.now();

    (function tick(now) {
      const elapsed  = now - startTime;
      const t        = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(t);
      const current  = eased * target;
      const display  = isFloat
        ? current.toFixed(1).replace('.', ',')
        : Math.round(current).toString();

      el.innerHTML = prefix + display + suffix;

      if (t < 1) {
        requestAnimationFrame(tick);
      }
    })(startTime);
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(function (el) { observer.observe(el); });
})();


/* ---- 11. TYPEWRITER EFFECT — hero tagline ---- */
(function () {
  /* Respecter prefers-reduced-motion */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const el = document.querySelector('.hero-tagline');
  if (!el) return;

  const fullText = el.textContent.trim();
  el.textContent = '';
  el.style.borderRight  = '1.5px solid rgba(201, 168, 76, 0.75)';
  el.style.paddingRight = '2px';
  el.style.display      = 'inline-block';

  let index = 0;
  const CHAR_DELAY = 52;
  const START_DELAY = 900;

  function type() {
    if (index < fullText.length) {
      el.textContent += fullText.charAt(index);
      index++;
      setTimeout(type, CHAR_DELAY);
    } else {
      /* Retirer le curseur clignotant après une pause */
      setTimeout(function () {
        el.style.borderRight  = 'none';
        el.style.paddingRight = '0';
      }, 1200);
    }
  }

  setTimeout(type, START_DELAY);
})();


/* ---- 13. CONTACT FORM ---- */
(function () {
  const form     = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showFeedback('Veuillez remplir tous les champs obligatoires (*).', 'error');
      return;
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFeedback('Veuillez entrer une adresse e-mail valide.', 'error');
      return;
    }

    // Simulate async submission
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Envoi en cours…';

    setTimeout(function () {
      showFeedback('✓ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.', 'success');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Envoyer le message';
    }, 1400);
  });

  function showFeedback(message, type) {
    feedback.textContent = message;
    feedback.className   = 'form-feedback ' + type;
    // Auto-hide after 6 seconds
    setTimeout(function () {
      feedback.className = 'form-feedback';
      feedback.textContent = '';
    }, 6000);
  }
})();

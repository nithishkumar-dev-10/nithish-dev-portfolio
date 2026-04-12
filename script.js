/* ═══════════════════════════════════════════
   NITHISH KUMAR — PORTFOLIO SCRIPTS
═══════════════════════════════════════════ */

/* ── LOADER ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hidden');
    // Trigger first-visible reveals after loader
    setTimeout(() => revealElements(), 100);
  }, 1400);
});

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let fX = 0, fY = 0, cX = 0, cY = 0;

document.addEventListener('mousemove', (e) => {
  cX = e.clientX;
  cY = e.clientY;
  cursor.style.left = cX + 'px';
  cursor.style.top  = cY + 'px';
});

function animateFollower() {
  fX += (cX - fX) * 0.12;
  fY += (cY - fY) * 0.12;
  follower.style.left = fX + 'px';
  follower.style.top  = fY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  updateActiveNav();
});

/* ── ACTIVE NAV LINKS ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      // Close mobile menu if open
      document.getElementById('mobile-menu').classList.remove('open');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

/* ── TYPED EFFECT ── */
const typedEl = document.getElementById('typed');
const words = ['AI Engineer', 'Python Developer', 'ML Engineer', 'Backend Builder'];
let wIdx = 0, cIdx = 0, deleting = false;

function type() {
  const word = words[wIdx];
  if (!deleting) {
    typedEl.textContent = word.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === word.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = word.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      wIdx = (wIdx + 1) % words.length;
    }
  }
  setTimeout(type, deleting ? 60 : 90);
}
setTimeout(type, 1600);

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within grids
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

function revealElements() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, i) => {
    // Add stagger delays for grid children
    const parent = el.parentElement;
    if (parent.classList.contains('skills-grid') ||
        parent.classList.contains('projects-grid') ||
        parent.classList.contains('achievements-row') ||
        parent.classList.contains('contact-links')) {
      const siblings = Array.from(parent.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(el);
      el.dataset.delay = idx * 80;
    }
    revealObserver.observe(el);
  });
}

/* ── CONTACT FORM ── */
function handleFormSubmit() {
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all fields.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Please enter a valid email.', 'error');
    return;
  }

  // Build mailto link
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.open(`mailto:nithishkumarsaravanan33@gmail.com?subject=${subject}&body=${body}`, '_blank');

  document.getElementById('contact-form').reset();
  showToast('Opening your email client... ✓', 'success');
}

function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    background: ${type === 'success' ? '#00c8ff' : '#ff4444'};
    color: ${type === 'success' ? '#000' : '#fff'};
    padding: 0.85rem 1.5rem;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.88rem;
    z-index: 9999;
    animation: toastIn 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;
  document.body.appendChild(toast);

  const style = document.createElement('style');
  style.textContent = `@keyframes toastIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`;
  document.head.appendChild(style);

  setTimeout(() => toast.remove(), 3500);
}

/* ── SKILL CARD GLOW ON HOVER ── */
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,200,255,0.06), rgba(13,17,23,0.8) 70%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

/* ── PROJECT CARD GLOW ── */
document.querySelectorAll('.project-card:not(.placeholder)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,200,255,0.05), rgba(13,17,23,0.8) 60%)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

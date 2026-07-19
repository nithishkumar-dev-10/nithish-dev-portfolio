/* ═══════════════════════════════════════════
   NITHISH KUMAR — TOP 1% PORTFOLIO SCRIPTS
   FIXED: All DOM access inside DOMContentLoaded
═══════════════════════════════════════════ */

window.addEventListener('DOMContentLoaded', () => {

  /* ── LOADER ── */
  const loader = document.getElementById('loader');
  function dismissLoader() {
    if (!loader || loader.classList.contains('hidden')) return;
    loader.classList.add('hidden');
    setTimeout(() => {
      try { initReveal(); } catch(e) {}
      try { startTyped(); } catch(e) {}
    }, 300);
  }
  setTimeout(dismissLoader, 1200);

  /* ── CANVAS PARTICLE NETWORK ── */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], mouse = { x: -1000, y: -1000 };
    const COUNT = 55;
    const COLOR = '79,255,176';

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }

    function Particle() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.r  = Math.random() * 1.5 + 0.5;
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < COUNT; i++) particles.push(new Particle());
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 100) { p.x += dx * 0.02; p.y += dy * 0.02; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + COLOR + ',0.55)';
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(' + COLOR + ',' + ((1 - d/120) * 0.18) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();
    window.addEventListener('resize', () => { resize(); initParticles(); });
    document.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
  }

  /* ── CUSTOM CURSOR ── */
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  if (cursor && follower) {
    let fX = 0, fY = 0, cX = 0, cY = 0;
    document.addEventListener('mousemove', e => {
      cX = e.clientX; cY = e.clientY;
      cursor.style.left = cX + 'px';
      cursor.style.top  = cY + 'px';
    });
    (function animateFollower() {
      fX += (cX - fX) * 0.1;
      fY += (cY - fY) * 0.1;
      follower.style.left = fX + 'px';
      follower.style.top  = fY + 'px';
      requestAnimationFrame(animateFollower);
    })();
  }

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
      updateActiveNav();
    });
  }

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-link');
    let current    = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── HAMBURGER & MOBILE MENU ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobClose   = document.getElementById('mob-close');

  function openMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = 'rotate(45deg) translate(5px, 3px)';
    spans[1].style.transform = 'rotate(-45deg) translate(5px, -3px)';
  }

  function closeMobileMenu() {
    if (!mobileMenu || !hamburger) return;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; });
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    });
  }
  if (mobClose) mobClose.addEventListener('click', closeMobileMenu);

  /* ── TYPED EFFECT ── */
  function startTyped() {
    const el = document.getElementById('typed');
    if (!el) return;
    const words = ['AI Engineer', 'Python Developer', 'ML Engineer', 'Backend Builder', 'Agent Architect'];
    let wIdx = 0, cIdx = 0, deleting = false;
    function tick() {
      const word = words[wIdx];
      if (!deleting) {
        el.textContent = word.substring(0, cIdx + 1);
        cIdx++;
        if (cIdx === word.length) { deleting = true; setTimeout(tick, 2000); return; }
      } else {
        el.textContent = word.substring(0, cIdx - 1);
        cIdx--;
        if (cIdx === 0) { deleting = false; wIdx = (wIdx + 1) % words.length; }
      }
      setTimeout(tick, deleting ? 55 : 85);
    }
    tick();
  }

  /* ── SCROLL REVEAL ── */
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
  }

  /* ── SKILL CARD MOUSE-GLOW ── */
  document.querySelectorAll('.skill-card, .proj-card:not(.placeholder)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.background = 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(79,255,176,0.04) 0%, var(--bg2) 65%)';
    });
    card.addEventListener('mouseleave', () => { card.style.background = ''; });
  });

  /* ── CONTACT FORM ── */
  window.handleFormSubmit = function() {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    if (!name || !email || !message) { showToast('Please fill in all fields.', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast('Please enter a valid email.', 'error'); return; }
    const subject  = encodeURIComponent('Portfolio Contact from ' + name);
    const body     = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
    const gmailUrl = 'https://mail.google.com/mail/?view=cm&to=nithishkumar.dev10@gmail.com&su=' + subject + '&body=' + body;
    window.open(gmailUrl, '_blank');
    document.getElementById('contact-form').reset();
    showToast('Opening your email client', 'success');
  };

  function showToast(msg, type) {
    document.querySelector('.toast') && document.querySelector('.toast').remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    const ok = type === 'success';
    toast.style.cssText = 'position:fixed;bottom:2rem;right:2rem;background:' + (ok ? '#4fffb0' : '#ff5f57') + ';color:' + (ok ? '#07090d' : '#fff') + ';padding:0.85rem 1.5rem;border-radius:100px;font-family:monospace;font-weight:500;font-size:0.82rem;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.3);';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  /* ── ARCH NODE PULSE ── */
  setTimeout(() => {
    document.querySelectorAll('.arch-micro-node').forEach((node, i) => {
      setTimeout(() => {
        node.style.borderColor = 'rgba(79,255,176,0.4)';
        node.style.color = '#4fffb0';
        setTimeout(() => { node.style.borderColor = ''; node.style.color = ''; }, 600);
      }, i * 80);
    });
  }, 2500);

}); // end DOMContentLoaded

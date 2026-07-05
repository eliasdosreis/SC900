/* ============================================================
   SC-900 · EFFECTS — Interatividade visual
   Partículas · Tilt 3D · Confetti · Ripple · Parallax · Glow
   ============================================================ */

(function () {
  'use strict';

  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    // Still init basic observers but skip particles/confetti
    initScrollEffects();
    initButtonRipple();
    return;
  }

  initParticles();
  initMouseGlow();
  initButtonRipple();
  initTiltCards();
  initScrollEffects();
  initConfetti();

  /* ==========================================================
     1. PARTICLE SYSTEM — Floating dots connected by lines
     ========================================================== */
  function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let W, H;
    const particles = [];
    const PARTICLE_COUNT = 50;
    const CONNECT_DIST = 140;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(79,142,247,0.35)';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(79,142,247,${0.12 * (1 - dist / CONNECT_DIST)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    }
    animate();
  }

  /* ==========================================================
     2. MOUSE GLOW — Soft light that follows cursor
     ========================================================== */
  function initMouseGlow() {
    const glow = document.createElement('div');
    glow.className = 'mouse-glow';
    document.body.appendChild(glow);

    let mouseX = -500, mouseY = -500;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.left = mouseX + 'px';
      glow.style.top = mouseY + 'px';
    });

    document.addEventListener('mouseleave', () => {
      glow.style.left = '-500px';
    });
  }

  /* ==========================================================
     3. BUTTON RIPPLE — Water ripple on click
     ========================================================== */
  function initButtonRipple() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn, .quiz-opt, .layer-btn, .path-dot, .lesson__done');
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);

      ripple.addEventListener('animationend', () => ripple.remove());
    });
  }

  /* ==========================================================
     4. 3D TILT CARDS — Cards follow mouse with perspective
     ========================================================== */
  function initTiltCards() {
    // Auto-detect card selectors across all pages
    const selectors = [
      '.domain-card', '.pillar', '.house', '.gov-card', '.id-card',
      '.cmp-card', '.ext-card', '.resource', '.quiz-q', '.callout',
      '.story', '.connect-box', '.ca-stage', '.auth-gen', '.vocab-card',
      '.term', '.cmode', '.quiz-result', '.progress-card',
    ];

    const cards = document.querySelectorAll(selectors.join(', '));
    cards.forEach((card) => {
      card.classList.add('tilt-card');

      // Add shine overlay
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      card.style.position = card.style.position || 'relative';
      card.appendChild(shine);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;

        // Move shine
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255,255,255,0.1) 0%, transparent 60%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  /* ==========================================================
     5. SCROLL EFFECTS — Reveal, stagger, navbar
     ========================================================== */
  function initScrollEffects() {
    // Intersection observer for reveals
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children').forEach((el) => {
      revealObserver.observe(el);
    });

    // Navbar scroll effect
    const nav = document.querySelector('.nav');
    if (nav) {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
            ticking = false;
          });
          ticking = true;
        }
      });
      // Initial check
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }

    // Counter animation for stat numbers
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.stat__num[data-target]').forEach((el) => {
      counterObserver.observe(el);
    });
  }

  function animateCounter(el) {
    if (prefersReducedMotion) {
      el.textContent = el.dataset.target;
      return;
    }
    const target = +el.dataset.target;
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ==========================================================
     6. CONFETTI — Celebration particles on completion
     ========================================================== */
  function initConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let W, H;
    let confettiPieces = [];
    let animating = false;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#4f8ef7', '#7fba00', '#f25022', '#ffb900', '#00a4ef', '#ff6b6b', '#c084fc'];

    // Listen for completion events
    document.addEventListener('confetti', (e) => {
      launchConfetti(e.detail?.count || 80);
    });

    // Also trigger on 100% progress bars
    const progressObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.attributeName === 'style') {
          const el = m.target;
          if (el.classList.contains('progress-card__fill')) {
            const width = parseFloat(el.style.width);
            if (width === 100) {
              setTimeout(() => launchConfetti(60), 400);
            }
          }
        }
      });
    });

    document.querySelectorAll('.progress-card__fill').forEach((el) => {
      progressObserver.observe(el, { attributes: true });
    });

    // Also trigger on quiz-result if passed
    const quizResultObserver = new MutationObserver(() => {
      const result = document.getElementById('quizResult');
      if (result && !result.hidden) {
        const grade = result.querySelector('.quiz-result__grade');
        if (grade && grade.textContent.includes('PASSED')) {
          setTimeout(() => launchConfetti(100), 300);
        }
      }
    });

    const quizResult = document.getElementById('quizResult');
    if (quizResult) {
      quizResultObserver.observe(quizResult, { attributes: true });
    }

    function launchConfetti(count) {
      confettiPieces = [];
      for (let i = 0; i < count; i++) {
        confettiPieces.push({
          x: Math.random() * W,
          y: -10 - Math.random() * 200,
          w: Math.random() * 8 + 4,
          h: Math.random() * 4 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 3 + 2,
          rot: Math.random() * 360,
          rotV: (Math.random() - 0.5) * 10,
          opacity: 1,
        });
      }
      if (!animating) {
        animating = true;
        animateConfetti();
      }
    }

    function animateConfetti() {
      ctx.clearRect(0, 0, W, H);

      confettiPieces.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.vx *= 0.99; // drag
        p.rot += p.rotV;
        p.opacity -= 0.003;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      // Remove dead pieces
      confettiPieces = confettiPieces.filter((p) => p.opacity > 0 && p.y < H + 50);

      if (confettiPieces.length > 0) {
        requestAnimationFrame(animateConfetti);
      } else {
        animating = false;
        ctx.clearRect(0, 0, W, H);
      }
    }
  }

  /* ==========================================================
     7. UTILITY — Expose confetti trigger globally
     ========================================================== */
  window.launchConfetti = function (count) {
    document.dispatchEvent(new CustomEvent('confetti', { detail: { count } }));
  };

  window.triggerCelebration = function () {
    window.launchConfetti(120);
  };

})();

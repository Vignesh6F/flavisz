/* =========================================
   FLAVIN WEB COMPANY — JavaScript
   ========================================= */

(function () {
  'use strict';

  /* ---- NAVBAR SCROLL BEHAVIOR ---- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar sticky
    if (scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Back to top
    if (scrollY > 400) backToTop.classList.add('visible');
    else backToTop.classList.remove('visible');

    // Active nav link
    const sections = ['home', 'services', 'about', 'portfolio', 'stats', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom > 100) {
        navLinks.forEach(l => l.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) link.classList.add('active');
      }
    });

    // Trigger scroll reveals
    revealOnScroll();
    // Trigger stat counters
    tryCounters();
  });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- HAMBURGER MENU ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinksEl = document.getElementById('nav-links');
  hamburger.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinksEl.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  document.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      navLinksEl.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ---- PARTICLES ---- */
  const particlesContainer = document.getElementById('particles');
  const particleColors = ['#255DCE', '#4D7FE0', '#DE1110', '#FF3736', '#90AAFF', '#021861'];

  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 6 + 2;
    const color = particleColors[Math.floor(Math.random() * particleColors.length)];
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      box-shadow: 0 0 ${size * 3}px ${color};
      animation-duration: ${Math.random() * 10 + 8}s;
      animation-delay: ${Math.random() * 5}s;
    `;
    particlesContainer.appendChild(particle);
    setTimeout(() => particle.remove(), 20000);
  }

  // Create initial particles
  for (let i = 0; i < 20; i++) setTimeout(createParticle, i * 300);
  setInterval(createParticle, 600);

  /* ---- SCROLL REVEAL ---- */
  function addRevealClasses() {
    // Add reveal classes to key sections
    const revealEls = [
      { selector: '.service-card', cls: 'reveal' },
      { selector: '.portfolio-card', cls: 'reveal' },
      { selector: '.stat-item', cls: 'reveal' },
      { selector: '.process-step', cls: 'reveal' },
      { selector: '.testimonial-card', cls: 'reveal' },
      { selector: '.pricing-card', cls: 'reveal' },
      { selector: '.about-visual', cls: 'reveal-left' },
      { selector: '.about-content', cls: 'reveal-right' },
      { selector: '.contact-info', cls: 'reveal-left' },
      { selector: '.contact-form-wrap', cls: 'reveal-right' },
      { selector: '.section-header', cls: 'reveal' },
      { selector: '.value-item', cls: 'reveal' },
    ];
    revealEls.forEach(({ selector, cls }) => {
      document.querySelectorAll(selector).forEach((el, i) => {
        if (!el.classList.contains('reveal') && !el.classList.contains('reveal-left') && !el.classList.contains('reveal-right')) {
          el.classList.add(cls);
          el.style.transitionDelay = `${i * 0.08}s`;
        }
      });
    });
  }

  function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }

  addRevealClasses();
  revealOnScroll(); // Initial run

  /* ---- STAT COUNTERS ---- */
  let countersTriggered = false;
  function tryCounters() {
    if (countersTriggered) return;
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      countersTriggered = true;
      runCounters();
    }
  }

  function runCounters() {
    const statNums = document.querySelectorAll('.stat-number');
    statNums.forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const current = Math.floor(eased * target);
        el.textContent = current.toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target.toLocaleString();
      }
      requestAnimationFrame(update);
    });
  }

  /* ---- PORTFOLIO FILTER ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      portfolioCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ---- TESTIMONIALS SLIDER ---- */
  const track = document.getElementById('testimonials-track');
  const dots = document.querySelectorAll('.test-dot');
  let currentSlide = 0;
  const totalSlides = document.querySelectorAll('.testimonial-card').length;
  let visibleSlides = window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1;
  let maxSlide = Math.max(0, totalSlides - visibleSlides);

  function goToSlide(idx) {
    currentSlide = Math.max(0, Math.min(idx, maxSlide));
    const cardWidth = track.firstElementChild.offsetWidth + 24;
    track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  document.getElementById('test-next').addEventListener('click', () => goToSlide(currentSlide + 1));
  document.getElementById('test-prev').addEventListener('click', () => goToSlide(currentSlide - 1));
  dots.forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.idx, 10)));
  });

  // Auto-slide
  let autoSlide = setInterval(() => {
    if (currentSlide >= maxSlide) goToSlide(0);
    else goToSlide(currentSlide + 1);
  }, 5000);

  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
      if (currentSlide >= maxSlide) goToSlide(0);
      else goToSlide(currentSlide + 1);
    }, 5000);
  });

  window.addEventListener('resize', () => {
    visibleSlides = window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1;
    maxSlide = Math.max(0, totalSlides - visibleSlides);
    goToSlide(0);
  });

  /* ---- PRICING TOGGLE ---- */
  const priceToggle = document.getElementById('price-toggle');
  const monthlyPrices = {
    starter: '15,000',
    growth: '35,000',
    enterprise: '75,000'
  };
  const yearlyPrices = {
    starter: '12,000',
    growth: '28,000',
    enterprise: '60,000'
  };

  priceToggle.addEventListener('change', () => {
    const isYearly = priceToggle.checked;
    const prices = isYearly ? yearlyPrices : monthlyPrices;
    document.querySelectorAll('.price-num').forEach((el, i) => {
      const keys = Object.keys(prices);
      if (keys[i]) {
        el.style.transform = 'scale(0.8)';
        el.style.opacity = '0';
        setTimeout(() => {
          el.textContent = prices[keys[i]];
          el.style.transform = 'scale(1)';
          el.style.opacity = '1';
        }, 200);
        el.style.transition = 'all 0.2s ease';
      }
    });
  });

  /* ---- CONTACT FORM ---- */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('contact-submit-btn');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.style.opacity = '0.7';
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    // Simulate async form submission
    await new Promise(r => setTimeout(r, 1800));

    submitBtn.style.display = 'none';
    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => {
      submitBtn.style.display = '';
      submitBtn.style.opacity = '';
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Message';
      formSuccess.classList.remove('show');
    }, 5000);
  });

  /* ---- NEWSLETTER ---- */
  const newsletterBtn = document.getElementById('newsletter-btn');
  const newsletterEmail = document.getElementById('newsletter-email');
  newsletterBtn.addEventListener('click', () => {
    if (newsletterEmail.value && newsletterEmail.value.includes('@')) {
      newsletterBtn.textContent = '✓';
      newsletterBtn.style.background = 'linear-gradient(135deg, #10B981, #06B6D4)';
      newsletterEmail.value = '';
      setTimeout(() => {
        newsletterBtn.textContent = '→';
        newsletterBtn.style.background = '';
      }, 3000);
    } else {
      newsletterEmail.style.borderColor = '#EF4444';
      setTimeout(() => { newsletterEmail.style.borderColor = ''; }, 2000);
    }
  });

  /* ---- SMOOTH ANCHOR SCROLL ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- MOUSE PARALLAX ON HERO ---- */
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg-img');
  document.addEventListener('mousemove', e => {
    if (!heroContent) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroContent.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    if (heroBg) heroBg.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px) scale(1.05)`;
  });

  /* ---- CARD TILT EFFECT ---- */
  document.querySelectorAll('.service-card, .pricing-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const tiltX = ((y - cy) / cy) * 6;
      const tiltY = -((x - cx) / cx) * 6;
      card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;

      // Move glow
      const glow = card.querySelector('.card-glow');
      if (glow) {
        glow.style.top = `${y - rect.height}px`;
        glow.style.left = `${x - rect.width}px`;
        glow.style.opacity = '1';
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const glow = card.querySelector('.card-glow');
      if (glow) glow.style.opacity = '0';
    });
  });

  /* ---- TYPING EFFECT FOR HERO ---- */
  const headline = document.querySelector('.hero-headline');
  if (headline) {
    const gradientSpan = headline.querySelector('.gradient-text');
    if (gradientSpan) {
      const words = ['Dominate', 'Transform', 'Conquer', 'Elevate'];
      let wordIdx = 0;
      let charIdx = 0;
      let isDeleting = false;

      function typeWord() {
        const currentWord = words[wordIdx];
        if (isDeleting) {
          gradientSpan.textContent = currentWord.substring(0, charIdx - 1);
          charIdx--;
        } else {
          gradientSpan.textContent = currentWord.substring(0, charIdx + 1);
          charIdx++;
        }

        let delay = isDeleting ? 60 : 100;

        if (!isDeleting && charIdx === currentWord.length) {
          delay = 2000;
          isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
          isDeleting = false;
          wordIdx = (wordIdx + 1) % words.length;
          delay = 400;
        }

        setTimeout(typeWord, delay);
      }

      setTimeout(typeWord, 2000);
    }
  }

  /* ---- CURSOR GLOW EFFECT ---- */
  const cursorGlow = document.createElement('div');
  cursorGlow.style.cssText = `
    position: fixed;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(37,93,206,0.08) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: all 0.1s ease;
  `;
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  /* ---- INITIAL ANIMATIONS ---- */
  window.addEventListener('load', () => {
    revealOnScroll();
    tryCounters();
  });

})();

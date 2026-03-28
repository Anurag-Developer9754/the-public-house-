// ============================================
//  THE PUBLIC HOUSE — script.js
// ============================================

/* ── NAVBAR SCROLL EFFECT ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });


/* ── MOBILE MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu  = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});

function closeMobile() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}


/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.about, .menu-section, .menu-card, .gallery-section, .reviews-section, .review-card, .gallery-item, .feature-item, .contact-info-col, .contact-map-col'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children within a parent container
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

revealEls.forEach((el, i) => {
  // Add stagger delays to grid children
  el.dataset.delay = (i % 4) * 100;
  revealObserver.observe(el);
});


/* ── SMOOTH ANCHOR SCROLLING ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 20;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});


/* ── GALLERY LIGHTBOX (Simple) ── */
const galleryItems = document.querySelectorAll('.gallery-item');

// Create lightbox elements
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.innerHTML = `
  <div class="lb-backdrop"></div>
  <div class="lb-content">
    <button class="lb-close">&times;</button>
    <img class="lb-img" src="" alt="Gallery Image" />
  </div>
`;
lightbox.style.cssText = `
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s ease;
`;
lightbox.querySelector('.lb-backdrop').style.cssText = `
  position: absolute;
  inset: 0;
  background: rgba(10,8,5,0.92);
  cursor: pointer;
`;
lightbox.querySelector('.lb-content').style.cssText = `
  position: relative;
  z-index: 1;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
lightbox.querySelector('.lb-img').style.cssText = `
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.6);
`;
lightbox.querySelector('.lb-close').style.cssText = `
  position: absolute;
  top: -48px;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  line-height: 1;
  opacity: 0.8;
  transition: opacity 0.2s;
`;
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector('.lb-img');

function openLightbox(src) {
  lbImg.src = src;
  lightbox.style.opacity = '1';
  lightbox.style.pointerEvents = 'all';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.style.opacity = '0';
  lightbox.style.pointerEvents = 'none';
  document.body.style.overflow = '';
}

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    openLightbox(src);
  });
});

lightbox.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});


/* ── ACTIVE NAV HIGHLIGHT on Scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinksAll.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--gold)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


/* ── PARALLAX on Hero Image ── */
const heroImg = document.querySelector('.hero-img');

window.addEventListener('scroll', () => {
  if (!heroImg) return;
  const scrolled = window.scrollY;
  if (scrolled < window.innerHeight) {
    heroImg.style.transform = `scale(1) translateY(${scrolled * 0.3}px)`;
  }
}, { passive: true });


/* ── INIT ── */
console.log('%c✦ The Public House — Bhopal ✦', 'font-family:serif; font-size:18px; color:#C9973B; font-weight:bold;');
/* ══════════════════════════════════════════
   NINDY PORTFOLIO — script.js
   ══════════════════════════════════════════ */

/* ── 1. Active navbar link on scroll ── */
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();


/* ── 2. Scroll Reveal (IntersectionObserver) ── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger delay based on sibling position
      const siblings = Array.from(entry.target.parentElement.children);
      const siblingIndex = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = (siblingIndex % 3) * 0.12 + 's';

      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

revealElements.forEach(el => revealObserver.observe(el));


/* ── 3. Skill Bar Animation on scroll into view ── */
const skillCards = document.querySelectorAll('.skill-card');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-bar-fill');
      if (bar) {
        const targetWidth = bar.getAttribute('data-width') + '%';
        // Slight delay so reveal animation finishes first
        setTimeout(() => {
          bar.style.width = targetWidth;
        }, 200);
      }
      skillObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.3
});

skillCards.forEach(card => skillObserver.observe(card));


/* ── 4. Contact Form Submit ── */
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');

function showToast() {
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Simple validation
    const inputs = contactForm.querySelectorAll('[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#f87171';
        isValid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    if (!isValid) return;

    // Simulate loading
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Mengirim...';
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.opacity = '';
      btn.style.pointerEvents = '';
      contactForm.reset();
      showToast();
    }, 1800);
  });

  // Reset border color on input
  contactForm.querySelectorAll('[required]').forEach(input => {
    input.addEventListener('input', function () {
      if (this.value.trim()) {
        this.style.borderColor = '';
      }
    });
  });
}


/* ── 5. Smooth close navbar on mobile after link click ── */
const navLinks = document.querySelectorAll('.nav-link');
const navCollapse = document.getElementById('navMenu');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navCollapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});


/* ── 6. Navbar shadow on scroll ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

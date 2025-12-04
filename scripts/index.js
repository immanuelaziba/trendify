// TRENDIFY - JAVASCRIPT


// MOBILE NAVIGATION

const mobileToggle = document.getElementById('mobile-toggle');
const closeBtn = document.getElementById('close');
const navbar = document.getElementById('navbar');
const body = document.body;

// Open mobile menu
if (mobileToggle) {
  mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navbar.classList.add('active');
    body.style.overflow = 'hidden';
    
    // Animate hamburger to X
    mobileToggle.classList.add('active');
  });
}

// Close mobile menu
if (closeBtn) {
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMobileMenu();
  });
}

// Close mobile menu function
function closeMobileMenu() {
  navbar.classList.remove('active');
  body.style.overflow = '';
  if (mobileToggle) {
    mobileToggle.classList.remove('active');
  }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navbar && navbar.classList.contains('active')) {
    if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

// Close menu when clicking nav links
const navLinks = document.querySelectorAll('#navbar li a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbar.classList.contains('active')) {
      closeMobileMenu();
    }
  });
});


// HEADER SCROLL EFFECT

const header = document.getElementById('header');
let lastScroll = 0;
let ticking = false;

function updateHeader() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
  
  lastScroll = currentScroll;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(updateHeader);
    ticking = true;
  }
});


// SMOOTH SCROLLING

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    
    if (targetId === '#' || targetId === '#close') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});


// ACTIVE NAV LINK

function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.remove('active');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html') ||
        (currentPage === '/' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

setActiveNavLink();


// INTERSECTION OBSERVER (FADE IN)

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements with fade-in animation
const animatedElements = document.querySelectorAll('.feature-item, .philosophy');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
  fadeObserver.observe(el);
});


// KEYBOARD ACCESSIBILITY

// Mobile menu keyboard controls
if (mobileToggle) {
  mobileToggle.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navbar.classList.add('active');
      body.style.overflow = 'hidden';
      
      const firstLink = navbar.querySelector('a');
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeMobileMenu();
      if (mobileToggle) mobileToggle.focus();
    }
  });
}

// Trap focus within mobile menu
document.addEventListener('keydown', (e) => {
  if (navbar && navbar.classList.contains('active') && e.key === 'Tab') {
    const focusableElements = navbar.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navbar && navbar.classList.contains('active')) {
    closeMobileMenu();
    if (mobileToggle) mobileToggle.focus();
  }
});


// UTILITY FUNCTIONS

// Debounce function
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


// RESIZE HANDLING

function handleResize() {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768 && navbar.classList.contains('active')) {
    closeMobileMenu();
  }
}

window.addEventListener('resize', debounce(handleResize, 150));


// ANNOUNCEMENT BAR ANIMATION (MOBILE)

function setupAnnouncementBar() {
  const announcementContent = document.querySelector('.announcement-content');
  
  if (announcementContent && window.innerWidth <= 480) {
    // Clone content for seamless loop
    const clone = announcementContent.cloneNode(true);
    announcementContent.parentElement.appendChild(clone);
  }
}

setupAnnouncementBar();
window.addEventListener('resize', debounce(setupAnnouncementBar, 250));


// PERFORMANCE OPTIMIZATION

// Lazy load images (if using actual images)
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// CONSOLE MESSAGE

console.log('%c✨ Trendify', 'color: #2c2c2c; font-size: 24px; font-weight: 300; font-family: Cormorant Garamond, serif;');
console.log('%cWhere Style Meets Confidence', 'color: #8b8b8b; font-size: 12px; letter-spacing: 1px;');

// PAGE LOAD OPTIMIZATION

// Remove loading class when page is fully loaded
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Trigger any animations that should start on load
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.animation = 'fadeInUp 1s cubic-bezier(0.4, 0, 0.2, 1) forwards';
  }
});
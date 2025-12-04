// TRENDIFY - PRODUCTS PAGE JAVASCRIPT


// PRODUCT CARDS ANIMATION

const productCards = document.querySelectorAll('.product-card');

if (productCards.length > 0) {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100); // Stagger animation
      }
    });
  }, observerOptions);

  // Set initial state and observe
  productCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    productObserver.observe(card);
  });
}


// PRODUCT CARD HOVER EFFECTS

productCards.forEach(card => {
  const productLink = card.querySelector('.product-link');
  const productCta = card.querySelector('.product-cta');

  if (productLink) {
    card.addEventListener('mouseenter', () => {
      if (productCta) {
        productCta.style.opacity = '1';
        productCta.style.transform = 'translateX(5px)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (productCta) {
        productCta.style.opacity = '0.7';
        productCta.style.transform = 'translateX(0)';
      }
    });
  }
});


// PRODUCT TRACKING

const productLinks = document.querySelectorAll('.product-link');

productLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const productCard = link.closest('.product-card');
    const productName = productCard?.querySelector('.product-title')?.textContent;
    const productCategory = productCard?.querySelector('.product-category')?.textContent;
    const productPrice = productCard?.querySelector('.product-price')?.textContent;

    if (productName) {
      console.log('Product clicked:', {
        name: productName,
        category: productCategory,
        price: productPrice,
        timestamp: new Date().toISOString()
      });
    }
  });
});


// PRODUCT DETAIL PAGE - ADD TO CART

const addToCartBtn = document.querySelector('.btn-primary');

if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    const productTitle = document.querySelector('.detail-title')?.textContent;
    const productPrice = document.querySelector('.detail-price')?.textContent;
    const productCategory = document.querySelector('.detail-category')?.textContent;

    // Visual feedback
    addToCartBtn.textContent = 'Added!';
    addToCartBtn.style.backgroundColor = 'var(--color-accent)';
    
    console.log('Added to cart:', {
      name: productTitle,
      price: productPrice,
      category: productCategory,
      timestamp: new Date().toISOString()
    });

    // Reset button after 2 seconds
    setTimeout(() => {
      addToCartBtn.textContent = 'Add to Cart';
      addToCartBtn.style.backgroundColor = '';
    }, 2000);
  });
}


// PRODUCT IMAGE PLACEHOLDER INTERACTION

const imagePlaceholders = document.querySelectorAll('.image-placeholder');

imagePlaceholders.forEach(placeholder => {
  placeholder.addEventListener('mouseenter', () => {
    placeholder.style.backgroundColor = '#e0e0e0';
  });

  placeholder.addEventListener('mouseleave', () => {
    placeholder.style.backgroundColor = '';
  });
});


// SMOOTH SCROLL TO TOP (Back to Products)

const backButtons = document.querySelectorAll('.btn-secondary');

backButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Let the default navigation happen, but add smooth scroll behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});


// PRODUCT DETAIL PAGE - IMAGE ZOOM EFFECT

const detailImage = document.querySelector('.product-detail-image');

if (detailImage) {
  const imageElement = detailImage.querySelector('.image-placeholder');
  
  if (imageElement) {
    detailImage.addEventListener('mouseenter', () => {
      imageElement.style.transform = 'scale(1.05)';
      imageElement.style.transition = 'transform 0.5s ease';
    });

    detailImage.addEventListener('mouseleave', () => {
      imageElement.style.transform = 'scale(1)';
    });
  }
}


// BADGE ANIMATION

const badges = document.querySelectorAll('.product-badge, .detail-badge');

badges.forEach(badge => {
  badge.style.animation = 'pulse 2s ease-in-out infinite';
});



// PRODUCT COUNT LOGGER

if (productCards.length > 0) {
  console.log(`%c${productCards.length} products loaded`, 'color: #2c2c2c; font-weight: 600;');
}


// KEYBOARD NAVIGATION FOR PRODUCTS

let currentProductIndex = -1;

document.addEventListener('keydown', (e) => {
  // Only on products page
  if (!document.querySelector('.products-grid')) return;

  if (e.key === 'ArrowRight') {
    e.preventDefault();
    currentProductIndex = Math.min(currentProductIndex + 1, productCards.length - 1);
    focusProduct(currentProductIndex);
  } else if (e.key === 'ArrowLeft') {
    e.preventDefault();
    currentProductIndex = Math.max(currentProductIndex - 1, 0);
    focusProduct(currentProductIndex);
  } else if (e.key === 'Enter' && currentProductIndex >= 0) {
    const link = productCards[currentProductIndex]?.querySelector('.product-link');
    if (link) link.click();
  }
});

function focusProduct(index) {
  if (productCards[index]) {
    productCards.forEach(card => card.style.outline = 'none');
    productCards[index].style.outline = '2px solid var(--color-primary)';
    productCards[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}


// RESPONSIVE GRID ADJUSTMENT

function adjustProductGrid() {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  const width = window.innerWidth;
  
  if (width <= 480) {
    console.log('Mobile view: 1 column');
  } else if (width <= 768) {
    console.log('Tablet view: 2 columns');
  } else if (width <= 1024) {
    console.log('Desktop view: 3 columns');
  } else {
    console.log('Large desktop view: 4 columns');
  }
}

window.addEventListener('resize', debounce(adjustProductGrid, 200));
adjustProductGrid();


// UTILITY FUNCTIONS

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


// CONSOLE MESSAGE

console.log('%c✨ Products loaded successfully', 'color: #2c2c2c; font-size: 14px; font-weight: 500;');
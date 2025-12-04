// scripts/cart.js
// Shopping Cart Functionality (for future implementation)

let cart = [];
let cartCount = 0;

// Initialize cart display
function initCart() {
  const cartDisplay = document.getElementById('cart-count');
  const addToCartButtons = document.querySelectorAll('.add-to-cart, .btn-add-cart');
  
  if (cartDisplay) {
    cartDisplay.textContent = cartCount;
  }
  
  if (addToCartButtons.length > 0) {
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Find product details
        const productCard = button.closest('[style*="border-radius"]');
        let productName = 'Product';
        let productPrice = '0';
        
        if (productCard) {
          const nameElement = productCard.querySelector('h3');
          const priceElement = productCard.querySelector('[style*="font-weight: 700"]');
          
          if (nameElement) productName = nameElement.textContent;
          if (priceElement) productPrice = priceElement.textContent;
        }
        
        // Add to cart
        cart.push({
          name: productName,
          price: productPrice,
          quantity: 1,
          addedAt: new Date().toLocaleTimeString()
        });
        
        cartCount++;
        
        // Update display
        if (cartDisplay) {
          cartDisplay.textContent = cartCount;
          cartDisplay.style.animation = 'pulse 0.3s';
          setTimeout(() => {
            cartDisplay.style.animation = '';
          }, 300);
        }
        
        // Visual feedback
        button.textContent = '✓ Added!';
        button.style.backgroundColor = '#088178';
        
        setTimeout(() => {
          button.textContent = 'Add to Cart';
          button.style.backgroundColor = '';
        }, 2000);
        
        // Show notification
        showCartNotification(productName);
        
        console.log('Cart updated:', cart);
      });
    });
  }
}

// Show cart notification
function showCartNotification(productName) {
  const notification = document.createElement('div');
  notification.textContent = `✓ ${productName} added to cart!`;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #088178;
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }
`;
document.head.appendChild(notificationStyle);

// Initialize cart when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCart);
} else {
  initCart();
}

console.log('Cart system initialized');
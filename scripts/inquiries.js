// TRENDIFY - INQUIRIES PAGE JAVASCRIPT

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================

const inquiryForm = document.querySelector('.form-section form, form');

if (inquiryForm) {
  inquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const inputs = inquiryForm.querySelectorAll('input, textarea');
    let formData = {};
    let isValid = true;
    let emptyFields = [];
    
    // Validate fields
    inputs.forEach(input => {
      const value = input.value.trim();
      const fieldName = input.placeholder || input.name || 'Field';
      
      if (!value) {
        isValid = false;
        emptyFields.push(fieldName);
        input.style.border = '2px solid #dc2626';
        
        // Shake animation
        input.style.animation = 'shake 0.3s';
        setTimeout(() => {
          input.style.animation = '';
        }, 300);
      } else {
        formData[fieldName] = value;
        input.style.border = '1px solid var(--color-border)';
      }
    });
    
    // Email validation
    const emailInput = inquiryForm.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        isValid = false;
        emailInput.style.border = '2px solid #dc2626';
        alert('⚠️ Please enter a valid email address.');
        return;
      }
    }
    
    if (!isValid) {
      alert(`⚠️ INCOMPLETE FORM\n\nPlease fill in the following fields:\n\n• ${emptyFields.join('\n• ')}`);
      const firstEmpty = inquiryForm.querySelector('input[style*="rgb(220, 38, 38)"]');
      if (firstEmpty) firstEmpty.focus();
      return;
    }
    
    // Success message
    let summary = '✓ INQUIRY SUBMITTED SUCCESSFULLY!\n\n';
    summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    summary += 'Your Inquiry Details:\n';
    summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    
    for (let field in formData) {
      summary += `${field}:\n${formData[field]}\n\n`;
    }
    
    summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    summary += 'Reference: #TRF' + Date.now().toString().slice(-6) + '\n';
    summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
    summary += 'We will respond within 24 hours.\n';
    summary += 'Thank you for choosing Trendify!';
    
    alert(summary);
    
    // Reset form
    inquiryForm.reset();
    
    // Visual feedback
    const submitBtn = inquiryForm.querySelector('.submit, button[type="submit"]');
    if (submitBtn) {
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '✓ Inquiry Sent!';
      submitBtn.style.backgroundColor = 'var(--color-accent)';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.backgroundColor = '';
        submitBtn.disabled = false;
      }, 4000);
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Real-time validation
  const inputs = inquiryForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.style.border = '1px solid var(--color-primary)';
      } else {
        input.style.border = '1px solid var(--color-border)';
      }
    });
    
    input.addEventListener('focus', () => {
      input.style.boxShadow = '0 0 0 3px rgba(44, 44, 44, 0.1)';
    });
    
    input.addEventListener('blur', () => {
      input.style.boxShadow = 'none';
    });
  });
}

// ========================================
// ANIMATIONS
// ========================================

// Add shake animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
`;
document.head.appendChild(style);

// Animate location items
const locationItems = document.querySelectorAll('.location-item');

if (locationItems.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  locationItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });
}

// ========================================
// MAP INTERACTION
// ========================================

const inquiryMap = document.querySelector('.inquiry-map');

if (inquiryMap) {
  const iframe = inquiryMap.querySelector('iframe');
  
  if (iframe) {
    inquiryMap.addEventListener('click', () => {
      console.log('Map clicked - Opening in new window');
    });
  }
}

console.log('%c✨ Inquiries page loaded', 'color: #2c2c2c; font-size: 14px; font-weight: 500;');
// TRENDIFY - EVENTS PAGE JAVASCRIPT

// ========================================
// EVENT REMINDER FUNCTIONALITY
// ========================================

const reminderBtn = document.getElementById('reminderBtn');

if (reminderBtn) {
  reminderBtn.addEventListener('click', function () {
    const eventCards = document.querySelectorAll('.event-card');
    
    if (eventCards.length > 0) {
      let eventsList = '✓ EVENT REMINDERS SET!\n\n';
      eventsList += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      eventsList += 'UPCOMING EVENTS:\n';
      eventsList += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n';
      
      eventCards.forEach((card, index) => {
        const title = card.querySelector('.event-title')?.textContent || 'Event';
        const day = card.querySelector('.date-day')?.textContent || '';
        const month = card.querySelector('.date-month')?.textContent || '';
        const year = card.querySelector('.date-year')?.textContent || '';
        
        eventsList += `${index + 1}. ${title}\n`;
        eventsList += `   Date: ${month} ${day}, ${year}\n\n`;
      });
      
      eventsList += '━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      eventsList += 'You will be notified before each event.';
      
      alert(eventsList);
    } else {
      alert('✓ Reminder Added!\n\nYou will be notified about upcoming Trendify events.');
    }
    
    // Visual feedback
    const originalText = reminderBtn.textContent;
    reminderBtn.textContent = '✓ Reminders Set!';
    reminderBtn.style.backgroundColor = 'var(--color-accent)';
    reminderBtn.disabled = true;
    
    setTimeout(() => {
      reminderBtn.textContent = originalText;
      reminderBtn.style.backgroundColor = '';
      reminderBtn.disabled = false;
    }, 3000);
  });
}

// ========================================
// EVENT CARD ANIMATIONS
// ========================================

const eventCards = document.querySelectorAll('.event-card');

if (eventCards.length > 0) {
  // Add base styles if not present
  eventCards.forEach(card => {
    if (!card.style.transition) {
      card.style.transition = 'all 0.3s ease';
    }
    if (!card.style.boxShadow) {
      card.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
    }
  });
  // Scroll animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const eventObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
      }
    });
  }, observerOptions);

  eventCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    eventObserver.observe(card);
  });

  // Click to show event details
  eventCards.forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('.event-title')?.textContent;
      const description = this.querySelector('.event-description')?.textContent;
      const day = this.querySelector('.date-day')?.textContent;
      const month = this.querySelector('.date-month')?.textContent;
      const year = this.querySelector('.date-year')?.textContent;
      
      console.log('Event clicked:', { title, date: `${month} ${day}, ${year}` });
    });
  });
  
  console.log(`%c${eventCards.length} events loaded`, 'color: #2c2c2c; font-weight: 600;');
}

// ========================================
// DATE COUNTER ANIMATION
// ========================================

const eventDates = document.querySelectorAll('.event-date');

eventDates.forEach(date => {
  date.addEventListener('mouseenter', () => {
    date.style.transform = 'scale(1.05)';
    date.style.transition = 'transform 0.3s ease';
  });

  date.addEventListener('mouseleave', () => {
    date.style.transform = 'scale(1)';
  });
});

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c✨ Events page loaded', 'color: #2c2c2c; font-size: 14px; font-weight: 500;');
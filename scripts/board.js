// TRENDIFY - BOARD OF TRUSTEES JAVASCRIPT

// ========================================
// BOARD MEMBER INTERACTIONS
// ========================================

const boardMembers = document.querySelectorAll('.board-member');

if (boardMembers.length > 0) {
  boardMembers.forEach((member, index) => {
    // Add data attribute
    member.setAttribute('data-member-index', index);
    
    // Click interaction
    member.addEventListener('click', () => {
      const name = member.querySelector('.member-name')?.textContent;
      const role = member.querySelector('.member-role')?.textContent;
      const bio = member.querySelector('.member-bio')?.textContent;
      
      console.log('Board member selected:', { name, role });
      
      // Optional: Show detailed modal or info
      // For now, just log to console
    });
  });
  
  console.log(`%c${boardMembers.length} board members loaded`, 'color: #2c2c2c; font-weight: 600;');
}

// ========================================
// SCROLL ANIMATION
// ========================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const boardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, observerOptions);

boardMembers.forEach(member => {
  member.style.opacity = '0';
  member.style.transform = 'translateY(20px)';
  member.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  boardObserver.observe(member);
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

let currentMemberIndex = -1;

document.addEventListener('keydown', (e) => {
  if (!document.querySelector('.board-grid')) return;

  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
    e.preventDefault();
    currentMemberIndex = Math.min(currentMemberIndex + 1, boardMembers.length - 1);
    focusMember(currentMemberIndex);
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault();
    currentMemberIndex = Math.max(currentMemberIndex - 1, 0);
    focusMember(currentMemberIndex);
  } else if (e.key === 'Enter' && currentMemberIndex >= 0) {
    boardMembers[currentMemberIndex]?.click();
  }
});

function focusMember(index) {
  if (boardMembers[index]) {
    boardMembers.forEach(member => member.style.outline = 'none');
    boardMembers[index].style.outline = '2px solid var(--color-primary)';
    boardMembers[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c✨ Board page loaded', 'color: #2c2c2c; font-size: 14px; font-weight: 500;');
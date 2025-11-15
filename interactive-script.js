// ===== Enhanced Interactive Portfolio Script =====

// ===== Smooth Scrolling for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetElement.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      const navMenu = document.getElementById('navMenu');
      const hamburger = document.getElementById('hamburger');
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
      
      // Prevent body scroll when menu is open (mobile)
      document.body.style.overflow = 'auto';
    }
  });
});

// ===== Mobile Menu Toggle with Enhanced UX =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Prevent body scroll when menu is open
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Close menu on ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Debounced scroll for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    updateActiveLink();
  });
});

// ===== Navbar Shadow on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Back to Top Button =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== Intersection Observer for Scroll Animations =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.classList.add('animated');
    }
  });
}, observerOptions);

// Observe various elements for animation
const animateElements = [
  ...document.querySelectorAll('.project-card'),
  ...document.querySelectorAll('.skill-category'),
  ...document.querySelectorAll('.detail-section'),
  ...document.querySelectorAll('.about-card-modern'),
  ...document.querySelectorAll('.contact-info-card'),
  ...document.querySelectorAll('.contact-form-card')
];

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  fadeInObserver.observe(el);
});

// ===== Enhanced Skill Items Interaction =====
document.querySelectorAll('.skill-item').forEach((item, index) => {
  // Staggered initial animation
  item.style.animationDelay = `${index * 0.05}s`;
  
  // Click effect
  item.addEventListener('click', function() {
    this.style.transform = 'scale(1.1)';
    setTimeout(() => {
      this.style.transform = '';
    }, 200);
  });
  
  // Tooltip on hover for mobile
  item.addEventListener('touchstart', function(e) {
    const skillName = this.querySelector('p').textContent;
    showTooltip(this, skillName);
  });
});

// ===== Enhanced Project Cards Interaction =====
document.querySelectorAll('.project-card').forEach((card, index) => {
  // Staggered animation delay
  card.style.transitionDelay = `${index * 0.1}s`;
  
  // Enhanced hover effect
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-12px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// ===== Contact Form Enhanced Validation =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Validate
  if (!data.name || !data.email || !data.message) {
    showFormMessage('Please fill in all required fields', 'error');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showFormMessage('Please enter a valid email address', 'error');
    return;
  }

  // Simulate form submission
  console.log('Form submitted:', data);
  
  // Show success message
  formSuccess.style.display = 'block';
  contactForm.reset();

  // Hide success message after 5 seconds
  setTimeout(() => {
    formSuccess.style.display = 'none';
  }, 5000);
});

// Form message helper
function showFormMessage(message, type) {
  const messageDiv = formSuccess;
  messageDiv.textContent = type === 'error' ? '❌ ' + message : '✅ ' + message;
  messageDiv.className = `form-message ${type}`;
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 4000);
}

// Real-time form validation
const formInputs = contactForm.querySelectorAll('input, textarea');
formInputs.forEach(input => {
  input.addEventListener('blur', function() {
    if (this.hasAttribute('required') && !this.value.trim()) {
      this.style.borderColor = '#ef4444';
    } else {
      this.style.borderColor = '#e0e0e0';
    }
  });
  
  input.addEventListener('focus', function() {
    this.style.borderColor = '#667eea';
  });
});

// ===== Tech Icons Enhanced Tooltip =====
const techIcons = document.querySelectorAll('.tech-icon');

techIcons.forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    const techName = this.getAttribute('data-tech');
    if (techName) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tech-tooltip';
      tooltip.textContent = techName;
      tooltip.style.cssText = `
        position: absolute;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%) scale(0.8);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 0.85rem;
        font-weight: 600;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      this.style.position = 'relative';
      this.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.style.opacity = '1';
        tooltip.style.transform = 'translateX(-50%) scale(1)';
      }, 10);
    }
  });

  icon.addEventListener('mouseleave', function() {
    const tooltip = this.querySelector('.tech-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateX(-50%) scale(0.8)';
      setTimeout(() => tooltip.remove(), 300);
    }
  });
});

// ===== Reduced Motion for Accessibility =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  document.querySelectorAll('*').forEach(el => {
    el.style.animation = 'none';
    el.style.transition = 'none';
  });
}

// ===== Responsive Font Size Adjustment =====
function adjustFontSizes() {
  const width = window.innerWidth;
  const root = document.documentElement;
  
  if (width < 480) {
    root.style.fontSize = '14px';
  } else if (width < 768) {
    root.style.fontSize = '15px';
  } else {
    root.style.fontSize = '16px';
  }
}

window.addEventListener('resize', debounce(adjustFontSizes, 250));
adjustFontSizes();

// ===== Utility: Debounce Function =====
function debounce(func, wait) {
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

// ===== Tooltip Helper Function =====
function showTooltip(element, text) {
  const existing = element.querySelector('.mobile-tooltip');
  if (existing) return;
  
  const tooltip = document.createElement('div');
  tooltip.className = 'mobile-tooltip';
  tooltip.textContent = text;
  tooltip.style.cssText = `
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: #1e293b;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.875rem;
    white-space: nowrap;
    z-index: 1000;
  `;
  element.style.position = 'relative';
  element.appendChild(tooltip);
  
  setTimeout(() => tooltip.remove(), 2000);
}

// ===== Lazy Loading for Images =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== Keyboard Navigation Enhancement =====
document.addEventListener('keydown', (e) => {
  // Navigate sections with arrow keys (Alt + Arrow)
  if (e.altKey) {
    const currentSection = Array.from(sections).find(section => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 100 && rect.bottom >= 100;
    });
    
    if (currentSection) {
      const currentIndex = Array.from(sections).indexOf(currentSection);
      let nextSection;
      
      if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
        nextSection = sections[currentIndex + 1];
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        nextSection = sections[currentIndex - 1];
      }
      
      if (nextSection) {
        e.preventDefault();
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
});

// ===== Performance Monitoring =====
if ('PerformanceObserver' in window) {
  const perfObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.duration > 100) {
        console.warn(`Long task detected: ${entry.name} (${entry.duration.toFixed(2)}ms)`);
      }
    });
  });
  
  try {
    perfObserver.observe({ entryTypes: ['measure', 'longtask'] });
  } catch (e) {
    // Longtask not supported in all browsers
  }
}

// ===== Console Welcome Message =====
console.log('%c👋 Welcome to Ankita\'s Portfolio!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%c🚀 Built with HTML, CSS & JavaScript', 'font-size: 14px; color: #764ba2;');
console.log('%c💼 Full-Stack Developer | MERN Stack', 'font-size: 12px; color: #666;');
console.log('%c📧 Contact: ankitakolekar@gmail.com', 'font-size: 11px; color: #999;');

// ===== Resume Download Functionality =====
function downloadResume() {
  // Google Drive link - Extract file ID and convert to direct download link
  const googleDriveLink = 'https://drive.google.com/file/d/1mQsFi6SLc5CcW5IIb5jMJ9AoDXR1DCzs/view?usp=sharing';
  
  // Extract file ID from Google Drive link
  let resumeUrl = googleDriveLink;
  
  if (googleDriveLink.includes('drive.google.com')) {
    const fileIdMatch = googleDriveLink.match(/\/d\/([^\/]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      // Convert to direct download link
      resumeUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    }
  }
  
  // Open resume in new tab
  window.open(resumeUrl, '_blank');
  showNotification('✅ Opening resume!');
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.textContent = message;
  
  const bgColor = type === 'warning' 
    ? 'linear-gradient(135deg, #f59e0b, #ef4444)' 
    : 'linear-gradient(135deg, #667eea, #764ba2)';
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    z-index: 10000;
    font-weight: 600;
    animation: slideInRight 0.4s ease, fadeOut 0.4s ease 2.6s;
    max-width: 350px;
    line-height: 1.5;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ===== Initialize on Page Load =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ Interactive Portfolio Loaded Successfully!');
  updateActiveLink();
  
  // Add loaded class to body for CSS animations
  document.body.classList.add('loaded');
  
  // Initialize all components
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
  
  // Add event listeners to download resume buttons
  const downloadBtns = document.querySelectorAll('#downloadResumeBtn, #downloadResumeHero');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadResume();
    });
  });
});

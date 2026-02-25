/**
 * Premium Portfolio JavaScript
 * Custom cursor, smooth animations, and interactive elements
 */

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Portfolio Loading...");
  
  // Initialize all modules
  initCustomCursor();
  initNavigation();
  initSmoothScrolling();
  initScrollAnimations();
  initParallaxEffects();
  initMagneticButtons();
  initGlobalParticleSystem();
  initAboutSnowParticles();
  initAboutSectionParticles();
  initInternshipSnowParticles();
  initAnimeQuoteInteraction();
  initInteractiveProjectCards();
  initProjectSectionEnhancements();
  
  console.log("✨ Portfolio Initialized Successfully!");
});

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');
  
  if (!cursor) return;
  
  let mouseX = 0, mouseY = 0;
  
  // Track mouse movement
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update both dot and ring immediately for synchronized movement
    cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    cursorRing.style.transform = `translate(${mouseX - 16}px, ${mouseY - 16}px)`;
  });
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-ring');
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
  
  // Hide cursor on mobile
  if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
  }
}

// ===== NAVIGATION =====
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!navToggle || !navMenu) return;
  
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    rootMargin: '-50% 0px -50% 0px'
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => sectionObserver.observe(section));
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start', 
          inline: 'nearest' 
        });
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  // Intersection Observer for fade-in animations
  const animatedElements = document.querySelectorAll(`
    .about-intro,
    .highlight-item,
    .skills-category,
    .project-card,
    .timeline-item,
    .contact-intro,
    .contact-link
  `);
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Set initial state and observe
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(element);
  });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll('.hero-container, .bg-gradient');
  
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.classList.contains('hero-container') ? 0.5 : 0.2;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick);
}

// ===== MAGNETIC BUTTONS =====
function initMagneticButtons() {
  const magneticButtons = document.querySelectorAll('.magnetic-btn');
  
  magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 100;
      
      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const moveX = x * strength * 0.3;
        const moveY = y * strength * 0.3;
        
        button.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

// ===== GLOBAL PARTICLE SYSTEM =====
function initGlobalParticleSystem() {
  // Create particle container for the entire body
  const particleContainer = document.createElement('div');
  particleContainer.className = 'global-particles';
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  
  document.body.appendChild(particleContainer);
  
  // Create particles with random properties
  const particleCount = 120;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 0.5;
    const duration = Math.random() * 25 + 10;
    const delay = Math.random() * 10;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, transparent 70%);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: global-particle-${i} ${duration}s ${delay}s linear infinite;
      pointer-events: none;
    `;
    
    particleContainer.appendChild(particle);
    
    // Store particle data for animation
    particles.push({
      element: particle,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      endX: Math.random() * 100,
      endY: Math.random() * 100,
      duration: duration,
      delay: delay
    });
    
    // Create unique animation for each particle
    createParticleAnimation(i, particles[i]);
  }
  
  // Add CSS animations for all particles
  const style = document.createElement('style');
  style.textContent = generateParticleCSS(particleCount);
  document.head.appendChild(style);
}

function createParticleAnimation(index, particle) {
  const keyframes = `
    @keyframes global-particle-${index} {
      0% {
        transform: translate(${particle.startX}vw, ${particle.startY}vh) scale(0);
        opacity: 0;
      }
      10% {
        transform: translate(${particle.startX + (Math.random() - 0.5) * 20}vw, ${particle.startY + (Math.random() - 0.5) * 20}vh) scale(1);
        opacity: 0.8;
      }
      50% {
        transform: translate(${particle.startX + (Math.random() - 0.5) * 40}vw, ${particle.startY + (Math.random() - 0.5) * 40}vh) scale(1.2);
        opacity: 0.4;
      }
      90% {
        transform: translate(${particle.endX}vw, ${particle.endY}vh) scale(0.8);
        opacity: 0.6;
      }
      100% {
        transform: translate(${particle.endX + (Math.random() - 0.5) * 20}vw, ${particle.endY + (Math.random() - 0.5) * 20}vh) scale(0);
        opacity: 0;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = keyframes;
  document.head.appendChild(style);
}

function generateParticleCSS(count) {
  let css = '';
  for (let i = 0; i < count; i++) {
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    const midX = Math.random() * 100;
    const midY = Math.random() * 100;
    const endX = Math.random() * 100;
    const endY = Math.random() * 100;
    
    css += `
      @keyframes global-particle-${i} {
        0% {
          transform: translate(${startX}vw, ${startY}vh) scale(0);
          opacity: 0;
        }
        15% {
          transform: translate(${startX + (midX - startX) * 0.3}vw, ${startY + (midY - startY) * 0.3}vh) scale(1);
          opacity: 0.6;
        }
        40% {
          transform: translate(${midX}vw, ${midY}vh) scale(1.1);
          opacity: 0.4;
        }
        65% {
          transform: translate(${midX + (endX - midX) * 0.5}vw, ${midY + (endY - midY) * 0.5}vh) scale(0.9);
          opacity: 0.3;
        }
        85% {
          transform: translate(${endX}vw, ${endY}vh) scale(0.5);
          opacity: 0.5;
        }
        100% {
          transform: translate(${endX}vw, ${endY}vh) scale(0);
          opacity: 0;
        }
      }
    `;
  }
  return css;
}
// ===== ABOUT SECTION SNOW PARTICLES =====
function initAboutSnowParticles() {
  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;
  
  // Create snow particle container
  const snowContainer = document.createElement('div');
  snowContainer.className = 'about-snow-particles';
  snowContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  
  aboutSection.appendChild(snowContainer);
  
  // Create snow particles
  const snowCount = 40;
  
  for (let i = 0; i < snowCount; i++) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snow-particle';
    
    // Random properties
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    const startX = Math.random() * 100;
    const endX = Math.random() * 100;
    const opacity = Math.random() * 0.6 + 0.4;
    
    snowflake.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 50%, transparent 70%);
      border-radius: 50%;
      left: ${startX}%;
      top: -10px;
      opacity: ${opacity};
      animation: snowfall-${i} ${duration}s ${delay}s linear infinite;
      pointer-events: none;
    `;
    
    snowContainer.appendChild(snowflake);
    
    // Create unique animation for each snowflake
    createSnowAnimation(i, startX, endX, duration);
  }
  
  // Add CSS animations for all snowflakes
  const style = document.createElement('style');
  style.textContent = generateSnowCSS(snowCount);
  document.head.appendChild(style);
}

function createSnowAnimation(index, startX, endX, duration) {
  const midX = startX + (endX - startX) * 0.5;
  const swayAmount = (Math.random() - 0.5) * 20;
  
  const keyframes = `
    @keyframes snowfall-${index} {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.8;
      }
      30% {
        transform: translate(${swayAmount}px, 30vh) rotate(120deg);
      }
      50% {
        transform: translate(${-swayAmount}px, 60vh) rotate(240deg);
      }
      70% {
        transform: translate(${swayAmount * 0.5}px, 90vh) rotate(360deg);
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translate(${(endX - startX) * 2}px, 110vh) rotate(480deg);
        opacity: 0;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = keyframes;
  document.head.appendChild(style);
}

function generateSnowCSS(count) {
  let css = '';
  for (let i = 0; i < count; i++) {
    const startX = Math.random() * 100;
    const endX = Math.random() * 100;
    const swayAmount = (Math.random() - 0.5) * 30;
    const duration = Math.random() * 15 + 10;
    
    css += `
      @keyframes snowfall-${i} {
        0% {
          transform: translate(0, 0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 0.7;
        }
        25% {
          transform: translate(${swayAmount}px, 25vh) rotate(90deg);
        }
        50% {
          transform: translate(${-swayAmount}px, 50vh) rotate(180deg);
        }
        75% {
          transform: translate(${swayAmount * 0.7}px, 75vh) rotate(270deg);
        }
        90% {
          opacity: 0.5;
        }
        100% {
          transform: translate(${(endX - startX) * 3}px, 110vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
  }
  return css;
}

// ===== ABOUT SECTION SNOW PARTICLES =====
function initAboutSnowParticles() {
  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;
  
  // Create snow particle container
  const snowContainer = document.createElement('div');
  snowContainer.className = 'about-snow-particles';
  snowContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;
  
  aboutSection.appendChild(snowContainer);
  
  // Create snow particles
  const particleCount = 80;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 15 + 8;
    const delay = Math.random() * 10;
    const startX = Math.random() * 100;
    const endX = (Math.random() - 0.5) * 100;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 70%);
      border-radius: 50%;
      left: ${startX}%;
      top: -10px;
      opacity: 0;
      animation: snow-fall-${i} ${duration}s ${delay}s linear infinite;
      pointer-events: none;
    `;
    
    snowContainer.appendChild(particle);
    
    // Create unique animation for each particle
    createSnowAnimation(i, startX, endX, duration);
  }
  
  // Add CSS animations for all snow particles
  const style = document.createElement('style');
  style.textContent = generateSnowCSS(particleCount);
  document.head.appendChild(style);
}

function createSnowAnimation(index, startX, endX, duration) {
  const keyframes = `
    @keyframes snow-fall-${index} {
      0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
      }
      10% {
        transform: translate(${(Math.random() - 0.5) * 20}px, 10vh) scale(1);
        opacity: 0.8;
      }
      30% {
        transform: translate(${(Math.random() - 0.5) * 40}px, 30vh) scale(1.1);
        opacity: 0.6;
      }
      60% {
        transform: translate(${(Math.random() - 0.5) * 60}px, 60vh) scale(0.9);
        opacity: 0.4;
      }
      90% {
        transform: translate(${endX}px, 90vh) scale(0.7);
        opacity: 0.2;
      }
      100% {
        transform: translate(${endX + (Math.random() - 0.5) * 30}px, 110vh) scale(0);
        opacity: 0;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = keyframes;
  document.head.appendChild(style);
}

function generateSnowCSS(count) {
  let css = '';
  for (let i = 0; i < count; i++) {
    const startX = Math.random() * 100;
    const endX = (Math.random() - 0.5) * 100;
    const duration = Math.random() * 15 + 8;
    
    css += `
      @keyframes snow-fall-${i} {
        0% {
          transform: translate(0, 0) scale(0);
          opacity: 0;
        }
        10% {
          transform: translate(${(Math.random() - 0.5) * 20}px, 10vh) scale(1);
          opacity: 0.7;
        }
        25% {
          transform: translate(${(Math.random() - 0.5) * 35}px, 25vh) scale(1.2);
          opacity: 0.6;
        }
        45% {
          transform: translate(${(Math.random() - 0.5) * 50}px, 45vh) scale(1);
          opacity: 0.5;
        }
        70% {
          transform: translate(${(Math.random() - 0.5) * 65}px, 70vh) scale(0.8);
          opacity: 0.3;
        }
        90% {
          transform: translate(${(Math.random() - 0.5) * 80}px, 90vh) scale(0.5);
          opacity: 0.1;
        }
        100% {
          transform: translate(${(Math.random() - 0.5) * 100}px, 110vh) scale(0);
          opacity: 0;
        }
      }
    `;
  }
  return css;
}

// ===== INTERNSHIP SECTION SNOW PARTICLES =====
function initInternshipSnowParticles() {
  const internshipSection = document.querySelector('.internship');
  if (!internshipSection) return;
  
  // Create snow particle container
  const snowContainer = document.createElement('div');
  snowContainer.className = 'internship-snow-particles';
  snowContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
    overflow: hidden;
  `;
  
  internshipSection.appendChild(snowContainer);
  
  // Create snow particles
  const particleCount = 60;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 15 + 8;
    const delay = Math.random() * 10;
    const startX = Math.random() * 100;
    const endX = (Math.random() - 0.5) * 100;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, transparent 70%);
      border-radius: 50%;
      left: ${startX}%;
      top: -10px;
      opacity: 0;
      animation: internship-snow-fall-${i} ${duration}s ${delay}s linear infinite;
      pointer-events: none;
    `;
    
    snowContainer.appendChild(particle);
    
    // Create unique animation for each particle
    createInternshipSnowAnimation(i, startX, endX, duration);
  }
  
  // Add CSS animations for all snow particles
  const style = document.createElement('style');
  style.textContent = generateInternshipSnowCSS(particleCount);
  document.head.appendChild(style);
}

function createInternshipSnowAnimation(index, startX, endX, duration) {
  const keyframes = `
    @keyframes internship-snow-fall-${index} {
      0% {
        transform: translate(0, 0) scale(0);
        opacity: 0;
      }
      10% {
        transform: translate(${(Math.random() - 0.5) * 20}px, 10vh) scale(1);
        opacity: 0.8;
      }
      30% {
        transform: translate(${(Math.random() - 0.5) * 40}px, 30vh) scale(1.1);
        opacity: 0.6;
      }
      60% {
        transform: translate(${(Math.random() - 0.5) * 60}px, 60vh) scale(0.9);
        opacity: 0.4;
      }
      90% {
        transform: translate(${endX}px, 90vh) scale(0.7);
        opacity: 0.2;
      }
      100% {
        transform: translate(${endX + (Math.random() - 0.5) * 30}px, 110vh) scale(0);
        opacity: 0;
      }
    }
  `;
  
  const style = document.createElement('style');
  style.textContent = keyframes;
  document.head.appendChild(style);
}

function generateInternshipSnowCSS(count) {
  let css = '';
  for (let i = 0; i < count; i++) {
    const startX = Math.random() * 100;
    const endX = (Math.random() - 0.5) * 100;
    const duration = Math.random() * 15 + 8;
    
    css += `
      @keyframes internship-snow-fall-${i} {
        0% {
          transform: translate(0, 0) scale(0);
          opacity: 0;
        }
        10% {
          transform: translate(${(Math.random() - 0.5) * 20}px, 10vh) scale(1);
          opacity: 0.7;
        }
        25% {
          transform: translate(${(Math.random() - 0.5) * 35}px, 25vh) scale(1.2);
          opacity: 0.6;
        }
        45% {
          transform: translate(${(Math.random() - 0.5) * 50}px, 45vh) scale(1);
          opacity: 0.5;
        }
        70% {
          transform: translate(${(Math.random() - 0.5) * 65}px, 70vh) scale(0.8);
          opacity: 0.3;
        }
        90% {
          transform: translate(${(Math.random() - 0.5) * 80}px, 90vh) scale(0.5);
          opacity: 0.1;
        }
        100% {
          transform: translate(${(Math.random() - 0.5) * 100}px, 110vh) scale(0);
          opacity: 0;
        }
      }
    `;
  }
  return css;
}

// ===== ABOUT SECTION PARTICLES =====
function initAboutSectionParticles() {
  const aboutSection = document.querySelector('.about');
  if (!aboutSection) return;
  
  // Create additional floating elements for about section
  const particleContainer = document.createElement('div');
  particleContainer.className = 'about-particles';
  particleContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;
  `;
  
  aboutSection.appendChild(particleContainer);
  
  // Create special about section particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.8) 0%, transparent 70%);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: about-particle-float ${duration}s ${delay}s ease-in-out infinite;
      pointer-events: none;
    `;
    
    particleContainer.appendChild(particle);
  }
  
  // Add CSS animation for about particles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes about-particle-float {
      0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      50% {
        transform: translateY(-50px) translateX(20px) scale(1.5);
        opacity: 0.8;
      }
      90% {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

// ===== ANIME-STYLE QUOTE INTERACTION =====
function initAnimeQuoteInteraction() {
  const quoteShowcase = document.querySelector('.quote-showcase');
  if (!quoteShowcase) return;
  
  // Create particle container
  const particleContainer = document.createElement('div');
  particleContainer.className = 'anime-particles';
  quoteShowcase.appendChild(particleContainer);
  
  // Mouse tracking for gradient effects
  quoteShowcase.addEventListener('mousemove', (e) => {
    const rect = quoteShowcase.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    // Update CSS custom properties for gradient position
    quoteShowcase.style.setProperty('--mouse-x', `${percentX}%`);
    quoteShowcase.style.setProperty('--mouse-y', `${percentY}%`);
  });
  
  // Create anime particles on hover
  let particleInterval;
  
  quoteShowcase.addEventListener('mouseenter', () => {
    particleInterval = setInterval(() => {
      createAnimeParticle(particleContainer);
    }, 200);
  });
  
  quoteShowcase.addEventListener('mouseleave', () => {
    clearInterval(particleInterval);
    // Reset mouse position
    quoteShowcase.style.setProperty('--mouse-x', '50%');
    quoteShowcase.style.setProperty('--mouse-y', '50%');
  });
  
  function createAnimeParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'anime-particle';
    
    // Random starting position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    // Random end position
    const endX = (Math.random() - 0.5) * 100;
    const endY = (Math.random() - 0.5) * 100;
    
    // Random color
    const colors = ['rgba(0, 212, 255, 0.8)', 'rgba(0, 255, 136, 0.8)', 'rgba(138, 43, 226, 0.8)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
      left: ${startX}%;
      top: ${startY}%;
      background: radial-gradient(circle, ${color} 0%, transparent 70%);
      --end-x: ${endX}px;
      --end-y: ${endY}px;
      animation: anime-particle-float ${Math.random() * 2 + 1}s ease-out forwards;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
    }, 3000);
  }
  
  // Add click effect
  quoteShowcase.addEventListener('click', (e) => {
    createAnimeBurst(e, particleContainer);
  });
}

function createAnimeBurst(e, container) {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  // Create burst of particles
  for (let i = 0; i < 12; i++) {
    const particle = document.createElement('div');
    particle.className = 'anime-particle';
    
    const angle = (i / 12) * Math.PI * 2;
    const distance = 50 + Math.random() * 50;
    const endX = Math.cos(angle) * distance;
    const endY = Math.sin(angle) * distance;
    
    particle.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: 4px;
      height: 4px;
      background: radial-gradient(circle, rgba(0, 212, 255, 1) 0%, transparent 70%);
      --end-x: ${endX}px;
      --end-y: ${endY}px;
      animation: anime-particle-float 0.8s ease-out forwards;
    `;
    
    container.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 800);
  }
}
function initInteractiveProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Mouse move effect for cursor tracking
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      
      // Update CSS custom properties for gradient position
      card.style.setProperty('--mouse-x', `${percentX}%`);
      card.style.setProperty('--mouse-y', `${percentY}%`);
    });
    
    // Reset on mouse leave
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '50%');
    });
  });
}

// ===== PROJECT SECTION ENHANCEMENTS =====
function initProjectSectionEnhancements() {
  const projectsSection = document.querySelector('.projects');
  if (!projectsSection) return;
  
  // Interactive background cursor tracking
  projectsSection.addEventListener('mousemove', (e) => {
    const rect = projectsSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;
    
    // Update CSS custom properties for background gradient
    projectsSection.style.setProperty('--cursor-x', `${percentX}%`);
    projectsSection.style.setProperty('--cursor-y', `${percentY}%`);
  });
  
  // Reset on mouse leave
  projectsSection.addEventListener('mouseleave', () => {
    projectsSection.style.setProperty('--cursor-x', '50%');
    projectsSection.style.setProperty('--cursor-y', '50%');
  });
  
  // Add subtle floating particles
  const particleContainer = document.createElement('div');
  particleContainer.className = 'projects-particles';
  particleContainer.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: -1;
  `;
  
  projectsSection.appendChild(particleContainer);
  
  // Create gentle floating particles
  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 10;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.4) 0%, transparent 70%);
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: gentle-float ${duration}s ${delay}s ease-in-out infinite;
      pointer-events: none;
    `;
    
    particleContainer.appendChild(particle);
  }
  
  // Add CSS for gentle floating animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gentle-float {
      0%, 100% {
        transform: translateY(0) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      50% {
        transform: translateY(-40px) translateX(10px);
        opacity: 0.3;
      }
      90% {
        opacity: 0.6;
      }
    }
  `;
  document.head.appendChild(style);
}
// Debounce function for performance
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

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
  // Scroll-based optimizations here
}, 16)); // ~60fps

// ===== LAZY LOADING =====
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
if (document.querySelectorAll('img[data-src]').length > 0) {
  initLazyLoading();
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.error('Portfolio Error:', e.error);
});

// ===== SERVICE WORKER (Optional for PWA) =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered'))
    //   .catch(error => console.log('SW registration failed'));
  });
}

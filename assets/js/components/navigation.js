/**
 * Navigation Component - v4.0
 * Clean & minimalist navigation with subtle GSAP animations
 */

export function initNavigation() {
  console.log('🎯 Initializing minimalist navigation...');

  // Cache DOM elements
  const navContainer = document.querySelector('.nav-container');
  const navBar = document.querySelector('.nav-bar');
  const navLogo = document.querySelector('.nav-logo');
  const navLinks = document.querySelectorAll('.nav-link');
  const navCta = document.querySelector('.nav-cta');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!navContainer || !mobileMenuBtn || !mobileMenu) {
    console.error('Required navigation elements not found');
    return;
  }

  // Simple entrance animation (no logo animation)
  gsap.fromTo(navBar, 
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
  );

  gsap.fromTo([...navLinks, navCta],
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, delay: 0.2, ease: "power2.out" }
  );

  // Scroll-based navbar transformations
  let lastScrollY = 0;

  const updateNavOnScroll = () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      navContainer.classList.add('nav-scrolled');
    } else {
      navContainer.classList.remove('nav-scrolled');
    }
    
    lastScrollY = scrollY;
  };

  // Throttled scroll listener
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        updateNavOnScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // Mobile menu state
  let mobileMenuOpen = false;

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const openMobileMenu = () => {
    mobileMenuOpen = true;
    mobileMenuBtn.classList.add('active');
    
    // Simple fade in
    gsap.to(mobileMenu, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.3,
      ease: "power2.out"
    });

    // Stagger mobile links
    gsap.fromTo(mobileLinks,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, delay: 0.1, ease: "power2.out" }
    );
  };

  const closeMobileMenu = () => {
    mobileMenuOpen = false;
    mobileMenuBtn.classList.remove('active');

    // Quick exit animation
    gsap.to(mobileLinks, {
      y: -10,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in"
    });

    gsap.to(mobileMenu, {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.3,
      delay: 0.1,
      ease: "power2.out"
    });
  };

  // Event listeners
  mobileMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close mobile menu when clicking links
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (mobileMenuOpen && 
        !mobileMenuBtn.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      closeMobileMenu();
    }
  });

  console.log('✅ Minimalist navigation initialized');
}

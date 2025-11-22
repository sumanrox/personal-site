/**
 * Navigation Component - v5.0
 * Elegant & minimalist navigation with pill-style hover animations
 */

export function initNavigation() {
  console.log('🎯 Initializing elegant navigation with pill animations...');

  // Cache DOM elements
  const navContainer = document.querySelector('.nav-container');
  const navBar = document.querySelector('.nav-bar');
  const navLogo = document.querySelector('.nav-logo');
  const navLinkItems = document.querySelectorAll('.nav-link-item');
  const navCta = document.querySelector('.nav-cta');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!navContainer || !mobileMenuBtn || !mobileMenu) {
    console.error('Required navigation elements not found');
    return;
  }

  // Elegant entrance animation
  gsap.fromTo(navBar, 
    { y: -30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
  );

  gsap.fromTo([...navLinkItems, navCta],
    { y: 10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.3, ease: "power2.out" }
  );

  // Pill-style hover animation for nav links
  navLinkItems.forEach(link => {
    const openBracket = link.querySelector('.nav-open-bracket');
    const closeBracket = link.querySelector('.nav-close-bracket');
    const text = link.querySelector('.nav-text');
    
    let hoverTimeline = null;

    link.addEventListener('mouseenter', () => {
      if (hoverTimeline) hoverTimeline.kill();
      
      hoverTimeline = gsap.timeline();
      
      // Step 1: Open bracket appears
      hoverTimeline.to(openBracket, {
        opacity: 1,
        duration: 0.15,
        ease: "power2.out"
      });
      
      // Step 2: Close bracket slides from left
      const textWidth = text.offsetWidth;
      hoverTimeline.fromTo(closeBracket, 
        { x: -(textWidth + 8), opacity: 1 },
        { x: 0, duration: 0.2, ease: "power2.out" },
        "-=0.1"
      );
      
      // Step 3: Text blinks rapidly
      hoverTimeline.to(text, {
        opacity: 0,
        duration: 0.03,
        repeat: 3,
        yoyo: true,
        ease: "power2.inOut"
      }, "-=0.15");
      
      // Ensure text stays visible
      hoverTimeline.set(text, { opacity: 1 });
    });

    link.addEventListener('mouseleave', () => {
      if (hoverTimeline) hoverTimeline.kill();
      
      hoverTimeline = gsap.timeline();
      
      // Reverse animation - fade out all elements
      hoverTimeline.to([openBracket, closeBracket], {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in"
      });
      
      hoverTimeline.set(closeBracket, { x: 0 });
      hoverTimeline.set(text, { opacity: 1 });
    });
  });

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

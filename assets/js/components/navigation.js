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
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu a'); // All links in mobile menu

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
    // Get scroll position from Locomotive Scroll if available
    let scrollY = 0;
    if (window.locomotiveScroll && window.locomotiveScroll.scroll) {
      scrollY = window.locomotiveScroll.scroll.instance.scroll.y || 0;
    } else {
      scrollY = window.scrollY || 0;
    }
    
    if (scrollY > 50) {
      navContainer.classList.add('nav-scrolled');
    } else {
      navContainer.classList.remove('nav-scrolled');
    }
    
    lastScrollY = scrollY;
  };

  // Throttled scroll listener
  let scrollTicking = false;
  
  // Listen to Locomotive Scroll if available
  if (window.locomotiveScroll) {
    window.locomotiveScroll.on('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateNavOnScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
  } else {
    // Fallback to window scroll
    window.addEventListener('scroll', () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateNavOnScroll();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
  }

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
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    
    // Animate hamburger to X
    const hamburgerLines = mobileMenuBtn.querySelectorAll('.hamburger-line');
    gsap.to(hamburgerLines[0], {
      rotation: 45,
      y: 5.5,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(hamburgerLines[1], {
      rotation: -45,
      y: -5.5,
      duration: 0.3,
      ease: "power2.out"
    });
    
    // Fade in menu
    gsap.to(mobileMenu, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.5,
      ease: "power2.out"
    });

    // Stagger mobile links
    gsap.fromTo(mobileLinks,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.2, ease: "power2.out" }
    );
    
    // Focus trap: focus first link
    if (mobileLinks.length > 0) {
      setTimeout(() => mobileLinks[0].focus(), 300);
    }
  };

  const closeMobileMenu = () => {
    mobileMenuOpen = false;
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';

    // Reset hamburger
    const hamburgerLines = mobileMenuBtn.querySelectorAll('.hamburger-line');
    gsap.to(hamburgerLines[0], {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.in"
    });
    gsap.to(hamburgerLines[1], {
      rotation: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.in"
    });

    // Quick exit animation
    gsap.to(mobileLinks, {
      x: -20,
      opacity: 0,
      duration: 0.3,
      stagger: 0.04,
      ease: "power2.in"
    });

    gsap.to(mobileMenu, {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.4,
      delay: 0.2,
      ease: "power2.out"
    });
  };

  // Event listeners
  mobileMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
  });

  // Close button
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  // Close mobile menu when clicking links
  mobileMenuLinks.forEach(link => {
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

  // Handle smooth scrolling for navigation links with Locomotive Scroll
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        if (target && window.locomotiveScroll) {
          // Close mobile menu if open
          if (mobileMenuOpen) {
            closeMobileMenu();
          }
          
          // Use Locomotive Scroll's scrollTo
          window.locomotiveScroll.scrollTo(target, {
            duration: 1000,
            easing: [0.25, 0.0, 0.35, 1.0]
          });
        } else if (target) {
          // Fallback for regular scroll
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  console.log('✅ Minimalist navigation initialized');
}

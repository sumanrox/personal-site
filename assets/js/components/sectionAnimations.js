/**
 * Section Animations Component - Ultra Fast
 * Instant fade-in and slide animations
 */

export function initSectionAnimations() {
  console.log('Initializing ultra-fast section animations');
  
  // Get the scroll container
  const scroller = document.querySelector('[data-scroll-container]');
  
  // Configure ScrollTrigger for Locomotive Scroll
  ScrollTrigger.defaults({
    scroller: scroller
  });
  
  // Main section fade-in with minimal delay
  const sections = gsap.utils.toArray('section');
  sections.forEach((section, index) => {
    // Skip hero section (already visible)
    if (section.id === 'hero-section') return;
    
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true, // Force GPU acceleration
      scrollTrigger: {
        trigger: section,
        start: 'top 95%',
        toggleActions: 'play none none none',
        fastScrollEnd: true, // Better handling of fast scrolling
        preventOverlaps: true
      }
    });
  });

  // Animate section headers instantly
  const sectionHeaders = gsap.utils.toArray('section h2, section > div > div > h2');
  sectionHeaders.forEach(header => {
    gsap.from(header, {
      opacity: 0,
      x: -20,
      duration: 0.4,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: header,
        start: 'top 95%',
        toggleActions: 'play none none none',
        fastScrollEnd: true
      }
    });
  });

  // Animate section paragraphs instantly (but exclude grid items)
  const sectionTexts = gsap.utils.toArray('section > div > div > p:not(.text-xs):not(.text-sm):not(#about-text):not(#work-text)');
  sectionTexts.forEach((text, index) => {
    // Skip if parent is a grid container
    if (text.parentElement.classList.contains('grid')) return;
    
    gsap.from(text, {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: text,
        start: 'top 95%',
        toggleActions: 'play none none none',
        fastScrollEnd: true
      }
    });
  });

  // Animate grid items with fast stagger (EXCLUDING the outer grid containers)
  const gridContainers = gsap.utils.toArray('.grid:not(.md\\:grid-cols-12)');
  gridContainers.forEach(container => {
    const items = container.children;
    
    gsap.from(items, {
      opacity: 0,
      y: 15,
      stagger: 0.04,
      duration: 0.4,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: container,
        start: 'top 95%',
        toggleActions: 'play none none none',
        fastScrollEnd: true
      }
    });
  });

  // Animate work cards instantly
  const workCards = gsap.utils.toArray('.tilt-card');
  workCards.forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 25,
      duration: 0.4,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: {
        trigger: card,
        start: 'top 95%',
        toggleActions: 'play none none none',
        fastScrollEnd: true
      }
    });
  });

  // Refresh ScrollTrigger on window resize (throttled for mobile performance)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
  
  // Refresh on orientation change (mobile/tablet)
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  });
  
  console.log('Ultra-fast section animations initialized');
}

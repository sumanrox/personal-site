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

    // Skip experience section (cards animate separately, no section fade)
    if (section.id === 'experience') return;

    // Section fade and slide animation with proper opacity handling
    gsap.fromTo(section,
      {
        opacity: 1, // Start fully visible to prevent white flashes
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
          fastScrollEnd: true,
          preventOverlaps: true
        }
      }
    );
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

  // Animate grid items with fast stagger (EXCLUDING the outer grid containers and manually excluded grids)
  const gridContainers = gsap.utils.toArray('.grid:not(.md\\:grid-cols-12):not(.no-auto-anim)');
  gridContainers.forEach(container => {
    // Skip if this grid is inside the experience section
    const inExperience = container.closest('#experience');
    if (inExperience) return;

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

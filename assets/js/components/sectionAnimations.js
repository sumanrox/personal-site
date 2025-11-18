/**
 * Section Animations Component - Ultra Fast
 * Instant fade-in and slide animations
 */

export function initSectionAnimations() {
  console.log('Initializing ultra-fast section animations');
  
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
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
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
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        once: true
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
      scrollTrigger: {
        trigger: text,
        start: 'top 88%',
        once: true
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
      scrollTrigger: {
        trigger: container,
        start: 'top 82%',
        once: true
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
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        once: true
      }
    });
  });

  // Refresh ScrollTrigger on window resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
  
  console.log('Ultra-fast section animations initialized');
}

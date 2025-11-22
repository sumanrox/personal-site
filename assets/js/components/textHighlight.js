/**
 * Text Highlight Animation Component
 * Handles character-by-character text reveal animation on scroll
 */

export function initTextHighlight() {
  // Configuration for animated sections
  const animatedSections = [
    {
      trigger: '#hero-section',
      elements: [
        { selector: '#hero-text-1' },
        { selector: '#hero-text-2' }
      ],
      delay: -0.4 // Start animation earlier for instant response
    },
    {
      trigger: '#about',
      elements: [{ selector: '#about-text' }],
      delay: -0.4,
      duration: 0.6,
      stagger: 0.02
    },
    {
      trigger: '#work',
      elements: [{ selector: '#work-text' }],
      delay: -0.4,
      duration: 0.6,
      stagger: 0.02,
      isPinned: true // Special flag for pinned sections
    },
    {
      trigger: '#contact',
      elements: [{ selector: '#contact-text' }],
      delay: -0.4,
      duration: 0.6,
      stagger: 0.02,
      isContactSection: true // Special flag for contact (white text on black)
    }
  ];

  // Store section animations for manual triggering
  const sectionAnimations = new Map();

  animatedSections.forEach(section => {
    // Collect all characters from all elements in this section
    const allSplits = [];
    const allChars = [];

    section.elements.forEach(config => {
      const element = document.querySelector(config.selector);
      if (!element) return;

      // Split by WORDS first, then CHARS - this keeps words intact
      const split = new SplitType(element, { types: 'words, chars' });
      if (split.chars && split.chars.length > 0) {
        allSplits.push(split);
        allChars.push(...split.chars); // Collect characters in order
      }
    });

    if (allChars.length === 0) return;

    // Set initial state for all characters
    // Contact section needs white text, others use light gray
    const initialColor = section.isContactSection ? '#9ca3af' : '#d4d4d4'; // gray-400 for contact
    const finalColor = section.isContactSection ? '#ffffff' : '#000000'; // white for contact, black for others
    
    gsap.set(allChars, { color: initialColor });

    // Store animation timeline for this section
    let fillAnimation = null;

    // Function to start animation
    const startAnimation = () => {
      // Kill any existing animation first
      if (fillAnimation) fillAnimation.kill();
      
      // Animate ALL characters in the section sequentially with fill effect
      fillAnimation = gsap.to(allChars, {
        color: finalColor, // White for contact, black for others
        duration: section.duration || 0.8, // Use section-specific duration
        stagger: {
          each: section.stagger || 0.025, // Use section-specific stagger
          from: 'start',
          ease: 'none'
        },
        ease: 'none',
        delay: section.delay
      });
    };

    // Function to reset animation
    const resetAnimation = () => {
      // Kill fill animation and reset
      if (fillAnimation) fillAnimation.kill();
      gsap.to(allChars, {
        color: initialColor, // Reset to appropriate initial color
        duration: 0.2,
        ease: 'power1.out',
        overwrite: 'auto'
      });
    };

    // Store for manual control
    sectionAnimations.set(section.trigger, { startAnimation, resetAnimation, allChars });

    // Special handling for pinned sections (like work section)
    const startPoint = section.isPinned ? 'top 90%' : 'top 75%';
    const endPoint = section.isPinned ? '300% 25%' : 'bottom 25%'; // Extended end for pinned sections

    // When section comes into view, auto-highlight ALL characters in hierarchical order
    ScrollTrigger.create({
      trigger: section.trigger,
      start: startPoint,
      end: endPoint,
      onEnter: startAnimation,
      onLeave: resetAnimation,
      onLeaveBack: resetAnimation,
      onEnterBack: startAnimation
    });
  });

  // Check if hero section is in view on scroll and manually trigger if needed
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // If we're at or near the top of the page
    if (currentScrollY < 100) {
      const heroAnimation = sectionAnimations.get('#hero-section');
      if (heroAnimation) {
        // Check if characters are not already animated (gray color)
        const firstChar = heroAnimation.allChars[0];
        if (firstChar) {
          const currentColor = window.getComputedStyle(firstChar).color;
          // rgb(212, 212, 212) is #d4d4d4 (gray)
          if (currentColor === 'rgb(212, 212, 212)' || currentColor === 'rgb(211, 211, 211)') {
            heroAnimation.startAnimation();
          }
        }
      }
    }
    
    lastScrollY = currentScrollY;
  }, { passive: true });
}

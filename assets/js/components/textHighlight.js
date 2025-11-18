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
      stagger: 0.02
    },
    {
      trigger: '#contact',
      elements: [{ selector: '#contact-text' }],
      delay: -0.4,
      duration: 0.6,
      stagger: 0.02
    }
  ];

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

    // Set initial state for all characters (light gray)
    gsap.set(allChars, { color: '#d4d4d4' });

    // Store animation timeline for this section
    let fillAnimation = null;

    // When section comes into view, auto-highlight ALL characters in hierarchical order
    ScrollTrigger.create({
      trigger: section.trigger,
      start: 'top 75%', // More conservative trigger point
      end: 'bottom 25%', // Wider range to prevent conflicts
      onEnter: () => {
        // Kill any existing animation first
        if (fillAnimation) fillAnimation.kill();
        
        // Animate ALL characters in the section sequentially with fill effect
        fillAnimation = gsap.to(allChars, {
          color: '#000000', // Black
          duration: section.duration || 0.8, // Use section-specific duration
          stagger: {
            each: section.stagger || 0.025, // Use section-specific stagger
            from: 'start',
            ease: 'none'
          },
          ease: 'none',
          delay: section.delay
        });
      },
      onLeave: () => {
        // Kill fill animation and reset instantly when leaving
        if (fillAnimation) fillAnimation.kill();
        gsap.to(allChars, {
          color: '#d4d4d4',
          duration: 0.2,
          ease: 'power1.out',
          overwrite: 'auto' // Prevent conflicts
        });
      },
      onLeaveBack: () => {
        // Kill fill animation and reset when scrolling back up
        if (fillAnimation) fillAnimation.kill();
        gsap.to(allChars, {
          color: '#d4d4d4',
          duration: 0.2,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      },
      onEnterBack: () => {
        // Kill any existing animation first
        if (fillAnimation) fillAnimation.kill();
        
        // Re-animate when scrolling back up into view
        fillAnimation = gsap.to(allChars, {
          color: '#000000',
          duration: section.duration || 0.8, // Use section-specific duration
          stagger: {
            each: section.stagger || 0.025, // Use section-specific stagger
            from: 'start',
            ease: 'none'
          },
          ease: 'none',
          delay: section.delay
        });
      }
    });
  });
}

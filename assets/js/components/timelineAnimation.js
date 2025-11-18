/**
 * Timeline Animation Component - Studio Grade (Ultra Fast)
 * Instant, snappy timeline animations
 */

export function initTimelineAnimation() {
  // Updated selectors for masonry grid layout
  const experienceCards = document.querySelectorAll('#experience .grid > div');
  
  if (!experienceCards.length) {
    console.warn('No experience cards found');
    return;
  }

  console.log(`Found ${experienceCards.length} experience cards`);

  // Set initial states for masonry grid cards
  gsap.set(experienceCards, {
    opacity: 0,
    y: 30,
    scale: 0.95
  });

  // Animate experience cards - ULTRA FAST
  experienceCards.forEach((card, index) => {
    // Single fast animation for entire card
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        delay: index * 0.1, // Stagger delay
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          once: true
        }
      }
    );

    // Special animation for hero card (first large card with stats)
    if (index === 0) {
      const statsGrid = card.querySelector('.grid.grid-cols-3');
      if (statsGrid) {
        const statsElements = statsGrid.querySelectorAll('div');
        gsap.fromTo(statsElements,
          {
            opacity: 0,
            y: 20
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.1,
            delay: 0.5 + (index * 0.1),
            ease: 'power1.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              once: true
            }
          }
        );
      }
    }

    // Animate icons and achievement elements
    const icons = card.querySelectorAll('[data-lucide]');
    const achievements = card.querySelectorAll('.space-y-2 > div, .flex.flex-wrap > span');
    
    if (icons.length > 0) {
      gsap.fromTo(icons,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          delay: 0.3 + (index * 0.1),
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true
          }
        }
      );
    }

    if (achievements.length > 0) {
      gsap.fromTo(achievements,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.25,
          stagger: 0.03,
          delay: 0.4 + (index * 0.1),
          ease: 'power1.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true
          }
        }
      );
    }
  });


  console.log('Ultra-fast masonry grid animation initialized');
}


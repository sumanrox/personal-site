/**
 * Timeline Animation Component - Disabled
 * Cards are now static without loading animations
 */

export function initTimelineAnimation() {
  const experienceCards = document.querySelectorAll('#experience .grid > div');

  if (!experienceCards.length) {
    console.warn('No experience cards found');
    return;
  }

  console.log(`Found ${experienceCards.length} experience cards - showing immediately without animation`);

  // Make all cards visible immediately without any animation
  experienceCards.forEach((card) => {
    gsap.set(card, {
      opacity: 1,
      y: 0,
      scale: 1
    });
  });

  console.log('Experience cards displayed immediately (no animations)');
}

/**
 * Tech Tags Animation Component - Ultra Fast
 * Instant stagger animation for tech stack tags
 */

export function initTechTags() {
  const techTags = document.querySelectorAll('.tech-tag');
  
  if (!techTags.length) {
    console.warn('No tech tags found');
    return;
  }

  // Ultra-fast stagger animation for tech tags
  gsap.fromTo(techTags,
    {
      opacity: 0,
      scale: 0.9,
      y: 10
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: techTags[0].parentElement,
        start: 'top 85%',
        once: true
      }
    }
  );

  console.log('Tech tags animation initialized (ultra-fast)');
}

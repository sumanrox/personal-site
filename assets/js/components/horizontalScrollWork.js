// Horizontal Scroll for Work Section (All Devices)
export function initHorizontalScrollWork() {
  const horizontalSection = document.querySelector('.horizontal-scroll-container');
  const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');
  
  if (horizontalSection && horizontalWrapper) {
    const scrollDistance = horizontalWrapper.scrollWidth - horizontalSection.offsetWidth;
    
    gsap.to(horizontalWrapper, {
      x: () => -scrollDistance,
      ease: 'none',
      scrollTrigger: {
        trigger: horizontalSection,
        start: 'top 20%',
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
  }
  
  // Refresh on resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
}

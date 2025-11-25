// Footer Parallax Depth Effect
// Creates a reveal effect where the footer is hidden behind content and reveals as you scroll

export function initFooterParallax() {
  const footer = document.getElementById('footer');
  
  if (!footer) return;

  // Pin the footer and let content scroll over it
  ScrollTrigger.create({
    trigger: footer,
    start: 'top bottom',
    end: 'bottom bottom',
    pin: false,
    // markers: true, // Uncomment for debugging
    onEnter: () => {
      // When footer enters viewport, make all content above it slide up
      const sectionsAbove = document.querySelectorAll('#contact, section:not(#footer)');
      sectionsAbove.forEach(section => {
        gsap.to(section, {
          y: '-100vh',
          ease: 'none',
          scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          }
        });
      });
    }
  });

  console.log('✅ Footer parallax reveal initialized');
}

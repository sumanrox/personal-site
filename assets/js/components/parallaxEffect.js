/**
 * Parallax Effect Component
 * Creates smooth parallax scrolling effects for hero and sections
 */

export function initParallaxEffect() {
  const heroSection = document.getElementById('hero-section');
  const aboutSection = document.getElementById('about');
  
  if (!heroSection || !aboutSection) {
    return;
  }
  
  // Hero section moves down (slower than scroll) and fades
  gsap.to(heroSection, {
    yPercent: 30,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: aboutSection,
      start: 'top bottom',
      end: 'top top',
      scrub: 1,
      markers: false,
      onUpdate: (self) => {
        // Completely hide hero after certain scroll progress to prevent peek-through
        if (self.progress > 0.7) {
          heroSection.style.visibility = 'hidden';
        } else {
          heroSection.style.visibility = 'visible';
        }
      }
    }
  });
}

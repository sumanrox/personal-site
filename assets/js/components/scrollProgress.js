/**
 * Scroll Progress Bar Component
 * Displays an animated rainbow gradient progress bar in the navbar
 */

export function initScrollProgress() {
  // Get the progress bar element in the navbar
  const progressBar = document.getElementById('scroll-progress-bar');
  
  if (!progressBar) {
    console.warn('Scroll progress bar element not found');
    return;
  }

  // Update progress on scroll
  const updateProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
  };

  // Update on scroll with throttling for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial update
  updateProgress();
  
  console.log('✅ Scroll progress bar initialized');
}

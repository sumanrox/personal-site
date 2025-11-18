/**
 * Scroll Progress Bar Component
 * Displays an animated progress bar at the top showing scroll position
 */

export function initScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 5px;
    background: linear-gradient(90deg, 
      #000000 0%, 
      #1a1a1a 25%, 
      #333333 50%, 
      #1a1a1a 75%, 
      #000000 100%
    );
    background-size: 200% 100%;
    animation: gradientShift 3s ease infinite;
    z-index: 9999;
    transition: width 0.1s ease-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;
  document.body.appendChild(progressBar);

  // Add gradient animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes gradientShift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }
  `;
  document.head.appendChild(style);

  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    
    progressBar.style.width = `${scrollPercent}%`;
  });
}

/**
 * Logo Carousel Component
 * Handles infinite scrolling logo carousel with interactive controls
 */

export function initLogoCarousel() {
  class LogoCarousel {
    constructor() {
      this.container = document.getElementById('logo-carousel');
      this.track = document.getElementById('logo-track');
      this.isPaused = false;
      this.scrollPosition = 0;
      this.scrollSpeed = 1.5; // pixels per frame
      this.animationFrame = null;
      this.init();
    }

    init() {
      if (!this.container || !this.track) {
        console.warn('Logo carousel elements not found');
        return;
      }

      this.startScroll();
      console.log('🎠 Logo carousel initialized with seamless scroll');
    }

    startScroll() {
      const scroll = () => {
        if (!this.isPaused) {
          this.scrollPosition += this.scrollSpeed;
          
          // Calculate the width of one logo item including gap
          const firstItem = this.track.querySelector('.logo-item');
          if (firstItem) {
            const itemWidth = firstItem.offsetWidth;
            const gap = parseFloat(getComputedStyle(this.track).gap) || 48; // 3rem = 48px
            const singleItemWidth = itemWidth + gap;
            
            // Count items in first set (before "Logo Set 2" comment)
            const allItems = this.track.querySelectorAll('.logo-item');
            const itemsPerSet = allItems.length / 2;
            const oneSetWidth = singleItemWidth * itemsPerSet;
            
            // Reset seamlessly when we've scrolled exactly one set
            if (this.scrollPosition >= oneSetWidth) {
              this.scrollPosition = this.scrollPosition - oneSetWidth;
            }
          }
          
          this.track.style.transform = `translateX(-${this.scrollPosition}px)`;
        }
        
        this.animationFrame = requestAnimationFrame(scroll);
      };
      
      scroll();
    }

    pause() {
      this.isPaused = true;
      this.container.classList.add('scroll-paused');
    }

    resume() {
      this.isPaused = false;
      this.container.classList.remove('scroll-paused');
    }

    reverse() {
      this.scrollSpeed = -this.scrollSpeed;
    }

    setupHoverPause() {
      // Hover pause disabled - carousel continues scrolling
      console.log('🎠 Logo carousel hover pause disabled');
    }

    destroy() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
      }
    }
  }

  // Initialize logo carousel
  return new LogoCarousel();
}
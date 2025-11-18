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
      this.isReversed = false;
      this.init();
    }

    init() {
      if (!this.container || !this.track) {
        console.warn('Logo carousel elements not found');
        return;
      }

      this.setupHoverPause();
      console.log('🎠 Logo carousel initialized');
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
      this.isReversed = !this.isReversed;
      this.container.classList.toggle('scroll-reverse', this.isReversed);
    }

    setupHoverPause() {
      // Hover pause disabled - carousel continues scrolling
      console.log('🎠 Logo carousel hover pause disabled');
    }
  }

  // Initialize logo carousel
  return new LogoCarousel();
}
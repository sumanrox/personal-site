/**
 * Main Application Entry Point
 * Initializes all components and animations
 */

import { initializeContent } from './config.js';
import { initScrollProgress } from './components/scrollProgress.js';
import { initTextHighlight } from './components/textHighlight.js';
import { initLinkAnimations } from './components/linkAnimations.js';
import { initSectionAnimations } from './components/sectionAnimations.js';
import { initNavigation } from './components/navigation.js';
import { initCounterAnimation } from './components/counterAnimation.js';
import { initWorkCardHover } from './components/workCardHover.js';
import { initTimelineAnimation } from './components/timelineAnimation.js';
import { initLogoCarousel } from './components/logoCarousel.js';
import { initParallaxEffect } from './components/parallaxEffect.js';
import { initWorkScrollLock } from './components/workScrollLock.js';
import { initMagazineAbout } from './components/magazineAbout.js';
import { PillHeadersController } from './components/pillHeaders.js';
import { initFormSecurity } from './components/formSecurity.js';
import './components/heroThree.js';

(function () {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Initialize portfolio content from config
  initializeContent().then(() => {
    // Initialize all components after content is loaded
    initNavigation();
    initScrollProgress();
    initTextHighlight();
    initLinkAnimations();
    initSectionAnimations();
    initWorkCardHover();
    initTimelineAnimation();
    initLogoCarousel();
    initParallaxEffect();
    initWorkScrollLock();
    initMagazineAbout();
    initFormSecurity();
    
    // Initialize counter animation after a delay to ensure DOM is ready
    setTimeout(() => {
      initCounterAnimation();
    }, 100);

    // Initialize pill headers
    setTimeout(() => {
      window.pillHeaders = new PillHeadersController();
    }, 200);
  });
})();

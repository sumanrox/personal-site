/**
 * Main Application Entry Point
 * Initializes all components and animations
 */

import { initScrollProgress } from './components/scrollProgress.js';
import { initTextHighlight } from './components/textHighlight.js';
import { initLinkAnimations } from './components/linkAnimations.js';
import { initSectionAnimations } from './components/sectionAnimations.js';
import { initNavigation } from './components/navigation.js';
import { initCounterAnimation } from './components/counterAnimation.js';
import { initWorkCardHover } from './components/workCardHover.js';
import { initSkillBars } from './components/skillBars.js';
import { initTimelineAnimation } from './components/timelineAnimation.js';
import { initTechTags } from './components/techTags.js';
import { initCVECharts } from './components/cveCharts.js';
import { PillHeadersController } from './components/pillHeaders.js';
import { initLogoCarousel } from './components/logoCarousel.js';

console.log('App.js loaded');

(function () {
  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  console.log('GSAP and ScrollTrigger registered');

  // Initialize all components
  initNavigation();
  initScrollProgress();
  initTextHighlight();
  initLinkAnimations();
  initSectionAnimations();
  initWorkCardHover();
  initTimelineAnimation();
  initSkillBars();
  initTechTags();
  initCVECharts();
  initLogoCarousel();
  
  // Initialize counter animation after a delay to ensure DOM is ready
  setTimeout(() => {
    console.log('About to call initCounterAnimation');
    initCounterAnimation();
  }, 100);

  // Initialize pill headers
  setTimeout(() => {
    window.pillHeaders = new PillHeadersController();
    console.log('🏷️ Pill headers initialized');
  }, 200);
})();

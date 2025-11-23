/**
 * Locomotive Scroll Integration
 * Battle-tested smooth scrolling library
 */

export function initLocomotiveScroll() {
  console.log('Initializing Locomotive Scroll...');

  // Wait for Locomotive Scroll to be available
  if (typeof LocomotiveScroll === 'undefined') {
    console.warn('Locomotive Scroll not loaded yet, retrying...');
    setTimeout(initLocomotiveScroll, 100);
    return null;
  }

  const scrollContainer = document.querySelector('[data-scroll-container]');
  if (!scrollContainer) {
    console.error('Scroll container not found. Add data-scroll-container to your main wrapper.');
    return null;
  }

  // Initialize Locomotive Scroll
  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    smartphone: {
      smooth: true
    },
    tablet: {
      smooth: true
    },
    // Multiplier for scroll speed
    multiplier: 1.0,
    // Class to add when scrolling
    class: 'is-inview',
    // Repeat animations on scroll up
    repeat: false,
    // Mobile orientation
    getDirection: true,
    getSpeed: true,
    // Enable native scrollbar
    lerp: 0.1, // Smoothness (0.1 = smooth, 1 = instant)
    reloadOnContextChange: true
  });

  // Update ScrollTrigger when Locomotive Scroll updates
  locoScroll.on('scroll', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.update();
    }
  });

  // Sync Locomotive Scroll with ScrollTrigger
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.scrollerProxy(scrollContainer, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: scrollContainer.style.transform ? 'transform' : 'fixed'
    });

    // Update on ScrollTrigger refresh
    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();
  }

  // Update on window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      locoScroll.update();
    }, 250);
  });

  // Update on orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      locoScroll.update();
    }, 100);
  });

  console.log('✅ Locomotive Scroll initialized');
  return locoScroll;
}

export function destroyLocomotiveScroll(locoScroll) {
  if (locoScroll) {
    locoScroll.destroy();
    console.log('Locomotive Scroll destroyed');
  }
}

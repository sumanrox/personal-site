/**
 * Work Section Scroll Lock Component
 * Locks scrolling to work section until all findings are viewed
 */

export function initWorkScrollLock() {
  console.log('Initializing work section scroll lock');
  
  const workSection = document.getElementById('work');
  if (!workSection) {
    console.warn('Work section not found');
    return;
  }

  let currentScrollTrigger = null;
  let currentObserver = null;

  function setupBehavior() {
    // Clean up any existing instances
    if (currentScrollTrigger) {
      currentScrollTrigger.kill();
      currentScrollTrigger = null;
    }
    if (currentObserver) {
      currentObserver.disconnect();
      currentObserver = null;
    }

    // Check if mobile/tablet - disable scroll lock on smaller screens
    const isMobile = window.matchMedia('(max-width: 1024px)').matches;
    
    if (isMobile) {
      console.log('Mobile detected - NO scroll lock, standard behavior');
      // On mobile, don't initialize anything - just let it scroll naturally
      return;
    }

    console.log('Desktop detected - using scroll lock behavior');
    currentScrollTrigger = initDesktopScrollLock(workSection);
  }

  // Initial setup
  setupBehavior();

  // Re-initialize on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      console.log('Window resized - reinitializing work section behavior');
      setupBehavior();
    }, 250);
  });

  console.log('Work section scroll lock initialized with resize listener');
}

function initDesktopScrollLock(workSection) {
  const findings = workSection.querySelectorAll('[id^="finding"]');
  const contentContainer = workSection.querySelector('.lg\\:col-span-8');
  const sectionHeader = workSection.querySelector('.mb-16');
  
  if (findings.length === 0) {
    console.warn('No findings found in work section');
    return;
  }

  let currentFindingIndex = 0;
  let hasEnteredSection = false;
  let allFindingsViewed = false;

  // Add top padding to content container to prevent header overlap
  if (contentContainer) {
    contentContainer.style.paddingTop = '60px';
  }

  // Create a wrapper for the findings to control their positioning
  const findingsContainer = document.createElement('div');
  findingsContainer.className = 'findings-container relative';
  findingsContainer.style.minHeight = '600px';
  
  // Wrap all findings in the container
  if (contentContainer) {
    findings.forEach(finding => {
      findingsContainer.appendChild(finding.cloneNode(true));
    });
    
    // Clear original findings and add container
    Array.from(findings).forEach(f => f.remove());
    contentContainer.appendChild(findingsContainer);
  }

  // Get the new finding references
  const newFindings = findingsContainer.querySelectorAll('[id^="finding"]');

  // Create a pinned container effect
  const pinnedScroll = ScrollTrigger.create({
    trigger: workSection,
    start: 'top top',
    end: () => `+=${newFindings.length * window.innerHeight}`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onEnter: () => {
      hasEnteredSection = true;
      allFindingsViewed = false;
      console.log('Entered work section - scroll locked');
      // Show first card when entering from top
      currentFindingIndex = 0;
      animateToFinding(0);
      updateSidebarActive(0);
    },
    onLeave: () => {
      if (allFindingsViewed) {
        hasEnteredSection = false;
        console.log('Left work section - scroll unlocked');
      }
    },
    onEnterBack: () => {
      hasEnteredSection = true;
      console.log('Re-entered work section from bottom - scroll locked');
      // Show last card when entering from bottom
      currentFindingIndex = newFindings.length - 1;
      animateToFinding(currentFindingIndex);
      updateSidebarActive(currentFindingIndex);
    },
    onLeaveBack: () => {
      hasEnteredSection = false;
      currentFindingIndex = 0;
      allFindingsViewed = false;
      console.log('Left work section backwards - scroll unlocked');
    },
    onUpdate: (self) => {
      // Calculate which finding should be shown based on scroll progress
      const progress = self.progress;
      const totalFindings = newFindings.length;
      const findingIndex = Math.min(
        Math.floor(progress * totalFindings),
        totalFindings - 1
      );
      
      if (findingIndex !== currentFindingIndex) {
        currentFindingIndex = findingIndex;
        animateToFinding(findingIndex);
        updateSidebarActive(findingIndex);
      }
      
      // Check if reached the last finding
      if (progress > 0.95 && !allFindingsViewed) {
        allFindingsViewed = true;
        console.log('All findings viewed - can progress');
      }
    }
  });

  // Animate findings in and out with absolute positioning for snap behavior
  function animateToFinding(index) {
    newFindings.forEach((finding, i) => {
      // Position all findings absolutely on top of each other
      finding.style.position = 'absolute';
      finding.style.top = '0';
      finding.style.left = '0';
      finding.style.right = '0';
      finding.style.width = '100%';
      
      if (i === index) {
        gsap.to(finding, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          zIndex: 10,
          pointerEvents: 'auto'
        });
      } else if (i < index) {
        gsap.to(finding, {
          opacity: 0,
          y: -100,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.in',
          zIndex: 1,
          pointerEvents: 'none'
        });
      } else {
        gsap.to(finding, {
          opacity: 0,
          y: 100,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.in',
          zIndex: 1,
          pointerEvents: 'none'
        });
      }
    });
  }

  // Initialize: position all findings and show only first
  newFindings.forEach((finding, i) => {
    finding.style.position = 'absolute';
    finding.style.top = '0';
    finding.style.left = '0';
    finding.style.right = '0';
    finding.style.width = '100%';
    finding.style.overflow = 'hidden';
    
    if (i === 0) {
      gsap.set(finding, { opacity: 1, y: 0, scale: 1, zIndex: 10, pointerEvents: 'auto' });
    } else {
      gsap.set(finding, { opacity: 0, y: 100, scale: 0.95, zIndex: 1, pointerEvents: 'none' });
    }
  });

  // Update sidebar navigation active state
  function updateSidebarActive(index) {
    const navLinks = workSection.querySelectorAll('.work-nav-link');
    navLinks.forEach((link, i) => {
      if (i === index) {
        link.classList.remove('border-gray-300');
        link.classList.add('border-black', 'bg-gray-50');
      } else if (i < index) {
        link.classList.remove('border-gray-300');
        link.classList.add('border-black');
        link.classList.remove('bg-gray-50');
      } else {
        link.classList.remove('border-black', 'bg-gray-50');
        link.classList.add('border-gray-300');
      }
    });
  }

  // Smooth scroll for sidebar navigation
  const navLinks = workSection.querySelectorAll('.work-nav-link');
  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Simply show the clicked card - no scrolling!
      currentFindingIndex = index;
      animateToFinding(index);
      updateSidebarActive(index);
    });
  });

  console.log('Desktop scroll lock initialized');
  return pinnedScroll;
}

/**
 * Mobile scroll behavior - simple intersection observer
 * Highlights sidebar as cards scroll into view
 */
function initMobileScrollBehavior(workSection) {
  const findings = workSection.querySelectorAll('[id^="finding"]');
  const navLinks = workSection.querySelectorAll('.work-nav-link');
  
  if (findings.length === 0 || navLinks.length === 0) {
    console.warn('No findings or nav links found for mobile scroll');
    return;
  }

  // Intersection observer to track which card is visible
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const findingId = entry.target.id;
        const index = Array.from(findings).findIndex(f => f.id === findingId);
        
        if (index !== -1) {
          updateMobileSidebarActive(navLinks, index);
        }
      }
    });
  }, observerOptions);

  // Observe all findings
  findings.forEach(finding => observer.observe(finding));

  // Smooth scroll on nav click
  navLinks.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      findings[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  console.log('Mobile scroll behavior initialized');
  return observer;
}

/**
 * Update sidebar active state for mobile
 */
function updateMobileSidebarActive(navLinks, activeIndex) {
  navLinks.forEach((link, i) => {
    if (i === activeIndex) {
      link.classList.remove('border-gray-300');
      link.classList.add('border-black', 'bg-gray-50');
    } else {
      link.classList.remove('border-black', 'bg-gray-50');
      link.classList.add('border-gray-300');
    }
  });
}

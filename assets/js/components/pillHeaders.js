// Pill Headers Animation Controller
export class PillHeadersController {
  constructor() {
    this.pills = [];
    this.initializePills();
  }

  initializePills() {
    const pillContainers = [
      'about-pill-container',
      'experience-pill-container', 
      'projects-pill-container',
      'skills-pill-container',
      'work-pill-container',
      'contact-pill-container'
    ];

    pillContainers.forEach(containerId => {
      const container = document.getElementById(containerId);
      if (container) {
        const pillData = this.createPillData(containerId);
        this.pills.push(pillData);
        this.setupScrollTrigger(pillData);
      }
    });

    // Check for pills currently in viewport and animate them
    setTimeout(() => {
      this.checkVisiblePills();
    }, 500); // Wait for DOM and layout to stabilize
  }

  createPillData(containerId) {
    const sectionName = containerId.replace('-pill-container', '');
    const triangleId = `${sectionName}-triangle`;
    const openBracketId = `${sectionName}-open-bracket`;
    const closeBracketId = `${sectionName}-close-bracket`;
    const textId = `${sectionName}-pill-text`;

    return {
      container: document.getElementById(containerId),
      triangle: document.getElementById(triangleId),
      openBracket: document.getElementById(openBracketId),
      closeBracket: document.getElementById(closeBracketId),
      text: document.getElementById(textId),
      sectionName: sectionName,
      animated: false,
      isAnimating: false,
      timeline: null
    };
  }

  animatePill(pillData) {
    if (pillData.isAnimating) return;
    pillData.isAnimating = true;

    // Kill any existing timeline
    if (pillData.timeline) pillData.timeline.kill();

    pillData.timeline = gsap.timeline({
      onComplete: () => {
        pillData.isAnimating = false;
        pillData.animated = true;
      }
    });

    // Step 1: Fade in triangle and open bracket (faster)
    pillData.timeline.to([pillData.triangle, pillData.openBracket], {
      opacity: 1,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Step 2: Close bracket slides from left to right, revealing text
    const textWidth = this.getElementWidth(pillData.text);
    
    // Position close bracket at open bracket position initially
    pillData.timeline.set(pillData.closeBracket, {
      x: -(textWidth + 8),
      opacity: 1
    });

    // Animate close bracket sliding to final position (faster)
    pillData.timeline.to(pillData.closeBracket, {
      x: 0,
      duration: 0.4,
      ease: "power2.inOut"
    });

    // Step 3: Text appears with blinking animation during bracket slide (faster)
    pillData.timeline.to(pillData.text, {
      opacity: 1,
      duration: 0.06,
      repeat: 5,
      yoyo: true,
      ease: "power2.inOut"
    }, "-=0.2");

    // Step 4: Ensure text stays visible
    pillData.timeline.set(pillData.text, {
      opacity: 1
    });
  }

  getElementWidth(element) {
    if (!element) return 0;
    
    const clone = element.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.opacity = '1';
    document.body.appendChild(clone);
    const width = clone.offsetWidth;
    document.body.removeChild(clone);
    return width;
  }

  resetPill(pillData) {
    if (pillData.timeline) pillData.timeline.kill();
    
    gsap.set([pillData.triangle, pillData.openBracket, pillData.closeBracket, pillData.text], {
      opacity: 0,
      x: 0
    });
    
    pillData.animated = false;
    pillData.isAnimating = false;
  }

  checkVisiblePills() {
    this.pills.forEach(pillData => {
      if (this.isPillInViewport(pillData) && !pillData.animated && !pillData.isAnimating) {
        this.animatePill(pillData);
      }
    });
  }

  isPillInViewport(pillData) {
    if (!pillData.container) return false;
    
    const rect = pillData.container.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    
    // Check if pill is in the "trigger zone" (same as ScrollTrigger settings)
    const triggerStart = windowHeight * 0.8; // 80% from top
    const triggerEnd = windowHeight * 0.2; // 20% from bottom
    
    return (
      rect.top < triggerStart && 
      rect.bottom > triggerEnd
    );
  }

  setupScrollTrigger(pillData) {
    ScrollTrigger.create({
      trigger: pillData.container,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        this.animatePill(pillData);
      },
      onLeave: () => {
        this.resetPill(pillData);
      },
      onEnterBack: () => {
        this.animatePill(pillData);
      },
      onLeaveBack: () => {
        this.resetPill(pillData);
      },
      onUpdate: () => {
        // Check if pill should be animated when scrolling slowly
        if (this.isPillInViewport(pillData) && !pillData.animated && !pillData.isAnimating) {
          this.animatePill(pillData);
        }
      }
    });
  }

  // Method to manually trigger all animations (useful for testing)
  animateAllPills() {
    this.pills.forEach(pill => {
      this.animatePill(pill);
    });
  }

  // Reset all pills (useful for debugging)
  resetAllPills() {
    this.pills.forEach(pillData => {
      gsap.set([pillData.triangle, pillData.openBracket, pillData.closeBracket, pillData.text], {
        opacity: 0,
        x: 0
      });
      pillData.animated = false;
    });
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for other components to load
  setTimeout(() => {
    window.pillHeaders = new PillHeadersController();
    console.log('🏷️ Pill headers initialized');
  }, 100);
});
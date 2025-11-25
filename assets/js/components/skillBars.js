/**
 * Skill Bars Animation Component - Ultra Fast
 * Animates skill level bars and percentage counters instantly
 * Resets when out of view, animates on both scroll directions
 */

export function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  skillBars.forEach((bar) => {
    const targetWidth = bar.getAttribute('data-width');
    const percentageElement = bar.parentElement.previousElementSibling.querySelector('.skill-percentage');
    
    const animation = gsap.fromTo(bar, 
      {
        width: '0%'
      },
      {
        width: targetWidth + '%',
        duration: 0.6,
        ease: 'power2.out',
        paused: true
      }
    );
    
    // Create ScrollTrigger that animates on enter and resets on leave
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 95%',
      end: 'bottom 5%',
      onEnter: () => {
        animation.play();
        if (percentageElement) animatePercentage(percentageElement, targetWidth);
      },
      onLeave: () => {
        animation.reverse();
        if (percentageElement) percentageElement.textContent = '0%';
      },
      onEnterBack: () => {
        animation.play();
        if (percentageElement) animatePercentage(percentageElement, targetWidth);
      },
      onLeaveBack: () => {
        animation.reverse();
        if (percentageElement) percentageElement.textContent = '0%';
      }
    });
  });
}

// Helper function to animate percentage counter
function animatePercentage(element, targetWidth) {
  const target = parseInt(targetWidth);
  
  gsap.to({}, {
    duration: 0.6,
    ease: 'power2.out',
    onUpdate: function() {
      const progress = this.progress();
      const currentValue = Math.round(progress * target);
      element.textContent = currentValue + '%';
    }
  });
}

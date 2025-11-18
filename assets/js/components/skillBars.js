/**
 * Skill Bars Animation Component - Ultra Fast
 * Animates skill level bars and percentage counters instantly
 */

export function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  skillBars.forEach((bar) => {
    const targetWidth = bar.getAttribute('data-width');
    const percentageElement = bar.parentElement.previousElementSibling.querySelector('.skill-percentage');
    
    gsap.fromTo(bar, 
      {
        width: '0%'
      },
      {
        width: targetWidth + '%',
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 85%',
          once: true
        }
      }
    );
    
    // Animate percentage counter
    if (percentageElement) {
      let currentValue = 0;
      const target = parseInt(targetWidth);
      
      gsap.to({}, {
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: bar,
          start: 'top 85%',
          once: true
        },
        onUpdate: function() {
          const progress = this.progress();
          currentValue = Math.round(progress * target);
          percentageElement.textContent = currentValue + '%';
        }
      });
    }
  });
}

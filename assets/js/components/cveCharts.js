/**
 * CVE Charts Animation Component - Ultra Fast
 * Animates CVE distribution bar charts instantly
 */

export function initCVECharts() {
  const cveBars = document.querySelectorAll('.cve-bar');
  
  if (cveBars.length === 0) {
    console.warn('No CVE bars found');
    return;
  }
  
  console.log(`Found ${cveBars.length} CVE bars`);
  
  cveBars.forEach((bar, index) => {
    const targetWidth = bar.getAttribute('data-width');
    const chartBar = bar.closest('.cve-chart-bar');
    const countElement = chartBar.querySelector('.cve-count');
    const labelElement = bar.querySelector('.cve-bar-label');
    const targetCount = parseInt(countElement.getAttribute('data-target'));
    
    console.log(`Bar ${index}: width=${targetWidth}%, count=${targetCount}`);
    
    // Animate bar width
    gsap.fromTo(bar,
      {
        width: '0%'
      },
      {
        width: targetWidth + '%',
        duration: 0.5,
        delay: index * 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chartBar,
          start: 'top 85%',
          once: true
        }
      }
    );
    
    // Animate counter
    let currentCount = 0;
    gsap.to({}, {
      duration: 0.5,
      delay: index * 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: chartBar,
        start: 'top 85%',
        once: true
      },
      onUpdate: function() {
        const progress = this.progress();
        currentCount = Math.round(progress * targetCount);
        countElement.textContent = currentCount;
      }
    });
    
    // Fade in label slightly after bar starts
    if (labelElement) {
      gsap.fromTo(labelElement,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.3,
          delay: (index * 0.05) + 0.2,
          scrollTrigger: {
            trigger: chartBar,
            start: 'top 85%',
            once: true
          }
        }
      );
    }
  });
  
  console.log('CVE charts animation initialized');
}

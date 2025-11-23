// Horizontal Scroll for Work Section (All Devices)
export function initHorizontalScrollWork() {
    const horizontalSection = document.querySelector('.horizontal-scroll-container');
    const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper');

    if (horizontalSection && horizontalWrapper) {
        // Calculate scroll distance: total width of wrapper - visible container width
        // We use offsetWidth to respect the max-width container
        const scrollDistance = horizontalWrapper.scrollWidth - horizontalSection.offsetWidth;

        // Only enable if there's content to scroll
        if (scrollDistance > 0) {
            // Create the scroll tween
            let scrollTween = gsap.to(horizontalWrapper, {
                x: -scrollDistance, // Scroll exactly to the end
                ease: 'none',
                scrollTrigger: {
                    trigger: horizontalSection,
                    start: 'top top',
                    // Increase the scroll duration (end value) to ensure it feels natural and reaches the end
                    // The '2000' adds more vertical scroll space to map to the horizontal movement
                    end: `+=${scrollDistance + 2000}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    markers: false // Explicitly disable markers
                }
            });
        }
    }

    // Refresh on resize
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });
}

// Animate rainbow underline after hero section is loaded
function animateRainbowUnderline() {
	const underline = document.getElementById('rainbow-underline');
	if (underline) {
		underline.classList.remove('animate-slide');
		underline.style.transform = 'scaleX(0)';
		underline.style.transformOrigin = 'left';
		underline.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
		setTimeout(() => {
			underline.classList.add('animate-slide');
		}, 400);
	}
}

// Animate experience section rainbow underline with ScrollTrigger
function initExperienceRainbowUnderline() {
	const underline = document.getElementById('experience-rainbow-underline');
	if (!underline) return;
	
	// Set initial state - hide it completely
	underline.style.transform = 'scaleX(0)';
	underline.style.transformOrigin = 'left';
	underline.style.transition = 'transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
	
	// Animate on scroll
	ScrollTrigger.create({
		trigger: underline,
		start: 'top 80%',
		onEnter: () => {
			setTimeout(() => {
				underline.style.transform = 'scaleX(1)';
			}, 100);
		},
		once: true
	});
}

// Use MutationObserver to detect when hero section is loaded
const observer = new MutationObserver(() => {
	if (document.getElementById('rainbow-underline')) {
		animateRainbowUnderline();
		observer.disconnect();
	}
});
observer.observe(document.body, { childList: true, subtree: true });

// Initialize experience rainbow underline after components load
setTimeout(() => {
	initExperienceRainbowUnderline();
}, 1000);

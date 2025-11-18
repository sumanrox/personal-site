/**
 * Magnetic Cards Component
 * Cards follow mouse movement with smooth 3D transformation
 */

export function initMagneticCards() {
  const cards = document.querySelectorAll('.tilt-card');
  
  if (cards.length === 0) {
    console.warn('No magnetic cards found');
    return;
  }

  console.log('Magnetic cards initialized:', cards.length);

  cards.forEach(card => {
    let bounds;
    
    const handleMouseMove = (e) => {
      if (!bounds) {
        bounds = card.getBoundingClientRect();
      }
      
      // Get mouse position relative to card center
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      
      // Calculate rotation based on mouse position (-1 to 1)
      const rotateX = ((mouseY - centerY) / centerY) * -8; // Max 8deg
      const rotateY = ((mouseX - centerX) / centerX) * 8;  // Max 8deg
      
      // Calculate translation (slight movement toward cursor)
      const translateX = ((mouseX - centerX) / centerX) * 5; // Max 5px
      const translateY = ((mouseY - centerY) / centerY) * 5; // Max 5px
      
      // Apply transform
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(10px)
      `;
    };
    
    const handleMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease';
    };
    
    const handleMouseLeave = () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
      bounds = null;
    };
    
    // Add event listeners
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
  });
}

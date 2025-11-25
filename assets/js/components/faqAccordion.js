/**
 * FAQ Accordion Component
 * Handles accordion functionality for FAQ section - Brutalist style
 */

export function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', function() {
      const wasActive = this.classList.contains('active');
      
      // Close all items
      faqItems.forEach(i => i.classList.remove('active'));
      
      // Open clicked item if it wasn't active
      if (!wasActive) {
        this.classList.add('active');
      }
    });
  });

  console.log('❓ FAQ Accordion initialized');
}

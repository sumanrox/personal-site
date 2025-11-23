/**
 * Form Security Module
 * Implements client-side validation, rate limiting, and XSS prevention
 */

export function initFormSecurity() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Initialize Notyf for toast notifications
  const notyf = new Notyf({
    duration: 4000,
    position: { x: 'right', y: 'top' },
    types: [
      {
        type: 'success',
        background: '#000',
        icon: false
      },
      {
        type: 'error',
        background: '#ef4444',
        icon: false
      },
      {
        type: 'warning',
        background: '#f59e0b',
        icon: false
      }
    ]
  });

  // Rate limiting storage
  const RATE_LIMIT_KEY = 'form_submission_time';
  const RATE_LIMIT_MS = 60000; // 1 minute between submissions

  // Turnstile token storage
  let turnstileToken = null;

  // Callback for Turnstile success
  window.onTurnstileSuccess = (token) => {
    turnstileToken = token;
    console.log('Turnstile verification successful');
  };

  // XSS Prevention: Sanitize input
  const sanitizeInput = (input) => {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  };

  // Email validation regex (RFC 5322 simplified)
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) && email.length <= 254;
  };

  // Check rate limiting
  const isRateLimited = () => {
    const lastSubmission = localStorage.getItem(RATE_LIMIT_KEY);
    if (!lastSubmission) return false;
    
    const timeSince = Date.now() - parseInt(lastSubmission, 10);
    return timeSince < RATE_LIMIT_MS;
  };

  // Show error message
  const showError = (message) => {
    notyf.error(message);
  };

  // Show success message
  const showSuccess = () => {
    notyf.success('✓ Message sent! I\'ll respond within 24 hours.');
  };
  
  // Show warning message
  const showWarning = (message) => {
    notyf.open({ type: 'warning', message });
  };

  // Form submission handler
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get submit button and add loading state
    const submitBtn = document.getElementById('contact-submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitArrow = document.getElementById('submit-arrow');
    
    // Check honeypot (bot detection)
    const honeypot = contactForm.querySelector('input[name="website"]');
    if (honeypot && honeypot.value) {
      // Silent fail - likely a bot
      console.warn('Honeypot triggered - potential bot submission');
      return;
    }

    // Validate Cloudflare Turnstile
    if (!turnstileToken) {
      showError('Please complete the verification challenge.');
      return;
    }

    // Rate limiting check
    if (isRateLimited()) {
      showError('Please wait a moment before submitting again.');
      return;
    }

    // Get form values
    const name = contactForm.querySelector('#contact-name').value.trim();
    const email = contactForm.querySelector('#contact-email').value.trim();
    const company = contactForm.querySelector('#contact-company').value.trim();
    const message = contactForm.querySelector('#contact-message').value.trim();

    // Validation
    if (!name || name.length < 2) {
      showError('Please enter a valid name (minimum 2 characters).');
      return;
    }

    if (name.length > 100) {
      showError('Name is too long (maximum 100 characters).');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    if (company.length > 100) {
      showError('Company name is too long (maximum 100 characters).');
      return;
    }

    if (!message || message.length < 10) {
      showError('Please enter a message (minimum 10 characters).');
      return;
    }

    if (message.length > 2000) {
      showError('Message is too long (maximum 2000 characters).');
      return;
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      company: sanitizeInput(company),
      message: sanitizeInput(message),
      'cf-turnstile-response': turnstileToken, // Cloudflare Turnstile token
      timestamp: new Date().toISOString()
    };

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('btn-loading');
    submitText.textContent = 'Sending...';
    if (submitArrow) submitArrow.style.opacity = '0';

    // Simulate API call (replace with actual backend call)
    try {
      // Here you would send the sanitized data to your backend
      // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(sanitizedData) });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted with sanitized data:', sanitizedData);

      // Update rate limit timestamp
      localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString());

      // Show success message
      showSuccess();
      
      // Add success animation to button
      submitBtn.classList.add('bounce-success');
      setTimeout(() => submitBtn.classList.remove('bounce-success'), 500);

      // Reset form and Turnstile
      contactForm.reset();
      turnstileToken = null;
      
      // Reset Turnstile widget
      if (typeof turnstile !== 'undefined') {
        const widget = contactForm.querySelector('.cf-turnstile');
        if (widget) {
          turnstile.reset(widget);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showError('Something went wrong. Please try again.');
      
      // Add error shake animation
      submitBtn.classList.add('shake-error');
      setTimeout(() => submitBtn.classList.remove('shake-error'), 400);
    } finally {
      // Remove loading state
      submitBtn.disabled = false;
      submitBtn.classList.remove('btn-loading');
      submitText.textContent = 'Send Message';
      if (submitArrow) submitArrow.style.opacity = '1';
    }
  });

  // Real-time email validation
  const emailInput = contactForm.querySelector('#contact-email');
  emailInput.addEventListener('blur', () => {
    const email = emailInput.value.trim();
    if (email && !isValidEmail(email)) {
      emailInput.classList.add('border-red-500');
    } else {
      emailInput.classList.remove('border-red-500');
    }
  });

  // Prevent paste of potentially malicious content
  const textInputs = contactForm.querySelectorAll('input[type="text"], input[type="email"], textarea');
  textInputs.forEach(input => {
    input.addEventListener('paste', (e) => {
      setTimeout(() => {
        // Limit pasted content
        if (input.value.length > parseInt(input.getAttribute('maxlength') || '1000', 10)) {
          input.value = input.value.substring(0, parseInt(input.getAttribute('maxlength') || '1000', 10));
          showError('Pasted content was truncated to maximum length.');
        }
      }, 0);
    });
  });

  console.log('✅ Form security initialized with validation and rate limiting');
}

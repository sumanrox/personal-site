/**
 * Loading Screen Component - Mission Impossible Style
 * Sleek scanning effect with grid patterns and circuit animations
 */

export function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const decryptText = document.querySelector('.decrypt-text');
  const decryptLabel = document.querySelector('.decrypt-label');
  const decryptBar = document.querySelector('.decrypt-bar');
  const decryptBarGlow = document.querySelector('.decrypt-bar-glow');
  const decryptPercentage = document.querySelector('.decrypt-percentage');
  const canvas = document.getElementById('particle-canvas');
  
  if (!loadingScreen || !decryptText || !canvas) {
    console.warn('Loading screen elements not found');
    return;
  }

  // Canvas setup
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  let currentProgress = 0;
  let isComplete = false;
  let time = 0;
  
  // Grid particles
  const gridParticles = [];
  const gridSize = 50;
  
  for (let x = 0; x < width; x += gridSize) {
    for (let y = 0; y < height; y += gridSize) {
      if (Math.random() > 0.7) {
        gridParticles.push({
          x: x,
          y: y,
          size: 2,
          pulseOffset: Math.random() * Math.PI * 2,
          speed: 0.02 + Math.random() * 0.03
        });
      }
    }
  }
  
  // Circuit lines (connecting particles)
  const circuitLines = [];
  for (let i = 0; i < 30; i++) {
    const start = gridParticles[Math.floor(Math.random() * gridParticles.length)];
    const end = gridParticles[Math.floor(Math.random() * gridParticles.length)];
    if (start && end) {
      circuitLines.push({
        start: start,
        end: end,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.01
      });
    }
  }
  
  function getColor() {
    // Color based on progress: Red -> Yellow -> Green
    let r, g, b;
    if (currentProgress < 0.5) {
      const t = currentProgress * 2;
      r = 255;
      g = Math.floor(255 * t);
      b = 0;
    } else {
      const t = (currentProgress - 0.5) * 2;
      r = Math.floor(255 * (1 - t));
      g = 255;
      b = Math.floor(100 * t);
    }
    return { r, g, b };
  }
  
  // Animation loop
  function animate() {
    // Clear with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    const color = getColor();
    time++;
    
    // Draw grid
    ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`;
    ctx.lineWidth = 0.5;
    
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Draw circuit lines with animation
    circuitLines.forEach(line => {
      if (!line.start || !line.end) return;
      
      line.progress += line.speed;
      if (line.progress > 1) line.progress = 0;
      
      const currentX = line.start.x + (line.end.x - line.start.x) * line.progress;
      const currentY = line.start.y + (line.end.y - line.start.y) * line.progress;
      
      // Draw full line (faded)
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);
      ctx.stroke();
      
      // Draw moving dot
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
      ctx.fill();
      
      // Glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
      ctx.beginPath();
      ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    
    // Draw grid intersection particles
    gridParticles.forEach(particle => {
      const pulse = Math.sin(time * particle.speed + particle.pulseOffset) * 0.5 + 0.5;
      const size = particle.size + pulse * 2;
      const opacity = 0.3 + pulse * 0.5;
      
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity * currentProgress})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Explosion effect when complete
    if (isComplete) {
      const explosionRadius = (time - isComplete) * 20;
      const explosionOpacity = Math.max(0, 1 - (time - isComplete) / 30);
      
      ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${explosionOpacity})`;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, explosionRadius, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, explosionRadius - 20, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, explosionRadius - 40, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();

  // Handle window resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const finalText = decryptText.getAttribute('data-value');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  let iteration = 0;
  let decryptComplete = false;

  // Decryption animation with SLOWER progress (increased interval time)
  const decrypt = () => {
    let interval = setInterval(() => {
      // Update text
      decryptText.innerText = finalText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) {
            return finalText[index];
          }
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      // Calculate and update progress (SLOWER)
      const progress = Math.min(100, Math.floor((iteration / finalText.length) * 100));
      currentProgress = progress / 100;
      
      if (decryptBar && decryptBarGlow) {
        decryptBar.style.width = `${progress}%`;
        decryptBarGlow.style.width = `${progress}%`;
      }
      
      if (decryptPercentage) {
        decryptPercentage.innerText = `${progress}%`;
      }

      if (iteration >= finalText.length) {
        clearInterval(interval);
        decryptComplete = true;
        
        // Ensure bar is at 100%
        currentProgress = 1;
        if (decryptBar && decryptBarGlow) {
          decryptBar.style.width = '100%';
          decryptBarGlow.style.width = '100%';
        }
        if (decryptPercentage) {
          decryptPercentage.innerText = '100%';
        }
        
        // Change status text
        if (decryptLabel) {
          decryptLabel.innerText = 'Access Granted';
        }
        
        // Trigger explosion
        setTimeout(() => {
          isComplete = time;
          
          // Hide loader after explosion
          setTimeout(hideLoader, 1500);
        }, 800);
      }

      iteration += 1 / 6; // MUCH SLOWER: was 1/3, now 1/6 (half speed)
    }, 80); // SLOWER: was 50ms, now 80ms
  };

  // Start decryption after a brief delay
  setTimeout(decrypt, 500);

  const hideLoader = () => {
    loadingScreen.classList.add('loaded');
    
    // Remove from DOM after transition
    setTimeout(() => {
      loadingScreen.remove();
      console.log('Loading screen hidden - Mission complete');
    }, 800);
  };

  // Fallback: hide after max time
  setTimeout(() => {
    if (!decryptComplete) {
      hideLoader();
    }
  }, 10000); // Increased from 6s to 10s for slower animation
}

document.addEventListener("scroll", function () {
    let scrollPos = window.scrollY;
    let h1 = document.querySelector(".h1-section");
  
    let isMobile = window.innerWidth <= 768; // Check if screen is small
  
    let minSize = isMobile ? 14 : 30; // Smaller font for mobile
    let maxSize = isMobile ? 80 : 120; // Adjusted max size for mobile
    let triggerScroll = 50;
  
    if (scrollPos >= triggerScroll) {
      h1.style.position = "fixed";
      h1.style.top = "0px"; 
      h1.style.left = "50px"; 
      h1.style.fontSize = `${minSize}px`;
      h1.style.padding = "0";
    } else {
      h1.style.position = "relative";
      h1.style.top = isMobile ? "650px" : "650px"; // Adjust top position for mobile
      h1.style.left = "50px";
      h1.style.fontSize = `${maxSize}px`;
    }
  });
  
  // Update styles on window resize to ensure responsiveness
  window.addEventListener("resize", function () {
    document.dispatchEvent(new Event("scroll"));
  });
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const fadeElements = document.querySelectorAll(".h2-section, .h3-section, .h4-section, .h5-section, .h6-section, .mainlinks");
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in"); // Add fade-in class
        } else {
          entry.target.classList.remove("fade-in"); // Remove on scroll-out (optional)
        }
      });
    }, { threshold: 0.1 });
  
    fadeElements.forEach(el => observer.observe(el));
  });
  
  
  
  document.addEventListener("DOMContentLoaded", function () {
    const cursor = document.createElement("div");
    cursor.classList.add("custom-cursor");
    document.body.appendChild(cursor);
  
    document.addEventListener("mousemove", function (e) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  });
  
  
  window.addEventListener("scroll", () => {
    const bgImage = document.getElementById("bg-image");
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / docHeight;
  
    // Fade out as scrolls to bottom
    const newOpacity = Math.max(1 - scrollFraction * 0.6, 0); // *2 makes it fade faster, tweak as needed
    bgImage.style.opacity = newOpacity;
  });
  
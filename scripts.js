document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll(".h2-section, .h3-section, .h4-section, .h5-section, .h6-section, p");
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible"); // Ensures fade-out when scrolling out
        }
      });
    }, { threshold: 0.1 }); // 0.1 means when 10% of the element is visible
  
    elements.forEach(element => observer.observe(element));
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
  const imageConfigs = [
    {
      id: 'bg1',
      initialX: 100, // starting left in px
      initialY: 200, // starting top in px
    },
    {
      id: 'bg2',
      initialX: 600,
      initialY: 300,
    },
    {
      id: 'bg3',
      initialX: 300,
      initialY: 500,
    }
  ];
  
  imageConfigs.forEach(config => {
    const img = document.getElementById(config.id);
  
    // Set initial position
    img.style.left = `${config.initialX}px`;
    img.style.top = `${config.initialY}px`;
  
    let isDragging = false;
    let offset = { x: 0, y: 0 };
  
    img.addEventListener('mousedown', (e) => {
      isDragging = true;
      offset.x = e.clientX - img.offsetLeft;
      offset.y = e.clientY - img.offsetTop;
      img.style.cursor = 'grabbing';
    });
  
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        img.style.left = `${e.clientX - offset.x}px`;
        img.style.top = `${e.clientY - offset.y}px`;
      }
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
      img.style.cursor = 'grab';
    });
  });
  
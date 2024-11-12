const images = document.querySelectorAll('.fade-on-scroll');

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;

    for (let i = 0; i<images.length;i++){
        // images.forEach((image) => {
        let image = images[i]
        const imageRect = image.getBoundingClientRect();
        
        // Calculate how far the image is from the top of the viewport

        // fade out start position
        const fadeStart = windowHeight * 0.35;  
        // play arouind it
        const fadeEnd = 90; // Top of the viewport
        
        const fadeinStart = windowHeight;

        // when fully load when imaging comming up
        const fadeinend = windowHeight *0.7;

        if (imageRect.top <= fadeinStart && imageRect.top >= fadeinend){
            const opacity =  (fadeinStart - fadeinend) / imageRect.top  ; 
            image.style.opacity = opacity;
            if(i==2){
                console.log(imageRect.top <= fadeinStart && imageRect.top >= fadeinend , imageRect.top , fadeinStart , fadeinend , opacity)
            }
        }
        else if (imageRect.bottom <= fadeStart && imageRect.bottom >= fadeEnd) {
            const opacity = imageRect.bottom / fadeStart; 
            image.style.opacity = opacity;
          
        } 
        else if (imageRect.bottom < fadeEnd) {
            image.style.opacity = 0; 
        } 
        else {
            image.style.opacity = 1; 
        }
    };
});

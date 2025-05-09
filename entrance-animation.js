document.addEventListener('DOMContentLoaded', function() {
    // Initialize all elements as invisible
    const body = document.body;
    const header = document.querySelector('header');
    const logo = document.querySelector('.header-logo');
    const main = document.querySelector('main');
    const chapters = document.querySelectorAll('.chapter');
    const footer = document.querySelector('footer');
    
    // Hide body initially (to prevent flash of unstyled content)
    body.style.opacity = '0';
    
    // Ensure all elements are initially hidden
    header.style.opacity = '0';
    header.style.transform = 'translateY(-50px)';
    logo.style.opacity = '0';
    logo.style.transform = 'scale(0.8)';
    
    main.style.opacity = '0';
    
    chapters.forEach(chapter => {
        chapter.style.opacity = '0';
        chapter.style.transform = 'translateY(30px)';
    });
    
    footer.style.opacity = '0';
    
    // Start animation sequence
    setTimeout(() => {
        // Fade in the body first
        body.style.transition = 'opacity 1.2s ease';
        body.style.opacity = '1';
        
        // Then animate the header
        setTimeout(() => {
            header.style.transition = 'opacity 1.2s ease, transform 1.5s ease';
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
            
            // Then reveal the logo with a gentle scale animation
            setTimeout(() => {
                logo.style.transition = 'opacity 1s ease, transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1)';
                
                // Add a subtle pulse to the logo
                setTimeout(() => {
                    logo.classList.add('pulse-once');
                }, 800);
                
                // Then show the main content area
                setTimeout(() => {
                    main.style.transition = 'opacity 1.2s ease';
                    main.style.opacity = '1';
                    
                    // Animate chapters in sequence with staggered delay
                    chapters.forEach((chapter, index) => {
                        setTimeout(() => {
                            chapter.style.transition = 'opacity 1s ease, transform 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
                            chapter.style.opacity = '1';
                            chapter.style.transform = 'translateY(0)';
                        }, 300 * index);
                    });
                    
                    // Finally reveal the footer
                    setTimeout(() => {
                        footer.style.transition = 'opacity 1s ease';
                        footer.style.opacity = '1';
                    }, 300 * chapters.length + 500);
                    
                }, 600);
            }, 600);
        }, 300);
    }, 300);
});

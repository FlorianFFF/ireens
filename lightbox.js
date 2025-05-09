document.addEventListener('DOMContentLoaded', function() {
    // Create the lightbox elements with navigation buttons
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'lightbox-container';
    lightboxContainer.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-nav lightbox-prev"><span>&lt;</span></div>
            <div class="lightbox-nav lightbox-next"><span>&gt;</span></div>
            <img class="lightbox-img">
            <div class="lightbox-caption"></div>
        </div>
    `;
    document.body.appendChild(lightboxContainer);

    // Get lightbox elements
    const lightbox = document.querySelector('.lightbox-container');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const caption = document.querySelector('.lightbox-caption');
    
    let currentImageIndex = 0;
    const galleryImages = document.querySelectorAll('.gallery img');
    
    // Add click events to gallery images
    galleryImages.forEach((img) => {
        img.addEventListener('click', function() {
            currentImageIndex = Array.from(galleryImages).indexOf(this);
            openLightbox(this);
        });
    });
    
    // Function to open lightbox with an image
    function openLightbox(imgElement) {
        lightboxImg.src = imgElement.src;
        updateCaption();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Show/hide nav buttons based on position
        updateNavButtons();
    }
    
    // Update the caption based on alt text
    function updateCaption() {
        const altText = galleryImages[currentImageIndex].alt || '';
        caption.textContent = altText;
    }
    
    // Show/hide navigation buttons based on current image
    function updateNavButtons() {
        prevBtn.style.display = currentImageIndex > 0 ? 'block' : 'none';
        nextBtn.style.display = currentImageIndex < galleryImages.length - 1 ? 'block' : 'none';
    }
    
    // Navigation buttons functionality
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage(-1);
    });
    
    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        navigateImage(1);
    });
    
    // Navigate with arrow keys
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        } else if (e.key === 'Escape') {
            closeLightbox();
        }
    });
    
    // Function to navigate between images
    function navigateImage(direction) {
        // Add a quick fade-out transition
        lightboxImg.style.opacity = '0';
        
        setTimeout(() => {
            currentImageIndex += direction;
            
            // Ensure index is within bounds
            if (currentImageIndex < 0) currentImageIndex = 0;
            if (currentImageIndex >= galleryImages.length) currentImageIndex = galleryImages.length - 1;
            
            // Update image and details
            lightboxImg.src = galleryImages[currentImageIndex].src;
            updateCaption();
            updateNavButtons();
            
            // Fade back in
            setTimeout(() => {
                lightboxImg.style.opacity = '1';
            }, 50);
        }, 200);
    }
    
    // Close lightbox when clicking the close button
    closeBtn.addEventListener('click', function() {
        closeLightbox();
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        // Only close if clicking directly on the dark overlay
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

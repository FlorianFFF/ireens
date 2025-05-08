document.addEventListener('DOMContentLoaded', function() {
    // Create the lightbox elements
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'lightbox-container';
    lightboxContainer.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-img">
        </div>
    `;
    document.body.appendChild(lightboxContainer);

    // Get lightbox elements
    const lightbox = document.querySelector('.lightbox-container');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    
    // Add click events to all gallery images
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
        });
    });
    
    // Close lightbox when clicking the close button
    closeBtn.addEventListener('click', function() {
        closeLightbox();
    });
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        // Only close if clicking outside of the image (on the dark overlay)
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // Function to close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

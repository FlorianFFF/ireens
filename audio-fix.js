document.addEventListener('DOMContentLoaded', function() {
    // Get all audio elements
    const audioPlayers = document.querySelectorAll('.custom-audio');
    
    // For each audio player, add custom event handling 
    audioPlayers.forEach(function(audio) {
        // Ensure audio is fully loaded
        audio.addEventListener('loadedmetadata', function() {
            console.log('Audio metadata loaded');
            // This helps ensure the duration is properly available
            audio.preload = 'auto';
        });
        
        // Create a wrapper for better click handling
        const wrapper = document.createElement('div');
        wrapper.className = 'audio-progress-wrapper';
        audio.parentNode.insertBefore(wrapper, audio);
        wrapper.appendChild(audio);
        
        // Handle clicks on the timeline
        audio.addEventListener('timeupdate', function() {
            // This event ensures the timeline updates correctly
            console.log('Time update: ' + audio.currentTime);
        });
        
        // Fix for Safari and Chrome - ensure seeking works properly
        wrapper.addEventListener('click', function(e) {
            if (e.target === audio) {
                // Prevent default only if clicking on the actual audio element
                e.preventDefault();
                
                // Get the click position relative to the audio element
                const rect = audio.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                
                // Calculate the new time based on click position
                if (width > 0 && audio.duration) {
                    const newTime = (clickX / width) * audio.duration;
                    // Set the new time
                    if (newTime >= 0 && newTime <= audio.duration) {
                        audio.currentTime = newTime;
                        console.log('Seeking to: ' + newTime);
                    }
                }
            }
        });
    });
});

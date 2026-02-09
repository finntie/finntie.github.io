//Video play on hover
document.addEventListener('DOMContentLoaded', function(){
    const buttons = document.querySelectorAll('.page-info-button');

    buttons.forEach(button => {
        const video = button.querySelector('video');
        if (video) {
            video.addEventListener('mouseenter', function() {
                video.play().catch(error => {
                console.log('Play interrupted:', error);
        });
            });
            video.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0; // Reset to beginning
            });
        }
    });
});

// Highlight active sidebar link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const sidebarLinks = document.querySelectorAll('.sidebar-nav-link');
  const currentPath = window.location.pathname;
  
  sidebarLinks.forEach(link => {
    // Check if the link's href matches current page
    if (link.getAttribute('href') === currentPath || 
        currentPath.includes(link.getAttribute('href'))) {
      link.classList.add('active');
    }
    
    // Add click animation
    link.addEventListener('click', function(e) {
      // Remove active from all links
      sidebarLinks.forEach(l => l.classList.remove('active'));
      // Add active to clicked link
      this.classList.add('active');
    });
  });
});

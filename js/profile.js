document.addEventListener('DOMContentLoaded', function() {
    // Profile tab navigation
    const navLinks = document.querySelectorAll('.profile-nav-item');
    const tabContents = document.querySelectorAll('.profile-tab-content');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target tab ID
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all tabs and links
            navLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked link and corresponding tab
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            // For mobile screens, scroll to content
            if (window.innerWidth < 992) {
                const profileContent = document.querySelector('.profile-content');
                profileContent.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // User menu toggle
    const userMenuToggle = document.querySelector('.user-menu-toggle');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userMenuToggle && userDropdown) {
        userMenuToggle.addEventListener('click', function() {
            userDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userMenuToggle.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }
    
    // Logout functionality
    const logoutLink = document.querySelector('.logout-link');
    
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            // For frontend demo, simply redirect to home page
            window.location.href = 'index.html';
        });
    }
});
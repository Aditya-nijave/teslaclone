document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    
    // Only initialize mobile menu if we're on a mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Set initial state based on screen size
    if (isMobile) {
        navLinks.classList.add('mobile');
    } else {
        navLinks.classList.remove('mobile');
    }
    
    mobileMenuBtn.addEventListener('click', function(event) {
        // Prevent the click from propagating to document
        event.stopPropagation();
        
        navLinks.classList.toggle('show');
        
        // Change icon based on menu state
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('show')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            
            // Add no-scroll to body when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Restore scrolling when menu is closed
            document.body.style.overflow = '';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        // Only run this if we're in mobile view
        if (window.innerWidth <= 768) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnMenuBtn = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnMenuBtn && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                
                // Restore scrolling
                document.body.style.overflow = '';
            }
        }
    });
    
    // Handle resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Reset to desktop view
            navLinks.classList.remove('show', 'mobile');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            // Always ensure scrolling is enabled in desktop view
            document.body.style.overflow = '';
        } else {
            // Add mobile class for styling
            navLinks.classList.add('mobile');
        }
    });
    
    // Add smooth transitions for menu items
    const navItems = navLinks.querySelectorAll('p');
    navItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.05}s`;
    });
});
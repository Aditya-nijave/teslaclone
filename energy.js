// // Wait for the DOM to be fully loaded
// document.addEventListener('DOMContentLoaded', function() {
//     // Create mobile menu button
//     const mobileMenuButton = document.createElement('button');
//     mobileMenuButton.className = 'mobile-menu-button';
//     mobileMenuButton.innerHTML = '☰';
    
//     // Create mobile menu container
//     const mobileMenu = document.createElement('div');
//     mobileMenu.className = 'mobile-menu';
    
//     // Create close button
//     const closeButton = document.createElement('button');
//     closeButton.className = 'close-menu';
//     closeButton.innerHTML = '✕';
    
//     // Create mobile links container
//     const mobileLinks = document.createElement('div');
//     mobileLinks.className = 'mobile-menu-links';
    
//     // Get navigation links from the main nav
//     const navLinks = document.querySelectorAll('.nav .top, .nav .rem');
    
//     // Create mobile overlay
//     const mobileOverlay = document.createElement('div');
//     mobileOverlay.className = 'mobile-overlay';
    
//     // Clone navigation links for mobile menu
//     navLinks.forEach(link => {
//         const clone = link.cloneNode(true);
//         mobileLinks.appendChild(clone);
//     });
    
//     // Add sidebar links
//     const sidebarLinks = document.querySelectorAll('.ver, .ut');
//     sidebarLinks.forEach(link => {
//         const clone = link.cloneNode(true);
//         mobileLinks.appendChild(clone);
//     });
    
//     // Append elements to mobile menu
//     mobileMenu.appendChild(closeButton);
//     mobileMenu.appendChild(mobileLinks);
    
//     // Add mobile menu and overlay to the body
//     document.body.appendChild(mobileMenu);
//     document.body.appendChild(mobileOverlay);
    
//     // Insert mobile menu button to nav
//     const nav = document.querySelector('.nav');
//     nav.appendChild(mobileMenuButton);
    
//     // Event listeners for mobile menu
//     mobileMenuButton.addEventListener('click', function() {
//         mobileMenu.classList.add('active');
//         mobileOverlay.style.display = 'block';
//         document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
//     });
    
//     closeButton.addEventListener('click', closeMenu);
//     mobileOverlay.addEventListener('click', closeMenu);
    
//     // Close menu function
//     function closeMenu() {
//         mobileMenu.classList.remove('active');
//         mobileOverlay.style.display = 'none';
//         document.body.style.overflow = ''; // Restore scrolling
//     }
    
//     // Close menu when clicking on a link
//     const mobileMenuLinks = mobileMenu.querySelectorAll('a');
//     mobileMenuLinks.forEach(link => {
//         link.addEventListener('click', closeMenu);
//     });
    
//     // Handle window resize
//     window.addEventListener('resize', function() {
//         if (window.innerWidth > 768) {
//             mobileMenu.classList.remove('active');
//             mobileOverlay.style.display = 'none';
//             document.body.style.overflow = '';
//         }
//     });
// });
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    // Create mobile menu button
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.setAttribute('aria-label', 'Open menu');
    
    // Create mobile menu container
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-menu';
    closeButton.innerHTML = '✕';
    closeButton.setAttribute('aria-label', 'Close menu');
    
    // Create mobile links container
    const mobileLinks = document.createElement('div');
    mobileLinks.className = 'mobile-menu-links';
    
    // Get navigation links from the main nav
    const navLinks = document.querySelectorAll('.nav .top, .nav .rem');
    
    // Create mobile overlay
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    
    // Clone navigation links for mobile menu
    navLinks.forEach(link => {
        const clone = link.cloneNode(true);
        mobileLinks.appendChild(clone);
    });
    
    // Add sidebar links
    const sidebarLinks = document.querySelectorAll('.ver, .ut');
    sidebarLinks.forEach(link => {
        const clone = link.cloneNode(true);
        mobileLinks.appendChild(clone);
    });
    
    // Append elements to mobile menu
    mobileMenu.appendChild(closeButton);
    mobileMenu.appendChild(mobileLinks);
    
    // Add mobile menu and overlay to the body
    document.body.appendChild(mobileMenu);
    document.body.appendChild(mobileOverlay);
    
    // Insert mobile menu button to nav
    const nav = document.querySelector('.nav');
    nav.appendChild(mobileMenuButton);
    
    // Function to show menu
    function openMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        mobileMenu.setAttribute('aria-hidden', 'false');
    }
    
    // Function to hide menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
        mobileMenu.setAttribute('aria-hidden', 'true');
    }
    
    // Event listeners for mobile menu
    mobileMenuButton.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);
    
    // Close menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll('a, p');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    // Handle keyboard accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
    
    // Add swipe functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50 && window.innerWidth <= 768) {
            // Swipe left
            openMenu();
        }
        
        if (touchEndX > touchStartX + 50 && mobileMenu.classList.contains('active')) {
            // Swipe right
            closeMenu();
        }
    }
});
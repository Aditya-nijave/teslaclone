// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Restructure the HTML for responsive navigation
    setupResponsiveNav();
    
    // Add hover effects and click handlers
    setupInteractivity();
    
    // Add smooth scrolling
    setupSmoothScroll();
    
    // Initialize any sliders or carousels
    setupImageSlider();
});

function setupResponsiveNav() {
    // Create mobile menu button
    const nav = document.querySelector('.nav');
    
    // Create button element
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Create container for nav links
    const navLinksContainer = document.createElement('div');
    navLinksContainer.className = 'nav-links';
    
    // Move all navigation links except the logo into the container
    const navItems = Array.from(nav.children).slice(1);
    navItems.forEach(item => {
        navLinksContainer.appendChild(item.cloneNode(true));
    });
    
    // Keep only the logo in the original nav
    while (nav.children.length > 1) {
        nav.removeChild(nav.lastChild);
    }
    
    // Append the button and container to the nav
    nav.appendChild(mobileMenuBtn);
    nav.appendChild(navLinksContainer);
    
    // Add click event to toggle menu
    mobileMenuBtn.addEventListener('click', function() {
        navLinksContainer.classList.toggle('active');
    });
}

function setupInteractivity() {
    // Add hover effects for category items
    const categoryItems = document.querySelectorAll('.one, .two, .three');
    
    categoryItems.forEach(item => {
        // Add click handler to navigate to respective pages
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('.para').textContent.trim();
            console.log(`Navigating to ${categoryName} page`);
            // In a real implementation, you'd redirect to the appropriate page
            // window.location.href = `${categoryName.toLowerCase().replace(' ', '-')}.html`;
        });
    });
    
    // Make vertical menu items interactive
    const verticalMenuItems = document.querySelectorAll('.ver');
    
    verticalMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const featureName = this.textContent.trim();
            console.log(`Opening ${featureName} feature`);
            // Here you'd implement the specific feature functionality
            
            // Example: Show a modal with feature info
            showFeatureModal(featureName);
        });
    });
    
    // Add interaction for "Learn" and "Shop" links
    const actionLinks = document.querySelectorAll('.l, .le, .o, .o3');
    
    actionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the parent category click
            
            const action = this.textContent.trim();
            const category = this.closest('.one, .two, .three').querySelector('.para').textContent.trim();
            
            console.log(`${action} about ${category}`);
            // Implement the specific action (navigate to learn page, shop page, etc.)
        });
    });
}

function showFeatureModal(featureName) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'feature-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0,0,0,0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';
    
    // Create modal content
    const content = document.createElement('div');
    content.style.backgroundColor = 'white';
    content.style.padding = '30px';
    content.style.borderRadius = '10px';
    content.style.maxWidth = '600px';
    content.style.width = '80%';
    content.style.position = 'relative';
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.right = '15px';
    closeBtn.style.top = '10px';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.cursor = 'pointer';
    
    // Add feature content (customize based on the feature)
    const title = document.createElement('h2');
    title.textContent = featureName;
    
    const description = document.createElement('p');
    
    // Set description based on feature
    switch(featureName) {
        case 'HelpMeCharge':
            description.innerHTML = 'Get personalized recommendations for charging solutions based on your driving habits and vehicle model.';
            break;
        case 'ChargingCalculator':
            description.innerHTML = 'Calculate charging times and costs for different charging options and electricity rates.';
            break;
        case 'ChargingWithNACS':
            description.innerHTML = 'Learn about the North American Charging Standard and how it works with your Tesla vehicle.';
            break;
        case 'SuperchargerVoting':
            description.innerHTML = 'Vote on locations for new Supercharger stations and see which areas have the most demand.';
            break;
        case 'HostaSupercharger':
            description.innerHTML = 'Find out how you can host a Supercharger at your business or property.';
            break;
        case 'CommercialCharging':
            description.innerHTML = 'Explore charging solutions for business fleets and commercial properties.';
            break;
        case 'HostWallConnectors':
            description.innerHTML = 'Learn how to become a host for Tesla Wall Connectors at your location.';
            break;
        default:
            description.innerHTML = 'More information about this feature coming soon.';
    }
    
    // Add button to try the feature
    const tryButton = document.createElement('button');
    tryButton.textContent = 'Try Now';
    tryButton.style.backgroundColor = '#3e6ae1';
    tryButton.style.color = 'white';
    tryButton.style.padding = '10px 20px';
    tryButton.style.border = 'none';
    tryButton.style.borderRadius = '5px';
    tryButton.style.marginTop = '20px';
    tryButton.style.cursor = 'pointer';
    
    // Assemble modal
    content.appendChild(closeBtn);
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(tryButton);
    modal.appendChild(content);
    
    // Add to body
    document.body.appendChild(modal);
    
    // Add close functionality
    closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Add escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    });
    
    // Button action
    tryButton.addEventListener('click', function() {
        console.log(`Launching ${featureName} tool`);
        // Here you would implement the actual feature launch
        document.body.removeChild(modal);
    });
}

function setupSmoothScroll() {
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupImageSlider() {
    // This would implement a simple image slider/carousel for the category images
    // For demonstration purposes, we'll add a simple hover effect
    const images = document.querySelectorAll('.s, .r3, .y, .cy');
    
    images.forEach(img => {
        // Store original src
        const originalSrc = img.src;
        
        // Create alternative image sources (in a real app, you'd have actual alternative images)
        const altSrc = originalSrc.replace('.avif', '-alt.avif');
        
        // Add hover effect to change image
        img.addEventListener('mouseenter', function() {
            // In a real implementation, you'd use actual alternative images
            // For now we'll just add a CSS effect
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Enhance accessibility
function enhanceAccessibility() {
    // Add appropriate ARIA attributes
    const navItems = document.querySelectorAll('.nav a, .nav p');
    navItems.forEach(item => {
        if (!item.hasAttribute('href')) {
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
        }
    });
    
    // Make clickable items keyboard accessible
    document.querySelectorAll('[role="button"], .l, .le, .o, .o3, .ver').forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// Call this after DOM loads
document.addEventListener('DOMContentLoaded', enhanceAccessibility);
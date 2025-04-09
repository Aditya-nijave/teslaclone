

document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu button
    const nav = document.querySelector('.nav');
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Move Tesla logo and add mobile menu button
    const teslaLogo = document.querySelector('.tesla');
    const navLinks = document.createElement('div');
    navLinks.className = 'nav-links';
    
    // Get all navigation links except Tesla logo
    const links = Array.from(nav.querySelectorAll('p:not(.tesla)'));
    
    // Clear nav and restructure it
    nav.innerHTML = '';
    nav.appendChild(teslaLogo);
    nav.appendChild(navLinks);
    nav.appendChild(mobileMenuBtn);
    
    // Add links to the nav-links container
    links.forEach(link => {
        navLinks.appendChild(link);
    });
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Change menu icon based on state
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '✕';
        } else {
            mobileMenuBtn.innerHTML = '☰';
        }
    });
    
    // Create accordion sections for mobile view
    const content = document.getElementById('content');
    const sections = [
        {
            id: 'resources-section',
            title: 'Resources'
        },
        {
            id: 'locations-section',
            title: 'Location Services'
        },
        {
            id: 'company-section',
            title: 'Company'
        }
    ];
    
    // Function to handle window resize
    function handleResize() {
        if (window.innerWidth <= 768) {
            // Set up accordions for mobile
            sections.forEach(section => {
                const sectionEl = document.getElementById(section.id);
                if (sectionEl && !sectionEl.querySelector('.accordion-header')) {
                    // Create header if it doesn't exist
                    const sectionContent = sectionEl.innerHTML;
                    const headerEl = document.createElement('div');
                    headerEl.className = 'accordion-header';
                    headerEl.textContent = section.title;
                    
                    const contentEl = document.createElement('div');
                    contentEl.className = 'accordion-content';
                    contentEl.innerHTML = sectionContent;
                    
                    sectionEl.innerHTML = '';
                    sectionEl.appendChild(headerEl);
                    sectionEl.appendChild(contentEl);
                    
                    // Add click event
                    headerEl.addEventListener('click', function() {
                        this.classList.toggle('active');
                        contentEl.classList.toggle('active');
                    });
                }
            });
        }
    }
    
    // Initial execution and add resize listener
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            !event.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        }
    });
    
    // Add mobile footer
    function addMobileFooter() {
        if (window.innerWidth <= 768 && !document.querySelector('.mobile-footer')) {
            const mobileFooter = document.createElement('div');
            mobileFooter.className = 'mobile-footer';
            mobileFooter.innerHTML = `
                <p>© ${new Date().getFullYear()} Tesla, Inc.</p>
                <p>Privacy & Legal</p>
            `;
            document.querySelector('.card').appendChild(mobileFooter);
        }
    }
    
    addMobileFooter();
    window.addEventListener('resize', addMobileFooter);
});
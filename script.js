document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const body = document.body;
    
    hamburger.addEventListener('click', function() {
        body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (body.classList.contains('menu-open') && 
            !event.target.closest('.mobile-menu') && 
            !event.target.closest('.hamburger')) {
            body.classList.remove('menu-open');
        }
    });
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.feature-content, .feature-image, .specs-grid, .specs-cta, .order-content');
    
    // Add fade-in class to all elements we want to animate
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Once the animation is done, we can unobserve the element
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Observe all fade elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Change navbar color based on scroll position and section background
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    
    function updateNavbarColor() {
        let scrollPosition = window.scrollY;
        
        // Default to transparent with white text for the hero section
        let navbarBackground = 'transparent';
        let textColor = 'white';
        
        // Check which section is currently in view
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
                // If we're in a dark section, use white text
                if (section.id === 'hero' || section.id === 'specs' || section.id === 'order') {
                    textColor = 'white';
                } else {
                    textColor = '#171a20';
                }
                
                // Add background to navbar after scrolling past hero
                if (section.id !== 'hero') {
                    navbarBackground = 'rgba(255, 255, 255, 0.95)';
                }
            }
        });
        
        navbar.style.backgroundColor = navbarBackground;
        navbar.style.color = textColor;
        
        // Update logo and links color
        document.querySelector('.logo a').style.color = textColor;
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.style.color = textColor;
        });
        
        // Update hamburger color
        document.querySelectorAll('.hamburger span').forEach(span => {
            span.style.backgroundColor = textColor;
        });
    }
    
    // Initial call to set the right colors
    updateNavbarColor();
    
    // Update on scroll
    window.addEventListener('scroll', updateNavbarColor);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (body.classList.contains('menu-open')) {
                    body.classList.remove('menu-open');
                }
            }
        });
    });
    
    // Modal functionality
    const overlay = document.querySelector('.overlay');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const orderButtons = document.querySelectorAll('.order-btn');
    const demoButtons = document.querySelectorAll('.demo-btn');
    const compareButton = document.querySelector('.compare-btn');
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    const orderModal = document.getElementById('order-modal');
    const demoModal = document.getElementById('demo-modal');
    const compareModal = document.getElementById('compare-modal');
    const featureModal = document.getElementById('feature-modal');
    const successModal = document.getElementById('success-modal');
    
    // Function to open a modal
    function openModal(modal) {
        overlay.style.display = 'block';
        modal.style.display = 'block';
        body.classList.add('modal-open');
        
        // Prevent background scrolling
        body.style.overflow = 'hidden';
    }
    
    // Function to close all modals
    function closeAllModals() {
        overlay.style.display = 'none';
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        body.classList.remove('modal-open');
        
        // Re-enable scrolling
        body.style.overflow = '';
    }
    
    // Open Order Modal
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(orderModal);
        });
    });
    
    // Open Demo Modal
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(demoModal);
            
            // Set minimum date to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('demo-date').min = today;
        });
    });
    
    // Open Compare Modal
    if (compareButton) {
        compareButton.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(compareModal);
        });
    }
    
    // Open Feature Modal
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const section = this.getAttribute('data-section');
            const title = document.getElementById('feature-modal-title');
            const interiorDetails = document.getElementById('interior-details');
            const performanceDetails = document.getElementById('performance-details');
            
            // Reset
            interiorDetails.classList.remove('active');
            performanceDetails.classList.remove('active');
            
            // Set content based on section
            if (section === 'interior') {
                title.textContent = 'Interior of the Future';
                interiorDetails.classList.add('active');
            } else if (section === 'performance') {
                title.textContent = 'Unmatched Performance';
                performanceDetails.classList.add('active');
            }
            
            openModal(featureModal);
        });
    });
    
    // Close modals with close button
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Close modals when clicking on overlay
    overlay.addEventListener('click', closeAllModals);
    
    // Close success modal with continue button
    document.querySelectorAll('.close-success').forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Order form functionality
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            closeAllModals();
            document.getElementById('success-title').textContent = 'Order Received!';
            document.getElementById('success-message').textContent = 'Thank you for your order. A Tesla Advisor will contact you shortly to confirm your order details.';
            openModal(successModal);
        });
    }
    
    // Demo form functionality
    const demoForm = document.getElementById('demo-form');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            closeAllModals();
            document.getElementById('success-title').textContent = 'Demo Drive Scheduled!';
            document.getElementById('success-message').textContent = 'Your demo drive has been scheduled. We will send you a confirmation email with all the details.';
            openModal(successModal);
        });
    }
    
    // Order Plaid button in compare modal
    const orderPlaidBtn = document.querySelector('.order-plaid-btn');
    if (orderPlaidBtn) {
        orderPlaidBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close compare modal
            closeAllModals();
            
            // Open order modal and select Plaid option
            openModal(orderModal);
            
            // Select the Plaid option
            const plaidOption = document.querySelectorAll('.option-card')[1];
            if (plaidOption) {
                document.querySelectorAll('.option-card').forEach(card => {
                    card.classList.remove('active');
                });
                plaidOption.classList.add('active');
                
                // Update summary
                updateOrderSummary();
            }
        });
    }
    
    // Order configurator functionality
    const modelOptions = document.querySelectorAll('.model-options .option-card');
    const colorOptions = document.querySelectorAll('.color-option');
    const wheelOptions = document.querySelectorAll('.wheel-options .option-card');
    const interiorOptions = document.querySelectorAll('.interior-options .option-card');
    const selectedColorText = document.querySelector('.selected-color');
    const totalPriceElement = document.getElementById('total-price');
    
    // Function to update the order summary
    function updateOrderSummary() {
        let basePrice = 0;
        let paintPrice = 0;
        let wheelPrice = 0;
        let interiorPrice = 0;
        
        // Get selected model price
        document.querySelectorAll('.model-options .option-card.active').forEach(card => {
            basePrice = parseInt(card.getAttribute('data-price'));
        });
        
        // Get selected color price
        document.querySelectorAll('.color-option.active').forEach(option => {
            paintPrice = parseInt(option.getAttribute('data-price'));
        });
        
        // Get selected wheel price
        document.querySelectorAll('.wheel-options .option-card.active').forEach(card => {
            wheelPrice = parseInt(card.getAttribute('data-price'));
        });
        
        // Get selected interior price
        document.querySelectorAll('.interior-options .option-card.active').forEach(card => {
            interiorPrice = parseInt(card.getAttribute('data-price'));
        });
        
        // Update summary items
        const summaryItems = document.querySelectorAll('.summary-item');
        
        // Model
        summaryItems[0].querySelector('span:last-child').textContent = '$' + basePrice.toLocaleString();
        
        // Paint
        summaryItems[1].querySelector('span:last-child').textContent = paintPrice > 0 ? '$' + paintPrice.toLocaleString() : 'Included';
        
        // Wheels
        summaryItems[2].querySelector('span:last-child').textContent = wheelPrice > 0 ? '$' + wheelPrice.toLocaleString() : 'Included';
        
        // Interior
        summaryItems[3].querySelector('span:last-child').textContent = interiorPrice > 0 ? '$' + interiorPrice.toLocaleString() : 'Included';
        
        // Calculate total
        const totalPrice = basePrice + paintPrice + wheelPrice + interiorPrice;
        
        // Update total price
        if (totalPriceElement) {
            totalPriceElement.textContent = '$' + totalPrice.toLocaleString();
        }
    }
    
    // Model selection
    modelOptions.forEach(option => {
        option.addEventListener('click', function() {
            modelOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            updateOrderSummary();
        });
    });
    
    // Color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const colorName = this.getAttribute('data-color');
            const colorPrice = parseInt(this.getAttribute('data-price'));
            
            if (selectedColorText) {
                selectedColorText.textContent = colorName + (colorPrice > 0 ? ' - $' + colorPrice.toLocaleString() : ' - Included');
            }
            
            updateOrderSummary();
        });
    });
    
    // Wheel selection
    wheelOptions.forEach(option => {
        option.addEventListener('click', function() {
            wheelOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            updateOrderSummary();
        });
    });
    
    // Interior selection
    interiorOptions.forEach(option => {
        option.addEventListener('click', function() {
            interiorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            updateOrderSummary();
        });
    });
    
    // Initialize order summary
    updateOrderSummary();
});
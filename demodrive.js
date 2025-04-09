
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    // Form validation
    const form = document.querySelector('.driver-details');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            
            let isValid = true;
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            
            // First Name validation
            if (!firstName.value.trim()) {
                displayError(firstName, 'First name is required');
                isValid = false;
            }
            
            // Last Name validation
            if (!lastName.value.trim()) {
                displayError(lastName, 'Last name is required');
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                displayError(email, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                displayError(email, 'Please enter a valid email');
                isValid = false;
            }
            
            // Phone validation
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
            if (!phone.value.trim()) {
                displayError(phone, 'Phone number is required');
                isValid = false;
            } else if (!phoneRegex.test(phone.value)) {
                displayError(phone, 'Format: (555) 555-5555');
                isValid = false;
            }
            
            // If validation passes
            if (isValid) {
                alert('Form submitted successfully!');
                // Here you would typically send the data to a server
                // form.submit();
            }
        });
    }
    
    function displayError(input, message) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
        }
        input.style.borderColor = '#e82110';
        input.addEventListener('input', function() {
            this.style.borderColor = '#d0d1d2';
            errorElement.textContent = '';
        }, { once: true });
    }
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = '(' + value.substring(0, 3);
            }
            if (value.length > 3) {
                formattedValue += ') ' + value.substring(3, 6);
            }
            if (value.length > 6) {
                formattedValue += '-' + value.substring(6, 10);
            }
            
            e.target.value = formattedValue;
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('locationSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput && searchResults) {
        // Sample locations data - in a real app, this would come from an API
        const locations = [
            "Tesla Store - Los Angeles",
            "Tesla Service Center - San Francisco",
            "Tesla Store - New York",
            "Tesla Service Center - Chicago",
            "Tesla Store - Miami",
            "Tesla Service Center - Seattle"
        ];
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchResults.innerHTML = '';
            
            if (searchTerm.length > 2) {
                const filteredLocations = locations.filter(location => 
                    location.toLowerCase().includes(searchTerm)
                );
                
                if (filteredLocations.length > 0) {
                    filteredLocations.forEach(location => {
                        const resultItem = document.createElement('div');
                        resultItem.textContent = location;
                        resultItem.addEventListener('click', function() {
                            searchInput.value = location;
                            searchResults.style.display = 'none';
                        });
                        searchResults.appendChild(resultItem);
                    });
                    searchResults.style.display = 'block';
                } else {
                    searchResults.style.display = 'none';
                }
            } else {
                searchResults.style.display = 'none';
            }
        });
        
        // Hide results when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target !== searchInput) {
                searchResults.style.display = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                mainNav.classList.remove('active');
            }
        });
    });
});
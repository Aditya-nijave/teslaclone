document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('accountForm');
    const inputs = document.querySelectorAll('.form-control');
    
    // Add floating label effect
    inputs.forEach(input => {
        // Add focus animation
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus animation if field is empty
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add validation styling
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Format card number with spaces
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            this.value = formattedValue;
        });
    }
    
    // Format phone number
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            let formattedValue = '';
            
            if (value.length > 0) {
                formattedValue = '(';
                formattedValue += value.substring(0, 3);
            }
            
            if (value.length >= 4) {
                formattedValue += ') ';
                formattedValue += value.substring(3, 6);
            }
            
            if (value.length >= 7) {
                formattedValue += '-';
                formattedValue += value.substring(6, 10);
            }
            
            this.value = formattedValue;
        });
    }
    
    // Email validation
    const emailInput = document.getElementById('email');
    const confirmEmailInput = document.getElementById('confirmEmail');
    
    if (confirmEmailInput) {
        confirmEmailInput.addEventListener('input', function() {
            if (this.value !== emailInput.value) {
                this.setCustomValidity('Email addresses do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Form submission with animation
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            const isValid = form.checkValidity();
            
            if (isValid) {
                // Add submission animation
                document.querySelectorAll('.form-group').forEach((group, index) => {
                    setTimeout(() => {
                        group.style.opacity = '0';
                        group.style.transform = 'translateY(-10px)';
                    }, index * 50);
                });
                
                // Show success message after animation
                setTimeout(() => {
                    form.innerHTML = `
                        <div class="success-message" style="text-align: center; padding: 40px 0;">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h2 style="margin-top: 20px; color: #4CAF50;">Account Created Successfully!</h2>
                            <p style="margin-top: 10px; color: #666;">Thank you for submitting your information.</p>
                        </div>
                    `;
                    
                    // Animate success message
                    const successMessage = document.querySelector('.success-message');
                    successMessage.style.opacity = '0';
                    successMessage.style.transform = 'scale(0.9)';
                    
                    setTimeout(() => {
                        successMessage.style.transition = 'all 0.5s ease';
                        successMessage.style.opacity = '1';
                        successMessage.style.transform = 'scale(1)';
                    }, 100);
                }, 600);
            } else {
                // Highlight invalid fields with shake animation
                const invalidInputs = form.querySelectorAll(':invalid');
                invalidInputs.forEach(input => {
                    input.style.animation = 'shake 0.5s ease';
                    input.style.borderColor = '#ff3860';
                    
                    setTimeout(() => {
                        input.style.animation = '';
                    }, 500);
                });
            }
        });
    }
    
    // Add shake animation for invalid inputs
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-5px); }
                40%, 80% { transform: translateX(5px); }
            }
            
            .success-message svg {
                animation: checkmark 1s ease-in-out forwards;
            }
            
            @keyframes checkmark {
                0% { 
                    stroke-dasharray: 100;
                    stroke-dashoffset: 100;
                    transform: scale(0.8);
                }
                100% { 
                    stroke-dasharray: 100;
                    stroke-dashoffset: 0;
                    transform: scale(1);
                }
            }
        </style>
    `);
});


document.addEventListener('DOMContentLoaded', function() {
    const viewMoreInfoBtn = document.getElementById('viewMoreInfo');
    const additionalContent = document.getElementById('additionalContent');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    // Toggle additional information
    viewMoreInfoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (additionalContent.style.display === 'block') {
            additionalContent.style.display = 'none';
            viewMoreInfoBtn.textContent = 'View additional information';
        } else {
            additionalContent.style.display = 'block';
            viewMoreInfoBtn.textContent = 'Hide additional information';
        }
    });
    
    // Add animation to the Place Order button
    placeOrderBtn.addEventListener('mouseover', function() {
        this.classList.add('pulse');
        
        // Remove the class after animation completes
        setTimeout(() => {
            this.classList.remove('pulse');
        }, 500);
    });
    
    // Simulate order placement
    placeOrderBtn.addEventListener('click', function() {
        // Add loading state
        this.textContent = 'Processing...';
        this.disabled = true;
        this.style.backgroundColor = '#a0b4ff';
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            const paymentSummary = document.querySelector('.payment-summary');
            paymentSummary.innerHTML = `
                <div style="text-align: center; padding: 20px 0;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <h2 style="margin-top: 16px; color: #4CAF50;">Order Placed Successfully!</h2>
                    <p style="margin-top: 8px; color: #666;">Your order has been confirmed. You will receive a confirmation email shortly.</p>
                    <p style="margin-top: 16px; font-weight: 500;">Order Total: $250</p>
                    <button class="place-order-btn" style="margin-top: 20px; background-color: #4CAF50;">View Order Details</button>
                </div>
            `;
            
            // Add animation to the success icon
            const successIcon = document.querySelector('svg');
            successIcon.style.animation = 'checkmark 1s ease-in-out forwards';
            
            // Add the checkmark animation
            document.head.insertAdjacentHTML('beforeend', `
                <style>
                    @keyframes checkmark {
                        0% { 
                            stroke-dasharray: 100;
                            stroke-dashoffset: 100;
                            transform: scale(0.8);
                        }
                        100% { 
                            stroke-dasharray: 100;
                            stroke-dashoffset: 0;
                            transform: scale(1);
                        }
                    }
                </style>
            `);
        }, 1500);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const galleryWrapper = document.getElementById('galleryWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const itemWidth = galleryItems[0].offsetWidth + 20; // Width + margin
    
    // Scroll to next/previous item
    nextBtn.addEventListener('click', function() {
        galleryWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', function() {
        galleryWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });
    
    // Optional: Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            galleryWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
            galleryWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
    });
    
    // Optional: Show/hide navigation buttons based on scroll position
    galleryWrapper.addEventListener('scroll', function() {
        const scrollPosition = galleryWrapper.scrollLeft;
        const maxScroll = galleryWrapper.scrollWidth - galleryWrapper.clientWidth;
        
        prevBtn.style.opacity = scrollPosition <= 0 ? '0.5' : '1';
        nextBtn.style.opacity = scrollPosition >= maxScroll ? '0.5' : '1';
    });
    
    // Initialize button states
    prevBtn.style.opacity = '0.5';
    
    // Toggle checkboxes
    document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Previous gallery and checkbox code remains the same
    
    // Accessory selection functionality
    function toggleAccessory(element) {
        element.classList.toggle('selected');
        
        // Update the total price when accessories are selected/deselected
        updateTotalPrice();
    }
    
    // Function to calculate and update the total price
    function updateTotalPrice() {
        let total = 61630; // Base price
        const selectedAccessories = document.querySelectorAll('.accessory-option.selected');
        
        // Add the price of each selected accessory
        selectedAccessories.forEach(accessory => {
            const priceText = accessory.querySelector('.accessory-price').textContent;
            const price = parseInt(priceText.replace(/\D/g, '')); // Extract numbers only
            total += price;
        });
        
        // Update the displayed price
        const formattedTotal = '$' + total.toLocaleString();
        document.querySelector('.total-price span:last-child').textContent = formattedTotal;
        
        // Also update the after-tax-credit price if the checkbox is checked
        if (document.querySelector('#taxCreditCheckbox').classList.contains('checked')) {
            const afterCreditTotal = total - 7500;
            document.querySelector('.price-breakdown span:last-child').textContent = '$' + afterCreditTotal.toLocaleString();
        }
    }
    
    // Add click event listeners to all accessory options
    document.querySelectorAll('.accessory-option').forEach(option => {
        option.addEventListener('click', function() {
            toggleAccessory(this);
        });
    });
    
    // Make sure tax credit checkbox updates the total when toggled
    document.querySelector('#taxCreditCheckbox').addEventListener('click', function() {
        this.classList.toggle('checked');
        updateTotalPrice();
    });
});
// document.addEventListener('DOMContentLoaded', function() {
//     // Gallery functionality
//     const gallery = document.getElementById('gallery');
//     const galleryWrapper = document.getElementById('galleryWrapper');
//     const prevBtn = document.getElementById('prevBtn');
//     const nextBtn = document.getElementById('nextBtn');
//     const galleryItems = document.querySelectorAll('.gallery-item');
    
//     let itemWidth = galleryItems[0].offsetWidth + 20; // Width + margin
    
//     function updateItemWidth() {
//         itemWidth = galleryItems[0].offsetWidth + 20;
//     }
    
//     // Scroll to next/previous item
//     nextBtn.addEventListener('click', function() {
//         galleryWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
//     });
    
//     prevBtn.addEventListener('click', function() {
//         galleryWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
//     });
    
//     // Keyboard navigation
//     document.addEventListener('keydown', function(e) {
//         if (e.key === 'ArrowRight') {
//             galleryWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
//         } else if (e.key === 'ArrowLeft') {
//             galleryWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
//         }
//     });
    
//     // Update button states based on scroll position
//     galleryWrapper.addEventListener('scroll', function() {
//         const scrollPosition = galleryWrapper.scrollLeft;
//         const maxScroll = galleryWrapper.scrollWidth - galleryWrapper.clientWidth;
        
//         prevBtn.style.opacity = scrollPosition <= 10 ? '0.5' : '1';
//         nextBtn.style.opacity = scrollPosition >= maxScroll - 10 ? '0.5' : '1';
//     });
    
//     // Initialize button states
//     prevBtn.style.opacity = '0.5';
    
//     // Checkbox functionality
//     document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
//         checkbox.addEventListener('click', function() {
//             this.classList.toggle('checked');
//             updateTotalPrice();
//         });
//     });
    
//     // Accessory selection functionality
//     document.querySelectorAll('.accessory-option').forEach(option => {
//         option.addEventListener('click', function() {
//             this.classList.toggle('selected');
            
//             const checkbox = this.querySelector('.accessory-checkbox');
//             if (this.classList.contains('selected')) {
//                 checkbox.classList.add('checked');
//             } else {
//                 checkbox.classList.remove('checked');
//             }
            
//             updateTotalPrice();
//         });
//     });
    
//     // Price details toggle
//     const detailsToggle = document.querySelector('.details-toggle');
//     if (detailsToggle) {
//         detailsToggle.addEventListener('click', function() {
//             const priceDetails = document.querySelectorAll('.price-details');
//             const icon = this.querySelector('span:last-child');
            
//             priceDetails.forEach(detail => {
//                 if (detail.style.display === 'none' || !detail.style.display) {
//                     detail.style.display = 'block';
//                     icon.textContent = '▲';
//                 } else {
//                     detail.style.display = 'none';
//                     icon.textContent = '▼';
//                 }
//             });
//         });
//     }
    
//     // Function to calculate and update the total price
//     function updateTotalPrice() {
//         let total = 61630; // Base price
//         const selectedAccessories = document.querySelectorAll('.accessory-option.selected');
        
//         // Add the price of each selected accessory
//         selectedAccessories.forEach(accessory => {
//             const priceText = accessory.querySelector('.accessory-price').textContent;
//             const price = parseInt(priceText.replace(/\D/g, '')); // Extract numbers only
//             total += price;
//         });
        
//         // Update the displayed price
//         const formattedTotal = '$' + total.toLocaleString();
//         document.querySelector('.total-price span:last-child').textContent = formattedTotal;
        
//         // Also update the after-tax-credit price if the checkbox is checked
//         const taxCreditCheckbox = document.querySelector('#taxCreditCheckbox');
//         if (taxCreditCheckbox && taxCreditCheckbox.classList.contains('checked')) {
//             const afterCreditTotal = total - 7500;
//             document.querySelector('.price-breakdown span:last-child').textContent = '$' + afterCreditTotal.toLocaleString();
//         }
//     }
    
//     // Window resize handler
//     window.addEventListener('resize', function() {
//         updateItemWidth();
//     });
    
//     // Mobile menu toggle
//     const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
//     if (mobileMenuBtn) {
//         mobileMenuBtn.addEventListener('click', function() {
//             // This would toggle a mobile menu if we had one
//             console.log('Mobile menu clicked');
//         });
//     }
// });







document.addEventListener('DOMContentLoaded', function() {
    // Back button functionality
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', function() {
        // Go back to previous page
        window.history.back();
    });

    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.getElementById('closeMenu');

    if (mobileMenuBtn && mobileNav && overlay && closeMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        function closeNavMenu() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        closeMenu.addEventListener('click', closeNavMenu);
        overlay.addEventListener('click', closeNavMenu);

        // Mobile nav item click handler
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        mobileNavItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileNavItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                closeNavMenu();
            });
        });
    }

    // Gallery functionality
    const gallery = document.getElementById('gallery');
    const galleryWrapper = document.getElementById('galleryWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    let itemWidth = galleryItems[0].offsetWidth + 20; // Width + margin
    
    function updateItemWidth() {
        itemWidth = galleryItems[0].offsetWidth + 20;
    }
    
    // Scroll to next/previous item
    nextBtn.addEventListener('click', function() {
        galleryWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });
    
    prevBtn.addEventListener('click', function() {
        galleryWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            galleryWrapper.scrollBy({ left: itemWidth, behavior: 'smooth' });
        } else if (e.key === 'ArrowLeft') {
            galleryWrapper.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        }
    });
    
    // Update button states based on scroll position
    galleryWrapper.addEventListener('scroll', function() {
        const scrollPosition = galleryWrapper.scrollLeft;
        const maxScroll = galleryWrapper.scrollWidth - galleryWrapper.clientWidth;
        
        prevBtn.style.opacity = scrollPosition <= 10 ? '0.5' : '1';
        nextBtn.style.opacity = scrollPosition >= maxScroll - 10 ? '0.5' : '1';
    });
    
    // Initialize button states
    prevBtn.style.opacity = '0.5';
    
    // Checkbox functionality
    document.querySelectorAll('.custom-checkbox').forEach(checkbox => {
        checkbox.addEventListener('click', function() {
            this.classList.toggle('checked');
            updateTotalPrice();
        });
    });
    
    // Accessory selection functionality
    document.querySelectorAll('.accessory-option').forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('selected');
            
            const checkbox = this.querySelector('.accessory-checkbox');
            if (this.classList.contains('selected')) {
                checkbox.classList.add('checked');
            } else {
                checkbox.classList.remove('checked');
            }
            
            updateTotalPrice();
        });
    });
    
    // Price details toggle
    const detailsToggle = document.querySelector('.details-toggle');
    if (detailsToggle) {
        detailsToggle.addEventListener('click', function() {
            const priceDetails = document.querySelectorAll('.price-details');
            const icon = this.querySelector('span:last-child');
            
            priceDetails.forEach(detail => {
                if (detail.style.display === 'none' || !detail.style.display) {
                    detail.style.display = 'block';
                    icon.textContent = '▲';
                } else {
                    detail.style.display = 'none';
                    icon.textContent = '▼';
                }
            });
        });
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
        const taxCreditCheckbox = document.querySelector('#taxCreditCheckbox');
        if (taxCreditCheckbox && taxCreditCheckbox.classList.contains('checked')) {
            const afterCreditTotal = total - 7500;
            document.querySelector('.price-breakdown span:last-child').textContent = '$' + afterCreditTotal.toLocaleString();
        }
    }
    
    // Window resize handler
    window.addEventListener('resize', function() {
        updateItemWidth();
    });
});
const container = document.getElementById('container');
const overlayBtn = document.getElementById('overlayBtn');
const signUpButton = document.querySelector('.overlay-panel.overlay-right button');
const signInButton = document.querySelector('.overlay-panel.overlay-left button');

// Add event listener to the "Sign Up" button in the overlay
signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

// Add event listener to the "Sign In" button in the overlay
signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Add event listener to the overlay button (if needed)
overlayBtn.addEventListener('click', () => {
    container.classList.toggle('right-panel-active');
});
document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mobileMenu = document.querySelector(".mobile-menu")
    const closeMenuBtn = document.querySelector(".close-menu")
  
    // Toggle mobile menu
    function toggleMobileMenu() {
      mobileMenu.classList.toggle("active")
      document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : ""
    }
  
    mobileMenuBtn.addEventListener("click", toggleMobileMenu)
    closeMenuBtn.addEventListener("click", toggleMobileMenu)
  
    // Close menu when clicking on a link
    document.querySelectorAll(".mobile-menu a").forEach((link) => {
      link.addEventListener("click", toggleMobileMenu)
    })
  
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && e.target !== mobileMenuBtn && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  
    // Model Y animation
    const modelYInfo = document.getElementById("model-y-info")
    const modelYFooter = document.getElementById("model-y-footer")
  
    if (modelYInfo && modelYFooter) {
      setTimeout(() => {
        modelYInfo.style.opacity = "1"
        modelYInfo.style.transform = "translateY(0)"
      }, 500)
  
      setTimeout(() => {
        modelYFooter.style.opacity = "1"
        modelYFooter.style.transform = "translateY(0)"
      }, 1000)
    }
  
    // Button hover effects
    const buttons = document.querySelectorAll(".page-footer .buttons button")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)"
        this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"
      })
  
      button.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)"
        this.style.boxShadow = "none"
      })
    })
  
    // Video play/pause on visibility
    const videos = document.querySelectorAll("video")
  
    const handleVideoVisibility = () => {
      videos.forEach((video) => {
        const rect = video.getBoundingClientRect()
        const isVisible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  
        if (isVisible) {
          video.play().catch((e) => console.log("Video autoplay prevented:", e))
        } else {
          video.pause()
        }
      })
    }
  
    // Initial check
    handleVideoVisibility()
  
    // Check on scroll with debounce
    let isScrolling
    window.addEventListener(
      "scroll",
      () => {
        window.clearTimeout(isScrolling)
        isScrolling = setTimeout(handleVideoVisibility, 100)
      },
      false,
    )
  
    // Update copyright year
    const yearElement = document.querySelector(".current-year")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  
    // Prevent right-click on images
    document.addEventListener("contextmenu", (e) => {
      if (e.target.tagName === "IMG" || e.target.tagName === "VIDEO") {
        e.preventDefault()
      }
    })
  })
  
  
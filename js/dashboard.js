// Dashboard specific JavaScript
let currentSlideIndex = 0;
let slides = [];
let dots = [];

document.addEventListener('DOMContentLoaded', async function() {
    // Wait for Firebase to initialize
    const checkFirebase = setInterval(async () => {
        if (window.firebaseAuth && window.firebaseDatabase) {
            clearInterval(checkFirebase);
            
            // Check authentication
            const isAuthenticated = await window.checkAuth();
            if (!isAuthenticated) {
                return;
            }
            
            // Set active navigation
            window.setActiveNav('dashboard.html');
        }
    }, 100);

    // Initialize slider
    slides = document.querySelectorAll('.slide');
    dots = document.querySelectorAll('.dot');
    
    if (slides.length > 0) {
        showSlide(0);
        // Auto-play slider
        setInterval(() => {
            changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }

    // Contact Form Handler with Firebase
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value || 'Not provided',
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString(),
                userId: await window.getCurrentUserId() || 'anonymous'
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            try {
                // Save to Firebase Realtime Database
                const { ref, push, set } = await import("https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js");
                const database = window.firebaseDatabase;
                
                if (!database) {
                    throw new Error('Firebase database not initialized');
                }
                
                // Create reference to Contact_Forms node
                const contactRef = ref(database, 'Contact_Forms');
                const newContactRef = push(contactRef);
                await set(newContactRef, formData);
                
                console.log('✅ Contact form saved to Firebase:', formData);
                
                // Show success message
                submitBtn.innerHTML = '<span>✓ Message Sent!</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)';
                
                // Show success notification
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, #009933 0%, #65cd8d 100%)';
                    submitBtn.disabled = false;
                }, 3000);
                
            } catch (error) {
                console.error('❌ Error saving contact form:', error);
                alert('Failed to send message. Please try again.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Slider Functions
function showSlide(index) {
    if (slides.length === 0) {
        slides = document.querySelectorAll('.slide');
        dots = document.querySelectorAll('.dot');
    }
    
    if (slides.length === 0) return;
    
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }

    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

function changeSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

function currentSlide(index) {
    showSlide(index - 1);
}

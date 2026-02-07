/* ============================================
   Vincent Gallery - Contact Form Handler
   Updated to use local API instead of JSONPlaceholder
   ============================================ */

// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Find the contact form
    const contactForm = document.getElementById('contactForm');
    
    // Only run if form exists (on Contact page)
    if (contactForm) {
        
        // Listen for form submission
        contactForm.addEventListener('submit', async function(event) {
            
            // Stop page from refreshing
            event.preventDefault();
            
            // Get values from form
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // ===== VALIDATION =====
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // ===== PREPARE FOR API CALL =====
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // ===== API CALL TO LOCAL SERVER =====
            try {
                // ✅ USE LOCAL API INSTEAD OF JSONPLACEHOLDER
                const API_URL = 'http://localhost:3000/api/contact';
                
                // Data to send
                const formData = {
                    name: name,
                    email: email,
                    message: message,
                    website: 'Vincent Gallery',
                    timestamp: new Date().toISOString()
                };
                
                console.log('📤 Sending to local API:', formData);
                
                // Send to API
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                
                // Check if successful
                if (response.ok) {
                    const result = await response.json();
                    console.log('✅ API Response:', result);
                    
                    // Success message
                    alert('✅ Thank you! Your message has been received and stored in our system.');
                    
                    // Clear form
                    contactForm.reset();
                    
                } else {
                    // API returned error
                    throw new Error(`Server error: ${response.status}`);
                }
                
            } catch (error) {
                // ===== FALLBACK IF LOCAL API FAILS =====
                console.error('Local API Error:', error);
                console.log('📝 Form Data (not sent, local API might not be running):', {
                    name: name,
                    email: email,
                    message: message
                });
                
                // User-friendly message
                alert('⚠️ Form submitted in demo mode.\n\nTo enable full functionality:\n1. Run the API server (node server.js)\n2. Update API_URL in this script\n3. Data was logged to console.');
                
                // Still clear form
                contactForm.reset();
                
            } finally {
                // ===== CLEANUP =====
                // Always reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ===== EMAIL VALIDATION FUNCTION =====
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== BONUS: LOAD GALLERY DATA FROM API =====
    // This is optional - demonstrates API usage beyond contact form
    async function loadGalleryData() {
        try {
            const response = await fetch('http://localhost:3000/api/gallery');
            if (response.ok) {
                const data = await response.json();
                console.log('🎨 Gallery data loaded from API:', data);
                // You could use this data to dynamically populate the gallery page
            }
        } catch (error) {
            console.log('Gallery API not available, using static data');
        }
    }
    
    // Call on Gallery page
    if (window.location.pathname.includes('gallery.html')) {
        loadGalleryData();
    }
});

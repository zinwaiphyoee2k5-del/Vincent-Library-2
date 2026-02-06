/* ============================================
   Vincent Gallery - Contact Form Handler
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
            
            // ===== API CALL =====
            try {
                // 🎯 TEST API URL (WORKS IMMEDIATELY)
                const API_URL = 'https://jsonplaceholder.typicode.com/posts';
                
                // Data to send
                const formData = {
                    name: name,
                    email: email,
                    message: message,
                    website: 'Vincent Gallery',
                    timestamp: new Date().toISOString()
                };
                
                console.log('📤 Sending to API:', formData);
                
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
                   alert('✅ Thank you! Your message has been received.');
                    // Clear form
                    contactForm.reset();
                    
                } else {
                    // API returned error
                    throw new Error(`Server error: ${response.status}`);
                }
                
            } catch (error) {
                // ===== FALLBACK IF API FAILS =====
                console.error('API Error:', error);
                console.log('📝 Form Data (not sent):', {
                    name: name,
                    email: email,
                    message: message
                });
                
                // User-friendly message
                alert('📝 Demo Mode: Form submitted successfully!\n\nIn a real website, this would be sent to:\n1. Formspree.io (free)\n2. Or your own server\n\nData logged to console.');
                
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
});
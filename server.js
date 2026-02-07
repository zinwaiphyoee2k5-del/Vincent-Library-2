/* =========================================================== */
/* FILE: server.js - Simple API for Vincent Gallery           */
/* PURPOSE: Handles contact form and gallery data             */
/* USAGE: Run with 'node server.js' then visit port 3000      */
/* =========================================================== */

// Import required modules
const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname))); // Serve static files

// ==================== 1. CONTACT FORM ENDPOINT ====================
app.post('/api/contact', (req, res) => {
    try {
        console.log('📥 Received contact form submission:');
        console.log('Name:', req.body.name);
        console.log('Email:', req.body.email);
        console.log('Message:', req.body.message);
        console.log('Timestamp:', new Date().toISOString());
        
        // In a real application, you would:
        // 1. Save to database
        // 2. Send email notification
        // 3. Add to CRM system
        
        // Simulate processing delay
        setTimeout(() => {
            res.status(200).json({
                success: true,
                message: 'Thank you for your message! We will respond within 24 hours.',
                data: {
                    id: Date.now(),
                    name: req.body.name,
                    email: req.body.email,
                    timestamp: new Date().toISOString(),
                    status: 'received'
                }
            });
        }, 1000);
        
    } catch (error) {
        console.error('❌ Error processing contact form:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});

// ==================== 2. GALLERY DATA ENDPOINT ====================
const galleryData = [
    {
        id: 1,
        title: "Sunflowers (1888)",
        description: "One of Van Gogh's most famous series of paintings depicting sunflowers in a vase.",
        year: 1888,
        medium: "Oil on canvas",
        dimensions: "92.1 × 73 cm",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/250px-Vincent_Willem_van_Gogh_127.jpg"
    },
    {
        id: 2,
        title: "The Bedroom (1888)",
        description: "A depiction of Van Gogh's bedroom at the Yellow House in Arles.",
        year: 1888,
        medium: "Oil on canvas",
        dimensions: "72 × 90 cm",
        imageUrl: "https://media.architecturaldigest.com/photos/56be5673202b83b31f121333/1:1/w_842,h_842,c_limit/airbnb-offers-chance-sleep-van-goghs-bedroom-01.png"
    },
    {
        id: 3,
        title: "Irises (1889)",
        description: "Painted while Van Gogh was at the asylum in Saint-Rémy-de-Provence.",
        year: 1889,
        medium: "Oil on canvas",
        dimensions: "71 × 93 cm",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Irises-Vincent_van_Gogh.jpg/1280px-Irises-Vincent_van_Gogh.jpg"
    },
    {
        id: 4,
        title: "Café Terrace at Night (1888)",
        description: "Depicts a café terrace on the Place du Forum in Arles, France.",
        year: 1888,
        medium: "Oil on canvas",
        dimensions: "80.7 × 65.3 cm",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Vincent_van_Gogh_%281853-1890%29_Caféterras_bij_nacht_%28place_du_Forum%29_Kröller-Müller_Museum_Otterlo_23-8-2016_13-35-40.JPG"
    },
    {
        id: 5,
        title: "The Starry Night (1889)",
        description: "One of Van Gogh's most recognized paintings, depicting the view from his asylum window.",
        year: 1889,
        medium: "Oil on canvas",
        dimensions: "73.7 × 92.1 cm",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
    }
];

// GET all gallery items
app.get('/api/gallery', (req, res) => {
    res.json({
        success: true,
        count: galleryData.length,
        data: galleryData
    });
});

// GET single gallery item by ID
app.get('/api/gallery/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const painting = galleryData.find(item => item.id === id);
    
    if (painting) {
        res.json({
            success: true,
            data: painting
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'Painting not found'
        });
    }
});

// ==================== 3. BIOGRAPHY DATA ENDPOINT ====================
app.get('/api/biography', (req, res) => {
    res.json({
        success: true,
        data: {
            name: "Vincent van Gogh",
            birth: "March 30, 1853",
            death: "July 29, 1890",
            nationality: "Dutch",
            movement: "Post-Impressionism",
            knownFor: "Sunflowers, The Starry Night, Irises, Self-Portraits",
            totalWorks: "Approximately 2,100",
            quote: "I am seeking, I am striving, I am in it with all my heart."
        }
    });
});

// ==================== 4. HEALTH CHECK ENDPOINT ====================
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'Vincent Gallery API',
        version: '1.0.0'
    });
});

// ==================== 5. SERVE HTML PAGES ====================
// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve other pages
app.get(['/gallery', '/biography', '/contract'], (req, res) => {
    const page = req.path.substring(1); // Remove leading slash
    res.sendFile(path.join(__dirname, `${page}.html`));
});

// ==================== 6. START SERVER ====================
app.listen(PORT, () => {
    console.log(`🚀 Vincent Gallery API is running on port ${PORT}`);
    console.log(`🌐 Home page: http://localhost:${PORT}`);
    console.log(`📊 API Endpoints:`);
    console.log(`   GET  http://localhost:${PORT}/api/health`);
    console.log(`   GET  http://localhost:${PORT}/api/gallery`);
    console.log(`   GET  http://localhost:${PORT}/api/gallery/:id`);
    console.log(`   GET  http://localhost:${PORT}/api/biography`);
    console.log(`   POST http://localhost:${PORT}/api/contact`);
    console.log(`\n📝 To test contact form, update script.js to use: http://localhost:${PORT}/api/contact`);
});
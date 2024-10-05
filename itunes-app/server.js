const express = require('express');
const axios = require('axios');
const helmet = require('helmet');
const cors = require('cors'); // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

// Use Helmet for security
app.use(helmet());

// Enable CORS
app.use(cors()); // Enable CORS for all routes

// Middleware to handle JSON requests
app.use(express.json());

// Route to handle iTunes API requests
app.get('/api/search', async (req, res) => {
  const { term, media } = req.query;

  console.log(`Received term: ${term}, media: ${media}`); // Log the parameters

  if (!term || !media) {
    return res.status(400).json({ message: 'Please provide both a search term and media type.' });
  }

  try {
    const response = await axios.get('https://itunes.apple.com/search', {
      params: {
        term,
        media,
      },
    });

    const data = response.data;
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from iTunes API:', error.message);
    res.status(500).json({ message: 'Error fetching data from iTunes API', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

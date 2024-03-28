const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// NASA API base URL
const baseURL = 'https://api.nasa.gov';

// Your NASA API key
const apiKey = '0kEemqTRndkfh1V01ykaiFat9KUpGa71RuUQ8z52';

// Function to fetch Astronomy Picture of the Day (APOD) from NASA API
async function fetchAPOD(date = 'today') {
    try {
        const response = await axios.get(`${baseURL}/planetary/apod?api_key=${apiKey}&date=${date}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching APOD:', error);
        throw error;
    }
}

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch APOD data
app.get('/apod', async (req, res) => {
    try {
        const { date, start_date, end_date, count } = req.query;
        let apodData;

        if (count) {
            // If count is specified, return random images
            const response = await axios.get(`${baseURL}/planetary/apod?api_key=${apiKey}&count=${count}`);
            apodData = response.data;
        } else if (start_date && end_date) {
            // If start_date and end_date are specified, return images within the date range
            const response = await axios.get(`${baseURL}/planetary/apod?api_key=${apiKey}&start_date=${start_date}&end_date=${end_date}`);
            apodData = response.data;
        } else {
            // Otherwise, fetch APOD for a specific date (default is today)
            apodData = await fetchAPOD(date);
        }

        res.json(apodData);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

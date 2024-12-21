const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow specific origins
app.use(cors({
    origin: [
        'http://localhost:3000', // Allow your local frontend
        'https://your-frontend.vercel.app' // Add your deployed frontend URL here
    ],
    methods: ['GET', 'POST'],
    credentials: true // If you need to send cookies or other credentials
}));
app.use(express.json());

// Google Sheets setup
const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_API_KEY });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

// API endpoint to fetch data from Google Sheets
app.get('/api/data', async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A1:Z1000', // Adjust range based on your data
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            console.error('No data found in the sheet');
            return res.status(404).send({ message: 'No data found in the sheet' });
        }

        res.json({ data: rows });
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error.message);
        res.status(500).send({ message: 'Failed to fetch data' });
    }
});

// Start server with conflict handling
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use.`);
        const newPort = PORT + 1; // Try the next port
        app.listen(newPort, () => {
            console.log(`Server started on an alternative port: http://localhost:${newPort}`);
        });
    } else {
        console.error('Unhandled server error:', err);
        process.exit(1); // Exit with error code
    }
});

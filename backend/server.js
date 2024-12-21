const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Google Sheets setup with API key
const sheets = google.sheets({ version: 'v4', auth: process.env.GOOGLE_API_KEY });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

// API endpoint to fetch data from Google Sheets
app.get('/api/data', async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A1:Z1000', // Adjust range based on your data
            key: process.env.GOOGLE_API_KEY, // Use API key
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            console.error('No data found in the sheet');
            return res.status(404).send({ message: 'No data found in the sheet' });
        }

        console.log('Data fetched successfully:', rows.length, 'rows');
        res.json({ data: rows });
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error.message);
        res.status(500).send({ message: 'Failed to fetch data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

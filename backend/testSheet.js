const { google } = require('googleapis');
require('dotenv').config();

// Log to ensure env variables are loaded
console.log('Service Account Email:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
console.log('Private Key (Snippet):', process.env.GOOGLE_PRIVATE_KEY.slice(0, 30) + '...');

// Configure JWT auth
const auth = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensure proper formatting
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
);

const sheets = google.sheets({ version: 'v4', auth });
const spreadsheetId = process.env.GOOGLE_SHEET_ID;

async function fetchData() {
    try {
        console.log('Attempting to fetch data...');
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A1:Z1000', // Adjust based on your data range
        });
        console.log('Data fetched successfully:', response.data.values);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

fetchData();

app.get('/api/data', async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A1:Z1000', // Adjust range based on your data
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return res.status(404).send({ message: 'No data found in the sheet' });
        }

        // Add NAV LINK column dynamically
        const updatedRows = rows.map((row, index) => {
            if (index === 0) {
                // Add NAV LINK header for the first row
                return [...row, 'NAV LINK'];
            }
            // Add a Google Maps link for navigation based on the address
            const address = row[3]; // Assuming the Address column is at index 3
            const navLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                address
            )}`;
            return [...row, navLink];
        });

        res.json({ data: updatedRows });
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error);
        res.status(500).send({ message: 'Failed to fetch data' });
    }
});

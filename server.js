const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exceljs = require('exceljs');
const path = require('path');

// Middleware for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., HTML, CSS, client-side JavaScript)
app.use(express.static('public'));

// Endpoint to handle vote submission
app.post('/api/storeData', async (req, res) => {
    const { voterId, aadhaar, party } = req.body;

    try {
        // Validate voterId, aadhaar, party if necessary

        // Example of writing to Excel file
        const workbook = new exceljs.Workbook();
        const sheet = workbook.addWorksheet('VoterData');
        sheet.addRow(['Voter ID', 'Aadhaar Number', 'Party Voted']);
        sheet.addRow([voterId, aadhaar, party]);

        const fileName = `VoterData_${Date.now()}.xlsx`;
        const filePath = path.join(__dirname, 'public', 'uploads', fileName);

        await workbook.xlsx.writeFile(filePath);

        res.status(200).json({ fileName });
    } catch (error) {
        console.error('Error recording vote:', error);
        res.status(500).json({ error: 'Failed to record vote.' });
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

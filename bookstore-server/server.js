const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://127.0.0.2:5500'
}));
app.use(bodyParser.text({ type: 'text/xml' })); // Parse XML as text
debugger;
app.post('/update-xml', (req, res) => {
    console.log(req.body)
    fs.writeFile('Mybookstore_24MAI1013.xml', req.body, (err) => {
        if (err) {
            console.error('Error saving XML file:', err);
            return res.status(500).send('Error saving XML file.');
        }
        res.send('XML file updated successfully.');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


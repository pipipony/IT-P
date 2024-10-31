const express = require('express');
const crypto = require('crypto');
const cors = require('cors');
const app = express();
const port = 9000;
const shortLinks = new Map();

app.use(cors());
app.use(express.json());

const generateShortCode = (url) => {
    return crypto.createHash('md5').update(url).digest('hex').substring(0, 5);
};

app.get('/', (req, res) => {
    res.send('Добро пожаловать на сервер сокращателя ссылок!');
});

app.post('/shorten', (req, res) => {
    const { originalUrl } = req.body;
    const shortCode = generateShortCode(originalUrl);
    if (!shortLinks.has(shortCode)) {
        shortLinks.set(shortCode, originalUrl);
    }
    res.json({ shortUrl: `http://localhost:3000/${shortCode}` });
});

app.get('/:shortCode', (req, res) => {
    const { shortCode } = req.params;
    const originalUrl = shortLinks.get(shortCode);
    res.json({ originalUrl });
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
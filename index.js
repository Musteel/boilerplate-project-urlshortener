require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const validUrl = require('valid-url');
const shortid = require('shortid');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// api/shorturl should get a JSON respond with original_url and short_url properties. When you visit api/shorturl/<short_url>, you will be redirected to the original URL and if the original URL doesn't exist, you will get a JSON response with error: 'invalid URL'
app.post('/api/shorturl', (req, res) => {
  const longUrl = req.body.longUrl;
  if (validUrl.isUri(longUrl)) {
    const shortUrl = shortid.generate();
    // Save the URL mapping in a database
    saveMapping(shortUrl, longUrl);
    res.json({ original_url: longUrl, short_url: shortUrl });
  } else {
    res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl;
  // Look up the original URL for the short URL
  const longUrl = getLongUrl(shortUrl);
  if (longUrl) {
    res.redirect(longUrl);
  } else {
    res.send('URL not found');
  }
});

const saveMapping = (shortUrl, longUrl) => {
  // Save the URL mapping in a database
};

const getLongUrl = (shortUrl) => {
  // Look up the original URL for the short URL in the database
};

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

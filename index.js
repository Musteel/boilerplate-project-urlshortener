require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const validUrl = require('valid-url');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// api/shorturl should get a JSON respond with original_url and short_url properties. When you visit api/shorturl/<short_url>, you will be redirected to the original URL and if the original URL doesn't exist, you will get a JSON response with error: 'invalid URL'

// Regular expression to check if a URL is in the format "http://www.example.com"
const urlRegex = /^https?:\/\/www\.example\.com$/;

// Dictionary to store short URLs and their corresponding original URLs
const urlMapping = {};

app.post('/api/shorturl', (req, res) => {
  // Get the original URL from the request
  const originalUrl = req.body.url;

  // Check if the URL is valid
  if (!urlRegex.test(originalUrl)) {
    return res.json({ error: 'invalid url' });
  }

  // Generate a short URL
  const shortUrl = generateShortUrl();

  // Save the URL mapping
  urlMapping[shortUrl] = originalUrl;

  // Return the short URL in the response
  res.json({ originalUrl: originalUrl, shortUrl: shortUrl });
});

app.get('/api/shorturl/:shortUrl', (req, res) => {
  // Look up the original URL for the short URL
  const originalUrl = urlMapping[req.params.shortUrl];

  // If the short URL is not in the mapping, return a 404 error
  if (!originalUrl) {
    return res.sendStatus(404);
  }

  // Redirect to the original URL
  res.redirect(originalUrl);
});

function generateShortUrl() {
  // Generate a short URL here. This could be a random string or an integer
  // that is incremented each time a new short URL is created.
  return 'abc123';
}

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
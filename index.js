require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

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
app.post('/api/shorturl', function(req, res) {
  res.json({ original_url: 'https://www.google.com', short_url: 1 });
});

app.get('/api/shorturl/:short_url', function(req, res) {
  if (req.params.short_url === '1') {
    res.redirect('https://www.google.com');
  } else {
    res.json({ error: 'invalid URL' });
  }
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

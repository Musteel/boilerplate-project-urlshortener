require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const validUrl = require('valid-url');


// Basic Configuration
const port = process.env.PORT || 3000;
const urlRegex = /^https?:\/\/(www\.)?example\.com/;

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

// api/shorturl should return a JSON object with original_url and short_url properties
app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;
  if (!validUrl.isUri(url)) {
    return res.json({ error: 'invalid url' });
  }
  const shortUrl = url.match(urlRegex)[0];
  res.json({ original_url: url, short_url: shortUrl });
});

// api/shouturl/<short_url> should redirect to the original URL
app.get('/api/shorturl/:short_url', (req, res) => {
  const { short_url } = req.params;
  res.redirect(short_url);
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
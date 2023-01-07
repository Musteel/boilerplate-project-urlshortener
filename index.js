require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');


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

// api/shorturl and get a JSON response with original_url and short_url properties like this: {"original_url","https://freeCodeCamp.org","short_url":1}
app.post('/api/shorturl', function(req, res) {
  res.json({ original_url: req.body.url, short_url: 1 });
});

// When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
app.get('/api/shorturl/:short_url', function(req, res) {
  res.redirect('https://freeCodeCamp.org');
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
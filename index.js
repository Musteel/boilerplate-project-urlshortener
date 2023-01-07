require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

const original_url = [];
const short_url = [];
// api/shorturl and get a JSON response with original_url and short_url properties like this: {"original_url","https://freeCodeCamp.org","short_url":1} and if you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error like this: {"error":"invalid URL"}. HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  if (urlRegex.test(url)) {
    original_url.push(url);
    short_url.push(original_url.length);
    res.json({ original_url: url, short_url: original_url.length });
  } else {
    res.json({ error: 'invalid URL' });
  }
});

app.get('/api/shorturl/:short_url', (req, res) => {
  const short = req.params.short_url;
  const index = short_url.indexOf(Number(short));
  if (index !== -1) {
    res.redirect (original_url[index]); 
  } else {
    res.json({ error: 'invalid URL' });
  }
});


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
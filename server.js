const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8000;

app.use(express.static(__dirname + '/public' ));

app.get('/', (req, res) => {
  // Read the contents of index.html
  const htmlPath = path.join(__dirname, 'public/index.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Send the HTML content as the response
  res.send(htmlContent);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

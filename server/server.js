const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


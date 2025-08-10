const express = require('express');
const path = require('path');

const app = express();
const PORT = 5002;

console.log('Setting up static file serving...');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/test', (req, res) => {
  res.json({ message: 'API route works' });
});

app.listen(PORT, () => {
  console.log(`Simple server running on port ${PORT}`);
  console.log(`Try: http://localhost:${PORT}/test.html`);
  console.log(`Try: http://localhost:${PORT}/images/orebiLogo.png`);
});
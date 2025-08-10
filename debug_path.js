const path = require('path');
const fs = require('fs');

const publicPath = path.join(__dirname, 'public/images');
console.log('Expected path:', publicPath);
console.log('Directory exists:', fs.existsSync(publicPath));

if (fs.existsSync(publicPath)) {
  console.log('Contents:');
  const files = fs.readdirSync(publicPath);
  console.log(files.slice(0, 10)); // Show first 10 files
}

// Test specific file
const logoPath = path.join(publicPath, 'orebiLogo.png');
console.log('Logo path:', logoPath);
console.log('Logo exists:', fs.existsSync(logoPath));
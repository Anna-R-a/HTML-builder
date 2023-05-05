const fs = require('fs');
const path = require('path');
const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let text = '';
readStream.on('error', (error) => console.log('Error', error.message));
readStream.on('data', (chunk) => text += chunk);
readStream.on('end', () => console.log(text));

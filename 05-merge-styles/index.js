const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
  files.forEach(file => { 
    if(file.isFile()) {
      const fileName = file.name;
      const pathName = path.join(__dirname, 'styles', fileName);
      const ext = path.extname(pathName);
      if (ext === '.css'){
        const input = fs.createReadStream(pathName, 'utf-8');
        input.on('error', (error) => console.log('Error', error.message));
        input.on('data', (chunk) => {
          output.write(chunk.toString());
        });
      }
    }
  });
});
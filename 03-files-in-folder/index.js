const fs = require('fs');
const path = require('path');
fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  files.forEach(file => { 
    if(file.isFile()) {
      const fileName = file.name;
      const pathName = path.join(__dirname, 'secret-folder',fileName);
      const names = path.basename(pathName, path.extname(pathName));
      const ext = path.extname(pathName).slice(1);
    
      fs.stat(pathName, (err, stats) => {
        if (err) throw err;
        const size = stats.size;
        console.log(`${names} - ${ext} - ${size} b`);
      });
    }
  });
});




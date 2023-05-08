const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'project-dist');
fs.mkdir(filePath, {recursive: true}, (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  const output = fs.createWriteStream(path.join(filePath, 'style.css'));
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

const oldFilePath = path.join(__dirname, 'assets');
const newFilePath = path.join(__dirname,'project-dist', 'assets');

function copyDir(oldFilePath, newFilePath) {
  function copyFiles (oldPath, newPath) {
    fs.readdir(oldPath, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      for (const file of files) { 
        const fileName = file.name;
        const old = path.join(oldPath, fileName);
        fs.stat(old, (err, stats) => {
          if (err) {
            throw err;
          } else {
            const oldPathName = path.join(oldPath, fileName);
            const newPathName = path.join(newPath, fileName);
            if (stats.isDirectory()) {
              fs.mkdir(newPathName, {recursive: true}, () => {
              });
              copyFiles (oldPathName, newPathName);
            } else if (stats.isFile()) {
              fs.copyFile(oldPathName, newPathName, err => {
                if(err) throw err; 
              });
            }
          }
        });
      }
    });
  }
  fs.access(newFilePath, (err)=> {
    if (err) {
      fs.mkdir(newFilePath, {recursive: true}, (err) => {
        if (err) throw err;
      });
    } 
    // else {
    //   fs.promises.rm(path.join(newFilePath), { recursive: true }, () => {
    //     }).then(fs.mkdir(newFilePath, {recursive: true}, (err) => {
    //       if (err) throw err;
    //     }));
    //     }
    copyFiles (oldFilePath, newFilePath);
  });
}
copyDir(oldFilePath, newFilePath);


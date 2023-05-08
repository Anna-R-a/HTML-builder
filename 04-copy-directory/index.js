const fs = require('fs');
const path = require('path');
let oldFilePath = path.join(__dirname, 'files');
const newFilePath = path.join(__dirname, 'files-copy');

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
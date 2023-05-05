const fs = require('fs');
const path = require('path');
const tempFile = fs.createWriteStream(path.join(__dirname, 'temp.txt'));
const { stdin, stdout, exit } = process;
stdout.write('Enter your text, please. Then press "Enter".\nFor exit you can press "Ctrl + C" or type "exit"\n');
stdin.on('data', input => {
  if (input.toString().trim() === 'exit'){
    handle();
  }
  tempFile.write(input);
});
process.on('SIGINT', handle);

function handle() {
  stdout.write('Bye-bye! Good luck!\n');
  exit();
}

var process = require('process');

module.exports = {
  "host": "127.0.0.1",
  "port": 22,
  "user": "root",
  "keyFile": process.platform == 'win32' ? 'C:/Users/root/.ssh/id_rsa' : '/Users/root/.ssh/id_rsa'
}
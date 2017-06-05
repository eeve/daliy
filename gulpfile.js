var gulp = require('gulp');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var scp = require('gulp-scp');
var GulpSSH = require('gulp-ssh');
var GulpShell = require('gulp-shell');
var fs = require('fs');
var runSequence = require('run-sequence');
var process = require('process');

var serverIP = '192.168.2.66';
var serverPort = 22;
var serverUser = 'eeve';
var keyFile = process.platform == 'win32' ? 'C:/Users/eeve/.ssh/id_rsa_pi' : '~/.ssh/id_rsa_pi';

var config = {
  host: serverIP,
  port: serverPort,
  username: serverUser,
  privateKey: fs.readFileSync(keyFile)
}
var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: config
});

gulp.task('clean', function () {
   return gulp.src('dist')
    .pipe(clean({ force: true }));
});

gulp.task('zip', () => {
    return gulp.src(['public/**/*'])
      .pipe(zip('blog.archive.zip'))
      .pipe(gulp.dest('dist'));
});

gulp.task('shell', () => {
  return gulp.src('dist/blog.archive.zip')
    .pipe(GulpShell([
      `scp -o StrictHostKeyChecking=no -P ${serverPort} -i ${keyFile} dist/blog.archive.zip ${serverUser}@${serverIP}:/var/www/archives`
    ]))
});

gulp.task('exec', function () {
  return gulpSSH
  	.shell([
      `/bin/bash /var/www/deploy.sh`,
      ], { filePath: 'shell.log' })
    .pipe(gulp.dest('dist'))
});

gulp.task('default', function(callback){
  runSequence('clean', 'zip' , 'shell', 'exec', callback);
});
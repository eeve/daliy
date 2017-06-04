var gulp = require('gulp');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var scp = require('gulp-scp');
var GulpSSH = require('gulp-ssh');
var fs = require('fs');
var runSequence = require('run-sequence');

var serverIP = '192.168.2.66';
var serverPort = 22;

var config = {
  host: serverIP,
  port: serverPort,
  username: 'eeve',
  privateKey: fs.readFileSync('/Users/eeve/.ssh/id_rsa_pi')
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

gulp.task('scp', function () {
    return gulp.src('dist/blog.archive.zip')
      .pipe(scp({
        host: serverIP,
        port: serverPort,
        user: 'eeve',
        path: '/var/www/archives'
      }));
});

gulp.task('exec', function () {
  return gulpSSH
  	.shell([
      '/bin/bash /var/www/deploy.sh'
      ], { filePath: 'shell.log' })
    .pipe(gulp.dest('dist'))
});

gulp.task('default', function(callback){
  runSequence('clean', 'zip', 'scp' , 'exec', callback);
});
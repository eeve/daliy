var gulp = require('gulp');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var scp = require('gulp-scp');
var GulpSSH = require('gulp-ssh');
var GulpShell = require('gulp-shell');
var fs = require('fs');
var runSequence = require('run-sequence');
var config = require('./config');

var sshConfig = {
  host: config.host,
  port: config.port,
  username: config.user,
  privateKey: fs.readFileSync(config.keyFile)
}
var gulpSSH = new GulpSSH({
  ignoreErrors: false,
  sshConfig: sshConfig
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
      `scp -o StrictHostKeyChecking=no -P ${config.port} -i ${config.keyFile} dist/blog.archive.zip ${config.user}@${config.host}:/var/www/archives`
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
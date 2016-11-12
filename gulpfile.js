var gulp = require('gulp');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var scp = require('gulp-scp');
var GulpSSH = require('gulp-ssh');
var fs = require('fs');
var runSequence = require('run-sequence');

var serverIP = '162.211.226.47';
var serverPort = 28016;

var config = {
  host: serverIP,
  port: serverPort,
  username: 'root',
  privateKey: fs.readFileSync('/Users/eeve/.ssh/id_rsa')
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
        user: 'root',
        path: '/opt/web'
      }));
});

gulp.task('exec', function () {
  return gulpSSH
  	.shell([
      'cd /opt/web',
      'rm -rf ./hexo-static-blog',
      'rm -rf /var/www/eeve.me',
      'unzip -x ./blog.archive.zip -d /var/www/eeve.me',
      'rm -rf ./blog.archive.zip'
      ], { filePath: 'shell.log' })
    .pipe(gulp.dest('dist/logs'))
});

gulp.task('default', function(callback){
  runSequence('clean', 'zip', 'scp' , 'exec', callback);
});
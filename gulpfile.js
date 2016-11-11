var gulp = require('gulp');
var clean = require('gulp-clean');
var zip = require('gulp-zip');
var scp = require('gulp-scp');
var GulpSSH = require('gulp-ssh');
var fs = require('fs');
var runSequence = require('run-sequence');

var config = {
  host: '172.24.4.190',
  port: 22,
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
        host: '162.211.226.47',
        user: 'root',
        port: 28016,
        path: '/opt/web'
      }));
});

gulp.task('exec', function () {
  return gulpSSH
  	.shell([
      'cd /opt/web',
      'rm -rf ./hexo-static-blog',
      'unzip -x ./blog.archive.zip -d ./hexo-static-blog',
      'rm -rf ./blog.archive.zip'
      ], { filePath: 'shell.log' })
    .pipe(gulp.dest('dist/logs'))
});

gulp.task('default', function(callback){
  runSequence('clean', 'zip', 'scp' , 'exec', callback);
});
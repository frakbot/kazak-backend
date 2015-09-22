'use strict';

var _ = require('lodash');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var jasmine = require('gulp-jasmine');
var batch = require('gulp-batch');
var watch = require('gulp-watch');
var SpecReporter = require('jasmine-spec-reporter');

var jasmineOpts = {
  verbose: false,
  includeStackTrace: true,
  colors: true
};

gulp.task('test', function() {
  var opts = _.assign(jasmineOpts, {
    reporter: [new SpecReporter({
      displayStacktrace: 'all',
      displaySpecDuration: true,
      displaySuiteNumber: true
    })]
  });
  return gulp
    .src('test/**/*.js')
    .pipe(jasmine(opts));
});

gulp.task('test:auto', function() {
  watch('**/*.js', batch(function(events, done) {
    gulp.start('test', done);
  }));
});

gulp.task('coverage', function(cb) {
  gulp
    .src([
      'bin/**/*.js',
      'endpoint/**/*.js',
      'lib/**/*.js',
      '!lib/bootstrap/**/*.js',
      'middleware/**/*.js',
      'model/**/*.js'
    ])
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
    .on('finish', function() {
      gulp.src(['test/**/*.js'])
        .pipe(jasmine(jasmineOpts))
        .pipe(istanbul.writeReports({
          dir: './coverage',
          reporters: ['lcov', 'json', 'text', 'text-summary', 'html', 'cobertura'],
          reportOpts: {
            'lcov': {dir: './coverage/lcov', file: 'coverage.lcov'},
            'json': {dir: './coverage/json', file: 'coverage.json'},
            'text': {dir: './coverage/text', file: 'coverage.txt'},
            'text-summary': {dir: './coverage/text', file: 'coverage-summary.txt'},
            'html': {dir: './coverage/html'},
            'cobertura': {dir: './coverage/cobertura', file: 'coverage.xml'}
          }
        }))
        .on('end', cb);
    });
});

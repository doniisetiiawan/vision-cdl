module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-jscoverage');
  grunt.loadNpmTasks('grunt-env');

  grunt.initConfig({
    env: {
      test: { NODE_ENV: 'TEST' },
      coverage: { NODE_ENV: 'COVERAGE' },
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'results.txt',
          quiet: false,
          clearRequireCache: false,
          clearCacheFilter: (key) => true,
          noFail: false,
        },
        src: ['test/*.js'],
      },
    },
    jscoverage: {
      src: {
        expand: true,
        src: ['test/*.js'],
        dest: 'lib-cov/',
        ext: '.js',
      },
      options: {},
    },
  });

  grunt.registerTask('test', [
    'env:test',
    'mochaTest:test',
  ]);
  grunt.registerTask('coverage', [
    'env:coverage',
    'jscoverage',
  ]);
};

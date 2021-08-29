// Project configuration.
const config = {
  qunit: {
    all: {
      options: {
        urls: [
          'http://localhost:8000/test/test.html',
        ]
      }
    }
  },
  connect: {
    server: {
      options: {
        port: 8000,
        base: '.'
      }
    }
  },
  exec: {
    rollup: 'npx rollup -c',
    lint: 'npx standard',
    format:
      'npx prettier -l --write --single-quote --no-semi "**/*.{html,js,json,md,mjs,yml}" && npx eslint "**/*.{html,md}" --fix && npx standard --fix',
    'browserstack-runner': 'node_modules/.bin/browserstack-runner --verbose'
  }
}
module.exports = function (grunt) {
  grunt.initConfig(config);


  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // A convenient task alias.
  grunt.registerTask('test', ['exec:rollup', 'connect', 'qunit']);
  grunt.registerTask('default', ['test']);
}


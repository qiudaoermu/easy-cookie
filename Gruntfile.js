// Project configuration.
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        stripBanners: true, //true 允许添加头部信息
        banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd") %> */\n'//在头部添加js文件名和时间的注释
      },
      build: {
        src: './index.js',
        dest: 'build/js/<%=pkg.name%>-<%=pkg.version%>.min.js'
      }
    },
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
  });

  // This plugin provides the "connect" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // A convenient task alias.
  grunt.registerTask('test', ['exec:rollup', 'connect', 'qunit']);
  grunt.registerTask('default', ['test']);
}


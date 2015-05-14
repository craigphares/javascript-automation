'use strict';

module.exports = function(grunt) {

  var bobblehead = grunt.option('bobblehead') || 'stormtrooper';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bobblehead: bobblehead,

    clean: {
      dist: ['dist']
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/assets/stylesheets/',
          src: ['main.scss'],
          dest: 'dist/assets/css',
          ext: '.css'
        }]
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js', 'spec/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    jasmine: {
      dist: {
        src: [
          'src/soundboard/soundboard.js',
          'src/soundboard/models/**/*.js',
          'src/soundboard/views/**/*.js',
          'src/soundboard.js'
        ],
        options: {
          specs: 'spec/**/*spec.js',
          helpers: 'spec/**/*helper.js',
          vendor: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
            'bower_components/jqueryui/jquery-ui.js',
            'bower_components/underscore/underscore.js',
            'bower_components/backbone/backbone.js',
            'bower_components/howler/howler.js'
          ]
        }
      } 
    },

    concat: {
      css: {
        src: [
          'bower_components/html5-boilerplate/dist/css/normalize.css',
          'bower_components/html5-boilerplate/dist/css/main.css',
          // 'bower_components/jqueryui/themes/base/slider.css',
          // 'bower_components/jqueryui/themes/base/theme.css',
          'dist/assets/css/main.css'
        ],
        dest: 'dist/assets/css/app.css'
      },
      js: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/jqueryui/jquery-ui.js',
          'bower_components/howler/howler.js',
          'bower_components/underscore/underscore.js',
          'bower_components/backbone/backbone.js',
          'src/soundboard/soundboard.js',
          'src/soundboard/models/**/*.js',
          'src/soundboard/views/**/*.js',
          'src/soundboard.js'
        ],
        dest: 'dist/assets/js/app.js'
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/assets/js/app.min.js': ['dist/assets/js/app.js']
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/assets/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/assets/images/'
        }]
      }
    },

    copy: {
      audio: {
        files: [
          {
            expand: true,
            cwd: 'src/assets/audio/',
            src: ['**/*'],
            dest: 'dist/assets/audio/'
          }
        ]
      },
      index: {
        src: 'src/index.html',
        dest: 'dist/index.html',
        options: {
          process: function(content, srcpath) {
            return grunt.template.process(content);
          }
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist'
        }
      }
    },
    
    watch: {
      options: {
        livereload: true
      },
      css: {
        files: ['src/**/*.scss'],
        tasks: ['sass', 'concat:css'],
        options: {
          spawn: false
        }
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['jshint', 'concat:js'],
        options: {
          spawn: false
        }
      },
      index: {
        files: ['src/index.html'],
        tasks: ['copy:index'],
        options: {
          spawn: false
        }
      },
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['default'],
        options: {
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jasmine']);

  grunt.registerTask('start', ['connect:server:keepalive']);

  grunt.registerTask('default', ['clean', 'sass', 'jshint', 'concat', 'uglify',
    'imagemin', 'copy']);

};
"use strict";

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    qunit: {  //task
      master: { //target
        options: {
          urls: [ "http://localhost:3333/tests/master.html" ]
        }
     },
      filter: {
        options: {
          urls: [ "http://localhost:3333/tests/filter.html" ]
        }
      }
     },

    connect: {
      server: {
        options: {
          port: 3333,
          hostname: "localhost",
          base: "public"
        }
      }
    },

    watch: {
      html: {
        files: [ "public/*.haml" ], //or*.html
        tasks: [ "haml" ], //or "dev"; will only do the things you need it to do...so tell it the specific task you want it to do for those files that changed
        options: { nospawn: true }
      },
      js: {
        files: [ "public/js/app/**/*.js" ], //any sub folder of app and any file w/ extension js
        tasks: [ "dev" ],
        options: { nospawn: true }
      },
      tests: {
        files: [ "public/tests/**/*.html", "public/js/tests/**/*.js" ],
        tasks: [ /*"connect",*/ "qunit" ],
        options: { nospawn: true }
      }
    },

    haml: {
      dist: {
        files: {
          "_build/index.html": "public/index.haml",
          "_build/tests/master.html": "public/tests/master.haml",
          "_build/tests/filter.html": "public/tests/filter.haml"
        }
      }
    },

    copy: {
      images: {
        expand: true,
        src: [ "img/**/*.*" ],
        cwd: "public/", //current working directory
        dest: "_build/" //new directory containing img, fonts, js
      },
      fonts: {
        expand: true,
        src: [ "css/**/*.*" ],
        cwd: "public/",
        dest: "_build/"
      },
      js: {
        expand: true,
        src: [ "js/**/*.*" ],
        cwd: "public/",
        dest: "_build/"
      }
    },

      concat: {
        js: {
            src: [ "public/js/app/*.js"],
            dest: "_build/js/app-concat.js"
        }
      }

    clean: [ "_dist" ],

    jshint: {
      files: ["public/js/app/**/*.js"],
      options: {
        force: true,
        jshintrc: "./.jshintrc"
      }
    }

 });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-haml");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.registerTask( "tests", [ "connect", "qunit" ] );
  grunt.registerTask( "tests", [ "connect", "qunit:filter" ] );
  grunt.registerTask( "dev", [ "jshint", "test" ] );
  grunt.registerTask( "build", [ "clean", "haml", "copy" ] );

  grunt.registerTask( "default", [ "dev" ]);
  grunt.registerTask( "default", [ "tests" ]);



};



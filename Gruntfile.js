'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('bower.json'),

        app: {
            src: 'src',
            dist: 'dist'
        },

        ngdocs: {
            options: {
                dest: './docs'
            },
            source: {
                src: 'src/*.js',
                title: 'angular-openaura Documentation'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= app.src %>/<%= pkg.name %>.js',
                dest: '<%= app.dist %>/<%= pkg.name %>.min.js'
            }
        },

        jshint: {
            options: {
                jshintrc: './.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= app.src %>/*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: './test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= app.dist %>/{,*/}',
                        '!<%= app.dist %>/.git'
                    ]
                }]
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                // singleRun: true
            }
        }

    });

    grunt.registerTask('test', [
        'karma'
    ]);

    grunt.registerTask('default', [
        'clean:dist',
        'jshint',
        'uglify'
    ]);
};
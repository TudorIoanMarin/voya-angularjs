'use strict';

var fs = require('fs');
var path = require('path');

var cssImporter = require('node-sass-css-importer')({
    import_paths: [
        'bower_components/'
    ]
});

// Grunt configuration options
var gruntConfigOptions = {
    browserSync: {
        dev: {
            bsFiles: {
                src: [
                    'src/index.html',
                    'src/assets/styles/**/*.css',
                    'src/app/**/*.{js,html}',
                    'src/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            options: {
                watchTask: true
            }
        },
        options: {
            watchTask: true,
            proxy: "localhost:8080"
        }
    },
    connect: {
        options: {
            port: 9001,
            hostname: '0.0.0.0',
            livereload: 35730
        },
        livereload: {
            options: {
                open: true,
                base: [
                    'src'
                ]
            }
        }
    },
    sass: {
        options: {
            sourceMap: true,
            includePaths: [
                "src/assets/sass/"
            ],
            importer: cssImporter
        },
        dist: {
            files: {
                'src/assets/stylesheets/main.css': 'src/assets/sass/main.scss'
            }
        }
    },
    ts: {
        default: {
            tsconfig: true
        }
    },
    watch: {
        bower: {
            files: [
                'bower.json'
            ],
            tasks: [
                'wiredep'
            ]
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                'src/**/*.html'
            ]
        },
        sass: {
            files: [
                'src/assets/sass/*.scss'
            ]
        },
        styles: {
            files: [
                'src/assets/stylesheets/*.css'
            ]
        },
        ts: {
            files: [
                'src/app/**/*.ts',
                'tsconfig.json'
            ],
            tasks: [
                'ts'
            ],
            options: {
                livereload: '<%= connect.options.livereload %>'
            }
        }
    },
    wiredep: {
        app: {
            src: [
                'src/index.html'
            ]
        }
    }
};

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-ts');

    grunt.initConfig(gruntConfigOptions);

    grunt.registerTask('serve', [
        'sass', // Compile the SASS files
        'wiredep', // Check if we have all the bower dependencies in index.html
        'ts', // Compile the TypeScript files
        'connect-livereload', // Reload the browser on changes
        'watch' // Watch for any changes
    ]);

    // Make the server task our default one
    grunt.registerTask('default', [
        'serve'
    ]);
};
'use strict';

var fs = require('fs');
var path = require('path');

var cssImporter = require('node-sass-css-importer')({
    import_paths: [
        'bower_components/'
    ]
});

// Grunt configuration options
function getGruntConfigOptions(serveStatic) {
    return {
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
                hostname: 'localhost',
                livereload: 35730
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        'src'
                    ],
                    middleware: function (connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                        // Serve static files.
                        options.base.forEach(function (base) {
                            middlewares.push(serveStatic(base));
                        });
                        middlewares.push(connect().use(
                            '/bower_components',
                            serveStatic('./bower_components')
                        ));

                        // Make directory browse-able.
                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(serveStatic(directory));

                        return middlewares;
                    }
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
                ],
                tasks: [
                    'sass'
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
            },
            scss: {
                src: [
                    'src/assets/sass/main.scss'
                ]
            }
        }
    };
}

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('connect-livereload')();

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-ts');
    var serveStatic = require('serve-static');

    grunt.initConfig(getGruntConfigOptions(serveStatic));

    grunt.registerTask('serve', [
        'wiredep:scss', // Check if we have all the bower dependencies in main.scss
        'sass', // Compile the SASS files
        'wiredep:app', // Check if we have all the bower dependencies in index.html
        'ts', // Compile the TypeScript files
        'connect:livereload', // Reload the browser on changes
        'watch' // Watch for any changes
    ]);

    // Make the server task our default one
    grunt.registerTask('default', [
        'serve'
    ]);
};
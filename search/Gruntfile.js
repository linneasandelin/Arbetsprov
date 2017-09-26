module.exports = function(grunt) {
        grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
    
        watch: {
            sass:{
                files: ['assets/styles/*.scss'],
                tasks: ['sass']
            },
            options: {
                livereload: {
                    host: 'localhost',
                    files: [
                      './index.html',
                      './assets/styles/*.scss',
                      './assets/js/*.js'
                    ],
                    open: true
                }
            }
        },
    
        sass: {
            dist: {
                files: {
                    'dist/build/styles/style.css' : 'assets/styles/base.scss'
                }
            }
        },
    
        concat: {
            dist: {
                src: ['assets/js/*.js'],
                dest: 'dist/build/scripts/main.min.js'
            }
        },
    
        uglify:{
            options: {
                manage: false,
                preserveComments: 'all'
            },
            my_target:{
                files: {
                    'dist/build/scripts/main.min.js' : ['assets/js/*.js']
                }
            }
        },
        copy: {
            main: {
                expand: true,
                cwd: 'assets/img/',
                src: '*.{png,jpg,svg}',
                dest: 'dist/build/images'
            }
        }
    
        });
    

        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-sass');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-copy');

        grunt.registerTask('build', ['uglify', 'sass', 'copy']);
        grunt.registerTask('dev', ['uglify', 'sass', 'copy', 'watch']);
    };
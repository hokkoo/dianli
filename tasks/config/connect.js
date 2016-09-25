/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This grunt task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-clean
 */
module.exports = function(grunt) {

    grunt.config.set('connect', {
        options: {
            livereload: 35729,
            hostname: 'localhost',
            base: '<%= config.dest %>'
        },
        livereload: {
            options: {
                open: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
};
/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the <%= config.dest %> directory.
 *
 * # build task config
 * Copies all directories nd files from the <%= config.dest %> directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

    grunt.config.set('copy', {
        dev: {
             files: [
             {
                expand: true,
                cwd: '<%= config.assets %>',
                src: ['**/*.!(coffee)'],
                dest: '<%= config.dest %>'
            },
            //{
            //     expand: true,
            //     cwd: '<%= config.assets %>',
            //     src: ['**/*.(css|js)'],
            //     dest: '<%= config.dest %>'
            // },
            {
                expand: true,
                cwd: './bower_components',
                src: ['**/**'],
                dest: '<%= config.dest %>/lib'
            }]
        },
        build: {
            files: [{
                expand: true,
                cwd: '<%= config.dest %>',
                src: ['**/*'],
                dest: 'www'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
};
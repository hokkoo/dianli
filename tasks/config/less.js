/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-less
 */
module.exports = function(grunt) {

    grunt.config.set('less', {
        options: {
            paths: ['bower_components/bootstrap/less']
        },
        dev: {
            /*files: [{
                expand: true,
                cwd: '<%= config.assets %>/less/',
                src: ['style.less'],
                dest: '<%= config.dest %>/css/',
                ext: '.css'
            }, {
                expand: true,
                cwd: '<%= config.assets %>/less/',
                src: ['theme.less'],
                dest: '<%= config.dest %>/css/',
                ext: '.css'
            }, {
                expand: true,
                cwd: '<%= config.assets %>/less/',
                src: ['style-switcher.less'],
                dest: '<%= config.dest %>/css/',
                ext: '.css'
            }]*/
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
};
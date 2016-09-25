/**
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * ---------------------------------------------------------------
 *
 * Watch for changes on
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *      https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function(grunt) {

    grunt.config.set('watch', {
        api: {

            // API files to watch:
            files: ['api/**/*', '!**/node_modules/**']
        },
        assets: {
            // Assets to watch:
            files: ['<%= config.assets %>/**/*', 'tasks/pipeline.js', '!**/node_modules/**'],

            // When assets are changed:
            tasks: ['syncAssets']
        },
        assetsLib : {
            files: ['<%= config.assets %>/lib/core/*.js'],
            tasks: ['concat:assetsLib']
        },
        livereload: {
            options: {
                livereload: '<%= connect.options.livereload %>'
            },
            files: [
                '.tmp/public/{,*/}*.css',
                '.tmp/public/{,*/}*.js',
                'views/{,*/}*.*'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};
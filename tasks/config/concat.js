/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 * [concat](https://github.com/gruntjs/grunt-contrib-concat)
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-concat
 */
module.exports = function(grunt) {

	grunt.config.set('concat', {
		dev : {
			 files: [{
			      '<%= config.dest %>/js/core.js': [
			        '<%= config.assets %>/js/core/ie10-viewport-bug-workaround.js',
			        '<%= config.assets %>/js/core/Metis.js',
			        '<%= config.assets %>/js/core/metisNavBar.js',
			        '<%= config.assets %>/js/core/fullscreen.js',
			        '<%= config.assets %>/js/core/metisAnimatePanel.js',
			        '<%= config.assets %>/js/core/init.js'
			      ],
			      '<%= config.dest %>/js/app.js': ['<%= config.assets %>/js/app/*.js'],
			      '<%= config.dest %>/js/countdown.js': ['<%= config.assets %>/js/countdown.js'],
			      '<%= config.dest %>/js/style-switcher.js': ['<%= config.assets %>/js/style-switcher.js'],
			      '<%= config.dest %>/lib/lib.js': ['<%= config.assets %>/lib/core/*.js']
			    }]
			  },
		js: {
			src: require('../pipeline').jsFilesToInject,
			dest: '.tmp/public/concat/production.js'
		},
		css: {
			src: require('../pipeline').cssFilesToInject,
			dest: '.tmp/public/concat/production.css'
		},
		assetsLib : {
			files:[{
				'<%= config.dest %>/lib/lib.js': ['<%= config.assets %>/lib/core/*.js']
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
};

/**
 * sails-generate-html
 *
 * Usage example:
 * `sails generate html shared/topbar`
 *
 * @description Generates a static HTML template (i.e. client-side template)
 *              at `assets/templates/___________.html`
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  before: function (scope, cb) {

    if (!scope.args[0]) {
      return cb( new Error('Please provide a name and/or relative path for this static HTML template (e.g. "benefits-section" or "shared/sidebar"') );
    }

    // Path to html dir within the project
    // (set using --html-directory)
    scope.htmlDirectory = scope['html-directory']||'assets/templates';

    // Decide the output filename for use in targets below:
    scope.filename = scope.args[0] + '.html';

    cb();
  },



  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    './:htmlDirectory/:filename': { template: 'new-html.gen' },

  },


  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname)
};

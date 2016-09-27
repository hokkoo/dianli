/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  //加载passport
  sails.services.passport.loadStrategies();

  //验证首页
  sails.log.warn('in bootstrap :::::');
  //sails.log.warn(sails.models);
  sails.log.warn(sails.middleware.views);
  //sails.all('/',sails.middleware.policies['sessionauth']);
  //sequelize
  sails.on('hooks:builtIn:ready',function showsequelize (argument) {
    // body...
    console.log('##############6');
    console.log('##############6');
  })
  cb();
};

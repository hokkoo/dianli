/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html
 */
var testhost ='yuanjingtest.mysql.rds.aliyuncs.com';
var host = 'yjclwdb1.mysql.rds.aliyuncs.com';
var localhost = {
    host: 'localhost',
    user: 'tony',
    pwd: 'abcd1234'
}
var curhost = localhost;
var uname = 'yuanjingtwo';
var pwd='eH7oxs2TC6ZU';
module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  *                                                                          *
  * MySQL is the world's most popular relational database.                   *
  * http://en.wikipedia.org/wiki/MySQL                                       *
  *                                                                          *
  * Run: npm install sails-mysql                                             *
  *                                                                          *  
  ***************************************************************************/
  d_backend: {
    adapter: 'sails-mysql',
    host: curhost.host,
    user: curhost.user,
    password: curhost.pwd,
    database: 'backend'
  },
  d_carowner: {
    adapter: 'sails-mysql',
    host: curhost.host,
    user: curhost.user,
    password: curhost.pwd,
    database: 'carowner'
  },
  d_company: {
    adapter: 'sails-mysql',
    host: curhost.host,
    user: curhost.user,
    password: curhost.pwd,
    database: 'company'
  },
  d_misc: {
    adapter: 'sails-mysql',
    host: curhost.host,
    user: curhost.user,
    password: curhost.pwd,
    database: 'misc'
  },
  d_payment: {
    adapter: 'sails-mysql',
    host: curhost.host,
    user: curhost.user,
    password: curhost.pwd,
    database: 'payment'
  },
  d_product: {
    adapter: 'sails-mysql',
    host: curhost.host,
    user: curhost.user,
    password: curhost.pwd,
    database: 'product'
  },
  d_base: {
    adapter: 'sails-mysql',
    host: curhost.host,
    user: curhost.user,
    password: curhost.pwd,
    database: 'base'
  },
  d_user: {
    adapter: 'sails-mysql',
    host: curhost.host,
    user: curhost.user,
    password: curhost.pwd,
    database: 'user'
  },
  d_mechanic: {
    adapter: 'sails-mysql',
    host: curhost.host,
    user: curhost.user,
    password: curhost.pwd,
    database: 'mechanic'
  },


  /***************************************************************************
  *                                                                          *
  * MongoDB is the leading NoSQL database.                                   *
  * http://en.wikipedia.org/wiki/MongoDB                                     *
  *                                                                          *
  * Run: npm install sails-mongo                                             *
  *                                                                          *
  ***************************************************************************/
  someMongodbServer: {
    adapter: 'sails-mongo',
    host: 'localhost',
    port: 27017,
    // user: 'username',
    // password: 'password',
    // database: 'your_mongo_db_name_here'
  },

  /***************************************************************************
  *                                                                          *
  * PostgreSQL is another officially supported relational database.          *
  * http://en.wikipedia.org/wiki/PostgreSQL                                  *
  *                                                                          *
  * Run: npm install sails-postgresql                                        *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
  somePostgresqlServer: {
    adapter: 'sails-postgresql',
    host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_POSTGRES_USER',
    password: 'YOUR_POSTGRES_PASSWORD',
    database: 'YOUR_POSTGRES_DB'
  }


  /***************************************************************************
  *                                                                          *
  * More adapters: https://github.com/balderdashy/sails                      *
  *                                                                          *
  ***************************************************************************/

};

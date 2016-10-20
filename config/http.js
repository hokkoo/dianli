/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * Only applies to HTTP requests (not WebSockets)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.http.html
 */
var _ = require('underscore.string');
var uaParser = require('ua-parser-js');
uaParser = new uaParser();
var moment = require('moment');
var proxy = require('http-proxy-middleware');
var express = require('express');
//var passport = require('passport');

module.exports.http = {
   publicName : '/static',

    /****************************************************************************
     *                                                                           *
     * Express middleware to use for every Sails request. To add custom          *
     * middleware to the mix, add a function to the middleware config object and *
     * add its key to the "order" array. The $custom key is reserved for         *
     * backwards-compatibility with Sails v0.9.x apps that use the               *
     * `customMiddleware` config option.                                         *
     *                                                                           *
     ****************************************************************************/
    customMiddleware: function(app) {
        console.log('########################### express #############');
        // 后台的开发代理
        // app.use('/admin', express.static('./admin'));
        app.use('/upload', express.static('./upload'));
        app.use('/static', express.static('./static'));
        var adminProxyOption = {
            target: 'http://localhost:8088/',
            changeOrigin: true,
            pathRewrite: {
                '^/admin': '/'
            },
            ws: true
        };
        var adminProxy = proxy(adminProxyOption);

        app.use(passport.initialize());
        app.use(passport.session());
        

        app.use('/admin/app.js', express.static('./admin/static/app.js'));
        app.use('/admin/assets', express.static('./admin/assets'));
        app.use('/admin/static', express.static('./admin/static'));
        app.use('/admin', function (req, res, next) {
            console.log(req.path);
            if(req.path === "/admin/login" || req.path === "/login" || req.path.indexOf("app.js") != -1) {
                return next();
            }
          if(req.isUnauthenticated()){
            res.redirect('/admin/login');
          }else{
            next();
          }
        });
        // TODO 增加 refer验证，所有refer为admin的请求都需要验证是否登录
        app.use('/admin', adminProxy);


        var mobileProxyOption = {
            target: 'http://localhost:8810/',
            changeOrigin: true,
            pathRewrite: {
                '^/mobile': '/'
            },
            ws: true
        };
        var mobileProxy = proxy(mobileProxyOption);
        app.use('/mobile', mobileProxy);
        console.log('### proxy ####');
       /* app.use(function(req, res, next) {
            passport.initialize()(req, res, function() {
                // Use the built-in sessions
                passport.session()(req, res, function() {
                    // Make the user available throughout the frontend
                    res.locals.user = req.user;
                    next();
                });
            });
        });*/
        //sails.once('middleware:registered',function(){
        /*app.use(function(req, res, next) {
            sails.middleware.policies['sessionauth'](req, res, next);
        });*/
        //格式化查询条件，并在locals暴露方法
        app.use(f_Cp);
        app.use(function(req, res, next) {
            res.locals.req = req;
            res.locals.fd = function(date, format) {
                return date && moment(new Date(date)).format(format || 'YYYY-MM-DD HH:mm') || '';
            };
            //自动转换search参数,不带page
            res.locals.fsearch = function() {
                var search = _.cloneDeep(req.query.search || req.body.search || {});
                delete search.page;
                return qst.stringify({
                    search: search
                });
            }
            //自动转换search
            res.locals.fsp = function() {
                var search = _.cloneDeep(req.query.search || req.body.search || {});
                return qst.stringify({
                    search: search
                });
            }
            //是否可以访问当前路径
            /*res.locals.pathallow=function(path){
            var obj = {};
            obj['path'] = path;
            obj['user'] = _.cloneDeep(req.user);
            return checkPathPolicy(obj);
        }*/
            //暴露moment接口
            res.locals.dateformat = function(str, utc) {
                var d = moment(str).zone(utc || 0).format('YYYY-MM-DD');
                return d.indexOf('Invalid') == -1 ? d : '';
            }
            //暴露moment接口
            res.locals.timeformat = function(str, utc) {
                var d = moment(str).zone(utc || 0).format('YYYY-MM-DD HH:mm:ss');
                return d.indexOf('Invalid') == -1 ? d : '';
            }
            //UA信息
            res.locals.ua = parseUA(req.headers['user-agent']);

            next();
        });
        //});
    },
    middleware: {

        /***************************************************************************
         *                                                                          *
         * The order in which middleware should be run for HTTP request. (the Sails *
         * router is invoked by the "router" middleware below.)                     *
         *                                                                          *
         ***************************************************************************/

        order: [
            'startRequestTimer',
            'cookieParser',
            'session',
            // 'myRequestLogger',
            'bodyParser',
            'handleBodyParserError',
            'compress',
            'methodOverride',
            'poweredBy',
            'www',
            '$custom',
            'router',
            'favicon',
            '404',
            '500'
        ],

        /****************************************************************************
         *                                                                           *
         * Example custom middleware; logs each request to the console.              *
         *                                                                           *
         ****************************************************************************/

        // myRequestLogger: function (req, res, next) {
        //     console.log("Requested :: ", req.method, req.url);
        //     return next();
    }


    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests. By    *
     * default as of v0.10, Sails uses                                          *
     * [skipper](http://github.com/balderdashy/skipper). See                    *
     * http://www.senchalabs.org/connect/multipart.html for other options.      *
     *                                                                          *
     ***************************************************************************/

    // bodyParser: require('skipper')

    // },

    /***************************************************************************
     *                                                                          *
     * The number of seconds to cache flat files on disk being served by        *
     * Express static middleware (by default, these files are in `.tmp/public`) *
     *                                                                          *
     * The HTTP static cache is only active in a 'production' environment,      *
     * since that's the only time Express will cache flat-files.                *
     *                                                                          *
     ***************************************************************************/

    // cache: 31557600000
};
//格式化查询字符串
function f_Cp(req, res, next) {
    // 分页格式
    if(req.query){
        req.query.start = parseInt(req.query.start, 10) || 0;
        req.query.take = parseInt(req.query.take, 10) || 0;
    }
    var search = {};
    if (req.method == 'GET') {
        search = req.query.search;
    } else {
        search = req.body.search;
    }
    search = search || {
        query: '',
        page: {
            cur: 1,
            offset: 10,
            count: 1,
            pages: 1,
        }
    };
    search.query = _.trim(search.query);
    if (!search.query || search.query == 'undefined' || search.query == 'null') search.query = '';
    if (!search.page) search.page = {
        cur: 1,
        offset: 10,
        count: 1,
        pages: 1,
    };
    search.page.cur = parseInt(search.page.cur || 0) || 0;
    if (search.page.cur < 1) search.page.cur = 1;
    if (!search.page.offset) search.page.offset = 10;
    if (!search.extra) {
        search.extra = {
            isIn: false
        }
    } else {
        search.extra.isIn = true;
    }
    req.search = search;
    next();
}

//ua parser
function parseUA(ua) {
    /* var obj={};
    if (/mobile/i.test(ua))
    obj.Mobile = true;

    if (/like Mac OS X/.test(ua)) {
        obj.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
        obj.iPhone = /iPhone/.test(ua);
        obj.iPad = /iPad/.test(ua);
    }

    if (/Android/.test(ua))
        obj.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];

    if (/webOS\//.test(ua))
        obj.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];

    if (/(Intel|PPC) Mac OS X/.test(ua))
        obj.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;

    if (/Windows NT/.test(ua))
        obj.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
    return obj;*/
    uaParser.setUA(ua);
    return uaParser.getResult();
}
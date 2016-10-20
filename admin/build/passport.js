var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var _ = require('lodash');
var crypto = require('crypto');
var session = require('express-session');

module.exports = function(app) {
    app.use(session({
        secret: 'vidyapathaisalwaysrunning'
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        if (!id) {
            return done(new Error('无效用户ID'), null);
        }
        var User = sails.sequelize['user.user'];
        User.findById(id).then(function(item) {
            done(null, item.get({
                plain: true
            }));
        }).catch(function(err) {
            done(err, null)
        });
    });

    passport.use('local', new LocalStrategy(function(username, password, done) {
        var User = sails.sequelize['user.user'];
        User.findOne({
            where: {
                name: username
            }
        }).then(function(item) {
            if (item) {
                password = crypto.createHash('sha256').update(password).digest('hex');
                if (password === item.passport) {
                    done(null, item);
                } else {
                    done(null, false, {
                        message: '密码错误'
                    });
                }
            } else {
                done(null, false, {
                    message: '用户名错误'
                });
            }
        });
    }));
}
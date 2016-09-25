var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;

var Standard = product.define('Standard', {
    standard_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    }
}, {
    tableName: 'Standard',
    schema:'product'
});

module.exports = Standard;
//Standard.sync();
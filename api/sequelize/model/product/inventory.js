var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
/*
*   缩略版库存信息，只计算统计信息，不关心细节
*/
var Inventory = product.define('Inventory', {
    inventory_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    in_count :{
        type :Sequelize.INTEGER
    },
    in_number :{
        type :Sequelize.INTEGER
    },
    in_total_price :{
        type :Sequelize.DECIMAL
    },
    out_count :{
         type :Sequelize.INTEGER
    },
    out_number :{
         type :Sequelize.INTEGER
    },
    out_total_price:{
        type :Sequelize.DECIMAL
    },

}, {
    tableName: 'Inventory',
    schema:'product'
});

module.exports = Inventory;

//Inventory.sync();
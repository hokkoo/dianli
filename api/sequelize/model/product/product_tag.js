var Sequelize = require('sequelize');
var product = require("../../config/sequelize").product;
var _type = require('../../config/constType');

var Product_tag = product.define('Product_tag', {
    tag_id: {
        type: Sequelize.BIGINT(20),
        primaryKey: true
    },
    product_id: {
         type: Sequelize.BIGINT(20),
         primaryKey: true
    },
    type: {
        type : Sequelize.INTEGER
    }
}, {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    deletedAt: "deletedAt",
    paranoid: true,
    tableName: 'product_tag'
});

module.exports = Product_tag;

var Tag = require('./tag');

var Bed = require('./bed');
Bed.belongsToMany(Tag, {
  through: {
    model: Product_tag,
    unique: false,
    scope: {
      type: _type.bed
    }
  },
  foreignKey: 'product_id',
  constraints: false
});


var Door = require('./door');
Door.belongsToMany(Tag, {
  through: {
    model: Product_tag,
    unique: false,
    scope: {
      type: _type.door
    }
  },
  as: 'tags',
  foreignKey: 'product_id',
  constraints: false
});

Tag.belongsToMany(Door, {
  through: {
    model: Product_tag,
    unique: false,
    scope: {
      type: _type.door
    }
  },
  as:  'doors',
  foreignKey: 'tag_id',
  constraints: false
});

Door.addScope('tags', {
  include: [
    { model: Tag, as: 'tags'}
  ]
});

var Ware = require('./ware');
Ware.belongsToMany(Tag, {
  through: {
    model: Product_tag,
    unique: false,
    scope: {
      type: _type.ware
    }
  },
  foreignKey: 'product_id',
  constraints: false
});

Product_tag.sync();
var _ = require('lodash');

var timeFields = ['createdAt', 'updatedAt', 'deletedAt'];
module.exports = {
    getAvailableFields: function (item) {
        var keys = [];
        _.each(item, (value, key) => {
            if(!~timeFields.indexOf(key) && !_.isUndefined(value)){
                keys.push(key);
            }
        });
        return keys;
    }
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');
const autoIncrement = require('mongoose-auto-increment');

var productSchema = new Schema({
    productID: {
        type: Number,
        required: true,
        index: { unique: true }
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
})

const Product = mongoose.model('Product', productSchema);
autoIncrement.initialize(mongoose.connection);
// productSchema.plugin(autoIncrement.plugin, {
//     model: 'Product',
//     field: 'productID'
// });

module.exports = {
    Product
};
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
    name : String,
    brand : String,
    product_weight: String,
    country: String
});

module.exports = mongoose.model('article', articleSchema)


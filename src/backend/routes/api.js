const express = require('express');
const router = express.Router();

const food = require('../utils/food.js')
const article = require('../classes/article.js');

router.get('/', (req,res) => {
    res.json({'message' : 'Server running OK'});
});

router.post('/add', async(req,res) => {
    let foodProduct = await food.getProductByEAN(req.body.codeBar);
    let data = new article(foodProduct.product.product_name,
        foodProduct.product.brands_tags[0],
        foodProduct.product.product_quantity,
        req.body.quantity)
    res.json(data.getObject());
});

module.exports = router
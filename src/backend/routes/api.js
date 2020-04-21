const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const food = require('../utils/food.js')
const secure = require('../lib/secure');
const inventoryArticle = require('../classes/inventoryArticle.js');

router.get('/', (req,res) => {
    res.json({'message' : 'Server running OK'});
});

router.post('/user/login', (req,res,next) => {
    const userTemplate = {
        'email' : req.body.email,
        'password' : req.body.password
    }

    jwt.sign({'user' : userTemplate}, process.env.API_KEY, (err, token) => {
        res.json({token});
        req.session.authKey = token;
        next();
    });
});

router.get('/user/data', secure.verifyToken, (req,res,next) => {
    jwt.verify(req.token, process.env.API_KEY, (err,authData) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({'message' : 'OK', authData});
        }
    });
});

router.post('/add', async(req,res) => {
    let foodProduct = await food.getProductByEAN(req.body.codeBar);
    let data = new inventoryArticle(foodProduct.product.product_name,
        foodProduct.product.brands_tags[0],
        foodProduct.product.product_quantity,
        req.body.quantity)
    res.json(data.getObject());
});



module.exports = router
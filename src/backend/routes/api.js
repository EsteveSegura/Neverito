const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const food = require('../utils/food.js')
const secure = require('../lib/secure');

const inventoryArticle = require('../classes/inventoryArticleClass.js');
const user = require('../classes/userClass.js');

const userActions = require('../lib/userActions');

const passwordHash = require('../lib/password');

router.get('/', (req,res) => {
    res.json({'message' : 'Server running OK'});
});

router.post('/user/register', async(req,res) => {
    //check if mail is mail, and password
    let cryptPassword = await passwordHash.cryptPassword(req.body.password);
    let data = new user(req.body.email, cryptPassword);
    let userInsertion = await userActions.createNewUser(data.getObject());
    res.json({'insertion' : data.getObject(), userInsertion});
});

router.post('/user/login', async(req,res) => {
    let data = new user(req.body.email, req.body.password);
    try{
        let userCheck = await userActions.checkUserPassword(data);
    
        let checkPasswordHash = await passwordHash.comparePassword(req.body.password,userCheck.password);
        if(checkPasswordHash){
            jwt.sign({'user' : data.getObject()}, process.env.API_KEY, (err, token) => {
                req.session.token = token;
                res.redirect('api/user/data')
            });
        }else{
            res.json({'message' : 'Wrong data.'});
        }
    }catch(error){
        res.json({'message' : 'Something Wrong.'})
    }
});

router.get('/user/data', secure.verifyToken, (req,res) => {
    req.token = req.session.token;
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
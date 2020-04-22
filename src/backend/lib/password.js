const bcrypt = require('bcrypt');

function cryptPassword(password){
    return new Promise((resolve,reject) => {
        console.log(password)
        bcrypt.genSalt(parseInt(process.env.SALT_ROUND), function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    })
}

function comparePassword(password,hash){
    return new Promise((resolve,reject) => {
        bcrypt.compare(password, hash, function(err, result) {
            if(err){
                throw err;
            }
            resolve(result);
        });
    })
}

module.exports = { cryptPassword, comparePassword }
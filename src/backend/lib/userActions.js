const User = require('../models/user');


async function createNewUser(data) {
     return new Promise(async (resolve, reject) => {
          User.findOne({email : data.email}, async(err, user) => {
               if(err){
                    reject(err);
               }

               if(user){
                    resolve({'message' : 'User already exists. Not created'});
               }else{
                    let newUser = new User({
                         email: data.email,
                         password: data.password
                    });
          
                    await newUser.save((err) => {
                         if (err) {
                              reject(err);
                         }
                         resolve({'message' : 'User created.'})
                    });
               }
          });
     });
}

function checkUserPassword(data) {
     return new Promise((resolve, reject) => {
          User.findOne({email: data.email}, (err, user) => {
               if (err) {
                    reject(err);
               }
               resolve(user);
          });
     });
}



/*function getClient(idClient){
     return new Promise((resolve,reject) => {
          Client.find({_id: idClient}, (err,client) =>{
               if(err){
                    reject(err);
               }
               resolve(client)
          });
     });
}

async function editClient(idClient, data){
     return new Promise(async(resolve,reject) => {
          let clientEdit = await Client.updateOne({_id: idClient}, data);
          if(clientEdit.ok == 1 && clientEdit.nModified == 1) {
               resolve(true)
          }else{
               reject('ERROR')
          }
     });
}

async function deleteClient(idClient){
     return new Promise((resolve,reject) =>{
          Client.deleteOne({_id : idClient}, (err) => {
               if(err){
                    reject(err)
               }
               resolve(true)
          });
     });
}*/

module.exports = { createNewUser, checkUserPassword }
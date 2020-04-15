const Article = require('../models/article');

async function createNewInventory(data){
    return new Promise(async (resolve,reject) => {
        let newArticle = new Article({
            name : data.name,
            brand : data.brand,
            product_weight: data.product_weight,
            country: data.country
        });

        await newArticle.save((err) => {
            if(err){
                reject(err);
            }
            resolve(true)
        });
    });
}

/*function getClients(){
     return new Promise((resolve,reject) => {
          Client.find({}, (err,clients) => {
               if(err){
                    reject(err);
               }
               resolve(clients);
          });
     });
}

function getClient(idClient){
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

module.exports = { createNewInventory }
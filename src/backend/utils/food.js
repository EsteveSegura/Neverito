const axios = require('axios');

async function getProductByEAN(codebar){
    let response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${codebar}.json`);
    return response.data;
}

module.exports = { getProductByEAN }
class InventoryArticle {
    constructor(name,brand,product_weight,quantity){
        this.name = name;
        this.brand = brand;
        this.product_weight = product_weight;
        this.quantity = quantity;
    }

    getObject(){
        return {
            'name': this.name,
            'brand': this.brand,
            'product_weight': this.product_weight,
            'quantity' : this.quantity
        }
    }


}

module.exports = InventoryArticle
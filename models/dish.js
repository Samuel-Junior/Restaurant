export class Dish {
    constructor( id ,name, description, price, category,image, count=0){
        this.id = id
        this.name = name
        this.description = description
        this.price = price
        this.category = category
        this.image= image;
        this.count = count
    }
}



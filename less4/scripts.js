'use strict'
/* ************************************************************************************************
1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, 
надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. 
Например, для числа 245 надо получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
*/

let randNumber = (Math.floor((Math.random() * 1000)+0)).toString();
let obj = {
    units: 0,
    tens : 0,
    hundreds : 0,
};

if(randNumber>999) console.log("Число больше 999");
else{
    let txtVal = Object.keys(obj);
    let valRevers = randNumber.split('').reverse().join('');

    for(let val in valRevers){
        obj[txtVal[val]] = valRevers[val];
    }

}

//console.log(randNumber);
//console.log(obj);

/* ************************************************************************************************
2. Продолжить работу с интернет-магазином:
В прошлом домашнем задании вы реализовали корзину на базе массивов. Какими объектами можно заменить их элементы?
Реализуйте такие объекты.
Перенести функционал подсчета корзины на объектно-ориентированную базу.
*/

class Cart{
    constructor(){
        this.products = {};
    }

    /**
     * @param {(string | number)[]} prod
     */
    set addProduct (prod){
        this.products[prod[0]] = {
              "eq": prod[1],
              "price": prod[2],
            }
        }

    get getSumm (){
        let sum = 0;
        for (let val in this.products) {
            sum += this.products[val].eq * this.products[val].price;
        }
        return `${sum}руб.`;
    }
    get shProducts (){
        for (let val in this.products) {
            console.log(`Название - ${val}, колличество - ${this.products[val].eq}, цена - ${this.products[val].price}`)
        }
    }
    delProduct(val){
        delete this.products[val];
        return `Удален ${val}`
    }
}

let cart = new Cart();
cart.addProduct = ["toster",3,1000];
cart.addProduct = ["TV",1,24000];
cart.addProduct = ["PC",2,30000];

console.log(cart.getSumm);
cart.shProducts;

console.log("\n ")
console.log(cart.delProduct("toster"));
cart.shProducts;


/* ************************************************************************************************
* Подумать над глобальными сущностями. 
К примеру, сущность «Продукт» в интернет-магазине актуальна не только для корзины, но и для каталога. 
Стремиться нужно к тому, чтобы объект «Продукт» имел единую структуру для различных модулей сайта, 
но в разных местах давал возможность вызывать разные методы.
*/
console.log("\n ")


class Products{
    constructor(){
        this.products = {};
    }
    /**
     * @param {any[]} prod
     */
    set addProduct (prod){
        this.products[prod[0]] = {
            "eq": prod[1],
            "price": prod[2],
            "img": prod[3],
            "weight": prod[4],
            }
        }
    addCart (name,eq){
        if(this.products[name].eq < eq)
            return [name, this.products[name].eq , this.products[name].price]
        else
            return [name, eq , this.products[name].price];
    }
    cardProduct (name){
        return [name, this.products[name].eq , this.products[name].price, this.products[name].img, this.products[name].weight];
    }
    buyProduct (name, eq){
        if(this.products[name].eq < eq)
            return false;
        else
        this.products[name].eq = this.products[name].eq - eq;
            return true;
    }
}


let products = new Products();

products.addProduct = ["toster",3,1000,3,15.5];
products.addProduct = ["TV",1,24000,5,20.1];
products.addProduct = ["ps",10,15000,11,12.1];

cart.addProduct = products.addCart("ps",5);
cart.shProducts;
console.log("\n ")
console.log(products.addCart('toster', 3));
console.log("\n ")
console.log(products.buyProduct("toster",3))
console.log(products.cardProduct("toster"));
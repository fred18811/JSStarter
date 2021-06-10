'use strict'
/* ************************************************************************************************
1. Создать функцию, генерирующую шахматную доску. 
Можно использовать любые html-теги. 
Доска должна быть верно разлинована на черные и белые ячейки. 
Строки должны нумероваться числами от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.
*/

function makeChess(){

    let mainDiv = document.createElement("div");

    //Генерим цифры
    let rawText = document.createElement("div");
    rawText.classList.add("flexBox", "textPos");
    for(let i=0; i<=8; i++){
        let cell = document.createElement("div");
        cell.classList.add("cellText")
        if(i != 0) cell.innerText = i;
        rawText.appendChild(cell);
    }
    mainDiv.appendChild(rawText);

    //Генерим буквы с блоками
    let arr = [' ','a','b','c','d','e','f','g','h'];
    let flag = false;
    for(let i=1; i<=8; i++){
        let raw = document.createElement("div");
        raw.classList.add("flexBox");
        let numbCell = document.createElement("div");
        numbCell.classList.add("cellChass", "flexBox");
        numbCell.style.height = "50px";
        numbCell.style.alignItems = "center";
        let p = document.createElement("p");
        p.innerText = arr[i];
        numbCell.appendChild(p);
        raw.appendChild(numbCell);

        for(let i=1; i<=8; i++){
            let cell = document.createElement("div");
            if (flag) {
                cell.classList.add("cellChass", "colorBlack");
                flag = false;
            }
            else {
                cell.classList.add("cellChass", "colorAntiquewhite");
                flag = true;
            }
            raw.appendChild(cell);
        }
        flag = !flag;
        mainDiv.appendChild(raw);
    }

    let chess = document.querySelector("#chess");
    chess.classList.add("flexBox");
    chess.style.height = "100vh";
    chess.style.alignItems = "center";
    chess.appendChild(mainDiv);
}
makeChess();


/* ************************************************************************************************
2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре. Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
Пустая корзина должна выводить строку «Корзина пуста»;
Наполненная должна выводить «В корзине: n товаров на сумму m рублей».
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
        return sum;
    }
    get getSumEq (){
        let sum = 0;
        for (let val in this.products) {
            sum += this.products[val].eq;
        }
        return sum;
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


let cartClass = new Cart();
cartClass.addProduct = ["toster",3,1000];
cartClass.addProduct = ["TV",1,24000];
cartClass.addProduct = ["PC",2,30000];


let cart = document.querySelector("#cart");
cart.classList.add("cart");


let mainDiv = document.createElement("div");

if(cartClass.getSumEq){
    let sumProd = document.createElement("p");
    sumProd.innerText = "Продукты:" + cartClass.getSumEq + "шт.";
    mainDiv.appendChild(sumProd);
    let sum = document.createElement("p");
    sum.innerText = "Сумма:" + cartClass.getSumm + "р.";
    mainDiv.appendChild(sum);
}
else {
    let mess = document.createElement("p");
    mess.innerText = "Корзина пуста";
    mainDiv.appendChild(mess);
}
cart.appendChild(mainDiv);


/* ************************************************************************************************
3. * Сделать так, чтобы товары в каталоге выводились при помощи JS:
Создать массив товаров (сущность Product);
При загрузке страницы на базе данного массива генерировать вывод из него. 
HTML-код должен содержать только div id=”catalog” без вложенного кода. 
Весь вид каталога генерируется JS.
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
let mainCatalog = document.querySelector("#catalog");
let arrNameTable = ["Наименование","Колличество","Цена","Картинка","Вес"];


let table = document.createElement("table");
table.classList.add("textLeft", "catalogTab");
let thead = document.createElement("thead");
let trThead = document.createElement("tr");

for(let i = 0; i<arrNameTable.length; i++){
    let th = document.createElement("th");
    th.innerText = arrNameTable[i];
    trThead.appendChild(th);
}
thead.appendChild(trThead);
table.appendChild(thead);

let tbody = document.createElement("tbody");

for(let val in products.products){
    let trProd = document.createElement("tr");
    let td = document.createElement("td");
    td.innerText = val;
    trProd.appendChild(td);

    for(let j in products.products[val]){
        let tdParam = document.createElement("td");
        tdParam.innerText = products.products[val][j];
        trProd.appendChild(tdParam);
    }
    tbody.appendChild(trProd);
}

table.appendChild(tbody);
mainCatalog.appendChild(table);
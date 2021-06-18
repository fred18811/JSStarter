'use strict'

//*************************Значек Корзина******************************/
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
              "sum": prod[2],
            }
        }
    addOneProd (prod){
        if(this.products[prod[0]] != undefined){
            if(prod[1] > this.products[prod[0]].eq){
                ++this.products[prod[0]].eq;
                return true;
            }
            else return false;
        }
        else {
            this.products[prod[0]] = {
                "eq": 1,
                "sum": prod[2],
              }
              return true;
        }
    }
    subOneProd (prod){
        if(1 < parseInt(this.products[prod].eq)){
            --this.products[prod].eq;
            return true;
        }
        else return false;
    }
    get getSumm (){
        let sum = 0;
        for (let val in this.products) {
            sum += this.products[val].eq * this.products[val].sum;
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
    shProduct (val){
        return this.products[val];
    }
    get shProducts (){
        return this.products;
    }
    delProduct(prod){
        delete this.products[prod];
        return true;
    }
}
//******************************************************************/
//*************************Каталог*********************************/
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
}

//******************************************************************/
//********Экземпляры класса значек корзина, каталог. Наполнение***********/
let cartClass = new Cart();
let products = new Products();

products.addProduct = ["toster",3,1000,3,15.5];
products.addProduct = ["TV",2,24000,5,20.1];
products.addProduct = ["ps",10,15000,11,12.1];
products.addProduct = ["Monitor",20,11000,16,3.5];

cartClass.addProduct = products.addCart("toster",2);
cartClass.addProduct = products.addCart("TV",1);
cartClass.addProduct = products.addCart("ps",2);
cartClass.addProduct = products.addCart("Monitor",6);
//******************************************************************/
/*******Отрисовка значка карзины*******************************************/
function cartUpdate(cart){
cart.innerText = "";

cart.classList.add("cart");

let mainDiv = document.createElement("div");

if(cartClass.getSumEq){
    let sumProd = document.createElement("p");
    sumProd.innerText = "Продукты:" + cartClass.getSumEq + "шт.";
    sumProd.id = "eqProducts";
    mainDiv.appendChild(sumProd);
    let sum = document.createElement("p");
    sum.id = "sumProducts";
    sum.innerText = "Сумма:" + cartClass.getSumm + "р.";
    mainDiv.appendChild(sum);
}
else {
    let mess = document.createElement("p");
    mess.innerText = "Корзина пуста";
    mainDiv.appendChild(mess);
}
cart.appendChild(mainDiv);
}
let cart = document.querySelector("#cart");
cartUpdate(cart);
/**********************************************************/
/*******Отрисовка каталога********************************/
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
let thHeader = document.createElement("th");
trThead.appendChild(thHeader);
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
    let thBtn = document.createElement("td");
    thBtn.classList.add("textPos")
    let btn = document.createElement("input");
    btn.classList.add("btn");
    btn.id = val;
    btn.type = "button";
    btn.value = "В корзину";
    thBtn.appendChild(btn);
    trProd.appendChild(thBtn);
    tbody.appendChild(trProd);
}

table.appendChild(tbody);
let div = document.createElement("div");
div.appendChild(table);
mainCatalog.appendChild(div);
/**********************************************************/
/**********************Добавление товаров*****************/
/*
1.Продолжаем реализовывать модуль корзины:
Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы;
Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида.
*/
mainCatalog.addEventListener("click",(e)=>{
    if(e.target.type == "button"){
        cartClass.addOneProd(products.cardProduct(e.target.id));
        cartUpdate(cart);
        document.querySelector("#eqProducts").innerText = "Продукты:" + cartClass.getSumEq + "шт.";
        document.querySelector("#sumProducts").innerText = "Сумма:" + cartClass.getSumm + "р.";
    }
});
/**********************************************************/
/*******Класс Модального окна карзины****************************/
class modalCart{
    constructor(obj){
        this.modal = obj;
        this.form = document.createElement("form");
    }
    cart(){
        let arrNameTable = ["Наименование","Колличество","Цена","Сумма"];
        let table = document.createElement("table");
        table.id = "cartTable";
        table.classList.add("textLeft", "catalogTab");
        let thead = document.createElement("thead");
        let trThead = document.createElement("tr");
    
        for(let i = 0; i<arrNameTable.length; i++){
            let th = document.createElement("th");
            th.innerText = arrNameTable[i];
            trThead.appendChild(th);
        }
        let thHeader = document.createElement("th");
        trThead.appendChild(thHeader);
        thead.appendChild(trThead);
        table.appendChild(thead);
    
    
        let tbody = document.createElement("tbody");
    
        for(let val in cartClass.shProducts){
            let trProd = document.createElement("tr");
            let td = document.createElement("td");
            td.innerText = val;
            trProd.appendChild(td);
    
            for(let j in cartClass.shProducts[val]){
                let tdParam = document.createElement("td");
                tdParam.innerText = cartClass.shProducts[val][j];
                trProd.appendChild(tdParam);
            }
            let tdSum = document.createElement("td");
            tdSum.innerText = cartClass.shProducts[val].eq*cartClass.shProducts[val].sum;
            trProd.appendChild(tdSum);
    
            let thBtn = document.createElement("td");
            thBtn.style.display = "inline-flex";
            thBtn.classList.add("textPos")
            
            let arrBtn = ["add","sub","del"];
            for(let i = 0; i< arrBtn.length; i++){
                let btnAdd = document.createElement("input");
                btnAdd.classList.add("btn");
                btnAdd.id = arrBtn[i] + "-"+ val;
                btnAdd.type = "button";
                btnAdd.value = arrBtn[i];
                thBtn.appendChild(btnAdd);
            }
            trProd.appendChild(thBtn);
            tbody.appendChild(trProd);
        }   
        table.appendChild(tbody);
        table.style.display = "block";
        let divHeader = document.createElement("div");
        let hHeader = document.createElement("h1");
        hHeader.innerText = "Корзина";
        divHeader.appendChild(hHeader);
        divHeader.classList.add("cartHeader");
        this.form.appendChild(divHeader);
        this.form.appendChild(table);
    }
    addres(){
        let divHeader = document.createElement("div");
        let hHeader = document.createElement("h1");
        hHeader.innerText = "Адрес";
        divHeader.appendChild(hHeader);
        divHeader.classList.add("cartHeader");
        this.form.appendChild(divHeader);

        let arrAddres = ["Имя", "Фамилия", "Адрес", "Комментарий"];
        let divForm = document.createElement("div");
        for(let i = 0; i<arrAddres.length; i++){
            let div = document.createElement("div");
            let lable = document.createElement("lable");
            lable.innerText = arrAddres[i];
            lable.setAttribute('for', "form"+i);
            div.appendChild(lable);
            let input = document.createElement("input");
            input.type = "text";
            input.id = "form"+i;
            div.appendChild(input);
            divForm.appendChild(div);
        }
        divForm.style.display = "none";
        divForm.id = "address";
        this.form.appendChild(divForm);
    }
    feedback(){
        let divHeader = document.createElement("div");
        let hHeader = document.createElement("h1");
        hHeader.innerText = "Отзыв";
        divHeader.appendChild(hHeader);
        divHeader.classList.add("cartHeader");
        this.form.appendChild(divHeader);
        let div = document.createElement("div");
        let input = document.createElement("textarea");
        div.appendChild(input);
        div.id = "feedback"
        div.style.display = "none";
        this.form.appendChild(div);
    }
    btn(){
        let divHeader = document.createElement("div");
        divHeader.style.textAlign = "right";
        let btnBack = document.createElement("input");
        btnBack.type = "button";
        btnBack.classList.add("btn");
        btnBack.id = "btnBack";
        btnBack.value = "Назад";

        let btnNext = document.createElement("input");
        btnNext.type = "button";
        btnNext.classList.add("btn");
        btnNext.id = "btnNext";
        btnNext.value = "Вперед";
        divHeader.appendChild(btnBack);
        divHeader.appendChild(btnNext);
        this.form.appendChild(divHeader);

        btnNext.addEventListener("click",()=>{
            console.log();
        });
    }
    btnBack(btn){
        console.log(btn)
        btn.addEventListener("click",()=>{
            console.log();
        });
    }
    shCart(){
        this.form.innerText = "";
        this.cart();
        this.addres();
        this.feedback();
        this.btn();
        this.modal.appendChild(this.form);
    }
}
let modal = document.querySelector("#modal");
let modalWindowsCart = new modalCart(modal);
/*********************************************************************/
/*********Показать модальное окно************************************/
cart.addEventListener("click",()=>{
    if(JSON.stringify(cartClass.shProducts) != '{}'){
        let modal = document.querySelector("#modal");
        modal.style.display = "block";
        document.querySelector("#modal-overlay").style.display = "block";
        modalWindowsCart.shCart();
    }
});
/*********************************************************************/
/***************Убрать модальном окно*********************************/
document.querySelector("#modal-overlay").addEventListener("click",()=>{
    let modal = document.querySelector("#modal");
    modal.style.display = "none";
    modal.innerText = "";
    document.querySelector("#modal-overlay").style.display = "none";

});
/********************************************************************/
//****************Добавление удаление товара в модальном окне********/
document.querySelector("#modal").addEventListener("click",(e)=>{
    if(e.target.type == "button"){
        let form = document.querySelector("#cartTable");
        let address = document.querySelector("#address");
        let feedback = document.querySelector("#feedback");

        let prod = e.target.id.split("-");
        if(prod[0] == "del" || prod[0] == "add" || prod[0] == "sub"){
            if(prod[0] == "del"){
                cartClass.delProduct(prod[1]);
            }
            else if (prod[0] == "add"){
                cartClass.addOneProd(products.cardProduct(prod[1]));
            }
            else if (prod[0] == "sub"){
                cartClass.subOneProd(prod[1]);
            }
            cartUpdate(cart);
            modalWindowsCart.shCart();
        }
        else if (e.target.id == "btnBack"){
            if(feedback.style.display == "block") {
                feedback.style.display = "none";
                address.style.display = "block";
            }
            else if(address.style.display == "block"){
                address.style.display = "none";
                form.style.display = "block";
            }
        }
        else if (e.target.id == "btnNext"){
            if(form.style.display == "block") {
                form.style.display = "none";
                address.style.display = "block";
            }
            else if(address.style.display == "block"){
                address.style.display = "none";
                feedback.style.display = "block";
            }
        }
    };
    if(JSON.stringify(cartClass.shProducts) === '{}'){
        document.querySelector("#modal").style.display = "none";
        document.querySelector("#modal-overlay").style.display = "none";
    };
});
/*************************************************************/
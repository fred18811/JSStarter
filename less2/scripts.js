'use strict'

let randNumb = Math.floor(Math.random() * (100 - 0)) + 0;
let number = document.getElementById("number");
let btn = document.getElementById("btn");
let text = document.getElementById("text");
let reboot = document.getElementById("reboot");
let count = 0;

    btn.addEventListener("click",()=>{
        if(randNumb == number.value ){
            text.innerHTML = "Поздравляю вы угадали!<br>Число попыток - " + count;
            number.disabled = true;
            btn.style.display = "none";
            reboot.style.display = "block";
        }
        else if (randNumb < number.value){
            text.innerHTML = "Занчение больше загаданного";
            count++;
        }
        else{
            console.log(randNumb)
            text.innerHTML = "Занчение меньше загаданного";
            count++;
        }
    });
    reboot.addEventListener('click',()=>{
        randNumb = Math.floor(Math.random() * (100 - 0)) + 0;
        text.innerHTML = ""
        number.disabled = false;
        btn.style.display = "block";
        reboot.style.display = "none";
        number.value = "";
    })

/*
************************************************************************************************************************************************************
1. Почему код дает именно такие результаты?

    var a = 1, b = 1, c, d;
    c = ++a; alert(c);           // 2 - сперва инкрементирование, потом присвоение c =2
    d = b++; alert(d);           // 1 - присвоение d = 1 , потом инкрементированипе b = 2
    c = (2+ ++a); alert(c);      // 5 - 2 + инкр (a=2)
    d = (2+ b++); alert(d);      // 4 - сперва сложение переменных 2 + 2, затем инкрементирование b = 3
    alert(a);                    // 3 - при последовательном выполнении кода мы увеличиваем переменную
    alert(b);                    // 3 - при последовательном выполнении кода мы увеличиваем переменную


************************************************************************************************************************************************************
2. Чему будет равен x? 
    var a = 2;
    var x = 1 + (a *= 2); //сперва умножаем переменную а на 2, затем складываем результат
    console.log(x); // x = 5
*/

/*
************************************************************************************************************************************************************
3. Объявить две целочисленные переменные — a и b и задать им произвольные начальные значения. Затем написать скрипт, который работает по следующему принципу:
    если a и b положительные, вывести их разность;
    если а и b отрицательные, вывести их произведение;
    если а и b разных знаков, вывести их сумму;
    Ноль можно считать положительным числом.

let a = -5, b = -4;
if(a >= 0 && b >= 0) 
    console.log(a-b);
else if(a < 0 && b < 0) 
    console.log(a*b);
else if((a >= 0 && b < 0) || (a < 0 && b >= 0)) 
    console.log(a+b);
*/

/*
************************************************************************************************************************************************************
4. Присвоить переменной а значение в промежутке [0..15]. С помощью оператора switch организовать вывод чисел от a до 15.

let a = Math.floor(Math.random() * (15 - 0)) + 0;
switch(a){
    case 0: console.log("Значение 0");
    case 1: console.log("Значение 1");
    case 2: console.log("Значение 2");
    case 3: console.log("Значение 3");
    case 4: console.log("Значение 4");
    case 5: console.log("Значение 5");
    case 6: console.log("Значение 6");
    case 7: console.log("Значение 7");
    case 8: console.log("Значение 8");
    case 9: console.log("Значение 9");
    case 10: console.log("Значение 10");
    case 11: console.log("Значение 11");
    case 12: console.log("Значение 12");
    case 13: console.log("Значение 13");
    case 14: console.log("Значение 14");
    case 15: console.log("Значение 15");
}
*/


/*
************************************************************************************************************************************************************
5. Реализовать четыре основные арифметические операции в виде функций с двумя параметрами. Обязательно использовать оператор return.
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 — значения аргументов, operation — строка с названием операции. В зависимости от переданного значения выполнить одну из арифметических операций (использовать функции из пункта 5) и вернуть полученное значение (применить switch).


function summ(a,b){
    return a+b;
}
function sub(a,b){
    return a-b;
}
function mul(a,b){
    return a*b;
}
function div(a,b){
    if (b == 0) 
        return "Попытка деления на 0"
    else 
        return a/b;
}
let a = 3
let b = 0

console.log(Summ(a,b));
console.log(Sub(a,b));
console.log(Mul(a,b));
console.log(Div(a,b));

function mathOperation(arg1, arg2, operation){
 switch (operation){
    case "+": return summ(arg1,arg2);
    case "-": return sub(arg1,arg2);
    case "*": return mul(arg1,arg2);
    case "/": return div(arg1,arg2);
 }
}

console.log(mathOperation(a, b, "+"));
console.log(mathOperation(a, b, "-"));
console.log(mathOperation(a, b, "*"));
console.log(mathOperation(a, b, "/"));

*/

/*
************************************************************************************************************************************************************
7. * Сравнить null и 0. Объяснить результат.

console.log(null < 0);  //false
console.log(null > 0);  //false
console.log(null == 0); //false
console.log(null <= 0); //true
console.log(null >= 0); //true

// В случае сравнения будет true когда c сдругой строны будет null или undefined
// Нестрогое равенство и сравнения > < >= <= работают по-разному. 
// Сравнения преобразуют null в число, рассматривая его как 0. Поэтому выражение null >= 0 true, а null > 0 false.

*/

/*
************************************************************************************************************************************************************
8.* С помощью рекурсии организовать функцию возведения числа в степень. Формат: function power(val, pow), где val — заданное число, pow –— степень.

function power(val, pow){
    if (pow <= 0) return 1;
    else return val * power(val,pow-1)
}
console.log(power(3,3));

*/
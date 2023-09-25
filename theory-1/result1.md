const arr = [10, 12, 15, 21];
for (var i=0; i < arr.length; i++){
  setTimeout(function(){
    console.log(arr[i] > 13 ? `Good: ${arr[i]}`: `Bad: ${arr[i]}`)
  }, 3000)
}
Вышеуказанный код через 3 секунды 4 раза выводит "Bad: undefined", потому что область видимости переменной i, объявленной с помощью ключевого слова var, становится цикл for 
и когда функция setTimeout вызывается, цикл уже завершился. 
То есть в console.log переменная i равна undefined.

Чтобы выводилось -> Bad: 10, Bad: 12, Good: 15, Good: 21 , код можно модифицировать:

<!-- вариант1 - определить переменную i с помощью ключевого слова let-->
const arr = [10, 12, 15, 21];
for (let i=0; i < arr.length; i++){
  setTimeout(function(){
    console.log(arr[i] > 13 ? `Good: ${arr[i]}`: `Bad: ${arr[i]}`)
  }, 3000)
}

<!-- вариант2 - перенести цикл в саму функцию таймера-->
const arr = [10, 12, 15, 21];

  setTimeout(function(){
    for (var i=0; i < arr.length; i++){
    console.log(arr[i] > 13 ? `Good: ${arr[i]}`: `Bad: ${arr[i]}`)
  };
}, 1000)
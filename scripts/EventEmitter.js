import EventEmitter from "events";

/*EventEmitter - это то же самое, что и eventListener, только на сервере
можно создавать и инициализировать эвенты
наследуем EventEmitter в свою рабочую область*/
const MyEventEmiter = new EventEmitter();

//колбеки для передачи в эвенты
function callbackfoo() {
  console.log("тестим EventEmitter");
}
function callbackWithArg(arg) {
  console.log(`тестим EventEmitter с аргументом: ${arg}`);
}

//создание эвента
MyEventEmiter.addListener("connected", callbackfoo);
MyEventEmiter.on("connected-second", callbackWithArg);
//on и addListener работают одинаково, т.е. добавляют в наследованный MyEventEmiter от глобально EventEmitter новые эвенты
/*1 Эвент может содержать в себе 10 таких же эвентов с разными коллбэками, т.е. при создании эвента создается массив с
состоящих из этих эвентов(например десять 'connected' с разными коллбэками и каждый будет запускаться слева напрово, каждый 
новый будет добовляться в конец, но можно добавить и в начало с помощью prependListener и он запустится раньше чем остальные)*/
//вызов эвентов
MyEventEmiter.emit("connected");
MyEventEmiter.emit("connected-second", "какой-то аргумент");
//добавляем несколько эвентов 'connected'
MyEventEmiter.on("connected", () => {
  console.log("i am 2");
});
//once добавляет эвент, но удаляет его после первого его запуска
MyEventEmiter.once("connected", () => {
  console.log("i am 3");
});
MyEventEmiter.once("connected", () => {
  console.log("i am 4");
});
//добавление листенера в начала стека выполнения(начало массива)
MyEventEmiter.prependListener("connected", () => {
  console.log("i am last, but i use prepend and be first");
});
MyEventEmiter.emit("connected");
//удаляем один из эвентов 'connected'
MyEventEmiter.removeListener("connected", callbackfoo);
console.log("without once events and removed event with callbackfoo");
MyEventEmiter.emit("connected");

//Можно обрабатывать ошибку вручную задав эвент error для нашего экземпляра
MyEventEmiter.on("error", (err) => {
  console.log(`Ошибка: ${err.message}, проверь код`);
});
MyEventEmiter.emit("error", new Error("Эй чумба, не тупи"));

/*setMaxListeners - установить максимум листенеров на один эвент, getMaxListeners - сколько максимум листенеров 
на эвент доступно, listenerCount- сколько листенеров на эвенте существует */
console.log(MyEventEmiter.getMaxListeners());
MyEventEmiter.setMaxListeners(4);
console.log(MyEventEmiter.getMaxListeners());
//объявляем больше чем 4
MyEventEmiter.on("connected", () => {
  console.log("third");
});
MyEventEmiter.on("connected", () => {
  console.log("fourth");
});
/*на пятом выдаст ошибкуMaxListenersExceededWarning: Possible EventEmitter memory leak detected.
 5 connected listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit*/
// MyEventEmiter.on("connected", () => {
//   console.log("fifth");
// });
console.log(MyEventEmiter.listenerCount("connected"));
MyEventEmiter.emit("connected");

console.clear();
//Так же можно использовать EventListener, но на сервере его использовать нежелательно
const MyEventTarget = new EventTarget();
//создание event и listener
MyEventTarget.addEventListener("clicked", () => {
  console.log("clicked event");
});
//вызов эвента
MyEventTarget.dispatchEvent(new Event("clicked"));

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
новый будет добовляться в конец, но можно добавить и в начало этого массива и он запустится раньше чем остальные)*/
//вызов эвентов
MyEventEmiter.emit("connected");
MyEventEmiter.emit("connected-second", "какой-то аргумент");
//добавляем несколько эвентов 'connected'
MyEventEmiter.addListener("connected", () => {
  console.log("i am 2");
});
//once добавляет эвент, но удаляет его после первого его запуска
MyEventEmiter.once("connected", () => {
  console.log("i am 3");
});
MyEventEmiter.once("connected", () => {
  console.log("i am 4");
});
MyEventEmiter.emit("connected");
//удаляем один из эвентов 'connected'
MyEventEmiter.removeListener("connected", callbackfoo);
console.log("without once events and removed event with callbackfoo");
MyEventEmiter.emit("connected");
/*setMaxListeners - установить максимум листенеров на один эвент, getMaxListeners - сколько максимум листенеров 
на эвент доступно, listenerCount- сколько листенеров на эвенте существует */
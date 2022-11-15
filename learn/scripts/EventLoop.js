/*
event loop
Существуют 2 типа операций: 
	Input/Output bound;
	CPU bound. (основной поток)

на каждом этапе срабатывают nextTick и microtaskQueue
-Инициализация

	nextTick(), microtaskQueue
-timers																		- таймеры(setTimeout, setInterval),исполняет Callback готовых таймеров
  microtaskQueue, nextTick()
-pennding callbacks												- выдает ошибки в операционной системе например, нам неинтересна
  microtaskQueue, nextTick()
-idle, prepare														- ничего не можем сделать, забудем про нее
  microtaskQueue, nextTick()
-poll																			- исполняет Input/Output Callback, ждет событий от Input/Output, 
																						здесь круто делать setImmediate(примеры Input/Output: filereader, ajax, websocket) 
  
	microtaskQueue, nextTick()
-check																		- исполняется setImmediate
  microtaskQueue, nextTick()
-close callback														- исполняет закрывающие Callback, например: socket.on('close', …), clearTimeout(id) и тд
  microtaskQueue, nextTick()

-Проверка на окончание
если висит таймер, или неоконченная асинхронная операция или чтение файлов то цикл начинается заново 
или чтение из БД или сети БД и до тех пор, пока все не завершит работу
*/

//performance.now возвращает время до его выполнения
const waitFor = setTimeout(() => {
  console.log("do setTimeout for", performance.now());
}, 0);

//clearTimeout(waitFor);

const tick = setInterval(() => {
  console.log("tick", performance.now());
}, 1000);

clearInterval(tick);

console.log("before");
//для того чтобы код выполнился после того как выполнится весь стек вызовов, используем setImmediate
setImmediate(() => {
  console.log(
    "выполняется после того как call stack завершит все остальное и опустеет, но гарантированно раньше таймеров"
  );
});

console.log("after");

for (let i = 0; i < 10000; i++) {
  i += 1;
  console.log(i);
}

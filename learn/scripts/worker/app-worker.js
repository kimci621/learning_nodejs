import { Worker } from "worker_threads";
//Импортируем сам воркер

function initWorker(arg) {
  //Создаем новый промис в котором инициализируем наш воркер и передаем в него данные для его работы
  return new Promise((resolve, reject) => {
    /*
    Инициализация
    new Worker(1: файл, который нужно запустить в отдельном потоке, 
               2: {workerData: {myData}} - Это опции для вызываемого файла с воркером, данные которые передаем воркеру);
    */
    const worker = new Worker("./scripts/worker/worker.js", {
      workerData: { arg },
      //данные передаем в объекте, поэтому не забываем в самом воркере деструктуризировать аргумент
    });
    //Подписаться на состоянния воркера
    worker.on("message", (msg) => {
      console.log("worker finished work");
      resolve(worker.threadId);
      //в случае успеха просто вернули id воркера
    });
    worker.on("messageerror", (err) => {
      console.error("Ошибка, что-то не так с worker");
      reject(err.message);
      //в случае если с самим воркером что-то не так, подписались на messageerror и реджектим код ошибки
    });
    worker.on("exit", () => {
      console.log("worker завершил работу");
    });
  });
}
async function init() {
  performance.mark("start");
  try {
    //Вызов Worker и получение результата его работы
    const result = await initWorker(1223);
    console.log(result);
  } catch (e) {
    console.error(e.message);
  }
  performance.mark("end");
  console.log(performance.measure("init", "start", "end"));
}

init();


// можно еще почитать https://tproger.ru/translations/guide-to-threads-in-node-js/
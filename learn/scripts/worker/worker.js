import { parentPort, workerData } from "worker_threads";
import { bench } from "./benchmark.js";
/*Модуль worker_threads — это пакет, который позволяет создавать полнофункциональные многопоточные приложения Node.js. */

//функция которую мы передадим в воркер
export function testWorker({ arg }) {
  console.log("worker started here", "argument is: ", arg);
  return bench(arg);
}
//передача функции в воркер
parentPort.postMessage(testWorker(workerData));

//Для запуска этого воркера в своем потоке, просто запускаем этот файл через new Worker(путь к файлу, опции)

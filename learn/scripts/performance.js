import https from "https";
import crypto from "crypto";
import perf_hooks from "perf_hooks";
//crypto библиотека для шифрования
//https нативная билиотека для запросов в nodejs, бразуерный fetch естественно отпадает
//perf_hooks нативная библиотека для отслеживания производительности

/*process.env.UV_THREADPOOL_SIZE указывает сколько ядер задействовать для воркеров движка V8,
  больше ядер быстрее inpu/output процессоро зависимые процессы*/
process.env.UV_THREADPOOL_SIZE = 6;

//запуск как-бы бенчмарка, чтобы нагрузить процессор
function benchmarkCPU() {
  for (let i = 0; i < 50; i++) {
    crypto.pbkdf2("apple", "earth", 100000, 64, "sha512", () => {
      //   console.log(performance.now());
    });
  }
}

//проверяем сетевой input/output, который никак не влияет на воркеров, выполняется так же в основном потоке
function benchmarkNetwork() {
  for (let i = 0; i < 50; i++) {
    https.get("https://dzen.ru/sitemap.xml", (res) => {
      //   console.log("responce:", res);
      res.on("data", (data) => {
        // console.log(data);
      });
      res.on("end", () => {
        // console.log(performance.now, "end");
      });
    });
  }
}

//Чтобы отследить производительность какого-то куска кода воспользуемя performance  и perf_hooks
function testPerformance() {
  performance.mark("start");

  const arr = [];
  for (let i = 0; i < 50; i++) {
    crypto.pbkdf2("apple", "earth", 100000, 64, "sha512", () => {
      arr.push(performance.now());
    });
  }

  performance.mark("end");
  performance.measure("testPerformance", "start", "end");
  //console.log(performance.getEntriesByName("testPerformance"));
  //performance.measure - название measure, название первого mark, название второго mark
}

function testPerformanceForPerf() {
  performance.mark("start");
  const arr = [];
  for (let i = 0; i < 50; i++) {
    crypto.pbkdf2("apple", "earth", 100000, 64, "sha512", () => {
      arr.push(performance.now());
    });
  }
  performance.mark("end");
  performance.measure("testPerformanceForPerf", "start", "end");
}

//Чтобы отслежить скорость работы приложения и не писать 100500 console.log используем perf_hooks
const PerformanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntries());
    observer.disconnect();
  }
);
//Теперь без console.log мы можем в любой момент отследить все раставленные performance.measure по-необходимости
PerformanceObserver.observe({
  entryTypes: ["measure"],
});

testPerformance();
testPerformanceForPerf();

import { PerformanceObserver, performance } from "perf_hooks";
import { Worker } from "worker_threads";
import { fork } from "child_process";

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});

performanceObserver.observe({ entryTypes: ["measure"] });

function workerFunc(arg) {
  return new Promise((resolve, reject) => {
    performance.mark("worker start");
    const worker = new Worker("./worker.js", { workerData: arg });
    worker.on("message", (msg) => {
      console.log("worker", msg);
      performance.mark("worker end");
      performance.measure("worker", "worker start", "worker end");
      resolve(msg);
    });
  });
}

function forkFunc(arg) {
  return new Promise((resolve, reject) => {
    performance.mark("fork start");
    const forkProcess = fork("./fork.js");
    forkProcess.send(arg);
    forkProcess.on("message", (msg) => {
      if (msg) {
        console.log("fork", msg);
        performance.mark("fork end");
        performance.measure("fork", "fork start", "fork end");
        resolve(msg);
      }
    });
  });
}

async function init() {
  try {
    await workerFunc(12345);
    await forkFunc(12345);
  } catch (e) {
    console.error(e.message);
  }
}

init();

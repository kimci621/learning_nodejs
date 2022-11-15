import { parentPort, workerData } from "worker_threads";
import { benchmark } from "./benchmark.js";

parentPort.postMessage(benchmark(workerData));
